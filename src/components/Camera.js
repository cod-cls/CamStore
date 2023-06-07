import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { color } from 'react-native-elements/dist/helpers';

export default function CameraComponent({ setPhoto }) {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (isCameraReady && cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const newPhotoUri = FileSystem.documentDirectory + data.uri.split('/').pop();
      FileSystem.moveAsync({
        from: data.uri,
        to: newPhotoUri,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Camera 
        ref={cameraRef} 
        style={styles.camera} 
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={70} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  camera: {
    height: 600,
    width: 400,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    width: 80,
    height: 80,
    bottom: 0,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
