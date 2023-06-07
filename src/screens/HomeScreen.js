import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Camera')}>
        <Icon name="camera" size={100} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Gallery')}>
        <Icon name="image" size={100} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#841584',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    margin: 20,
  }
});
