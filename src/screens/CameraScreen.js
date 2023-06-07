import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import Camera from '../components/Camera';

export default function CameraScreen() {
  const [photo, setPhoto] = useState(null);

  return (
    <View>
      <Camera setPhoto={setPhoto} />
      {photo && <Button title="Use Photo" onPress={() => {/* Função para usar a foto */}} />}
    </View>
  );
}
