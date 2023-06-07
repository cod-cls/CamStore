import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const photosInDirectory = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      setPhotos(photosInDirectory);
    })();
  }, []);

  const deletePhoto = async (photoUri) => {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + photoUri);
    const photosInDirectory = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    setPhotos(photosInDirectory);
  }

  const renderPhoto = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: FileSystem.documentDirectory + item }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={() => deletePhoto(item)}>
          <AntDesign name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={photos}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderPhoto}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
});
