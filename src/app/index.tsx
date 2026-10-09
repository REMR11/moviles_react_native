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
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Alive':
        return styles.statusAlive;
      case 'Dead':
        return styles.statusDead;
      default:
        return styles.statusUnknown;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Rick & Morty API por OLAD</Text>
        <Text style={styles.subtitle}>Personajes obtenidos con fetch()</Text>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#97ce4c" />
          <Text style={styles.loadingText}>Cargando del Multiverso...</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              
              <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.detailText}>Especie: {item.species}</Text>
                
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, getStatusStyle(item.status)]} />
                  <Text style={styles.statusText}>
                    {item.status} - {item.gender}
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