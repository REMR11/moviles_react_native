import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View
} from 'react-native';
import { styles } from './styles';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      // Endpoint público de Harry Potter para obtener personajes
      const response = await fetch('https://hp-api.onrender.com/api/characters');
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error('Error al obtener los datos de Hogwarts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Función para asignar colores según la casa de Hogwarts
  const getHouseStyle = (house) => {
    switch (house) {
      case 'Gryffindor':
        return styles.houseGryffindor;
      case 'Slytherin':
        return styles.houseSlytherin;
      case 'Ravenclaw':
        return styles.houseRavenclaw;
      case 'Hufflepuff':
        return styles.houseHufflepuff;
      default:
        return styles.houseUnknown;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Harry Potter API por OLAD</Text>
        <Text style={styles.subtitle}>Personajes del Mundo Mágico</Text>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#e3af34" />
          <Text style={styles.loadingText}>Abriendo el Mapa Merodeador...</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/90' }} 
                style={styles.avatar} 
              />
              
              <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.detailText}>Casa: {item.house || 'Desconocida'}</Text>
                
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, getHouseStyle(item.house)]} />
                  <Text style={styles.statusText}>
                    {item.alive ? 'Vivo' : 'Fallecido'} {item.patronus ? `- Patronus: ${item.patronus}` : ''}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}