import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, Block } from 'react-native';

export default function AssetExample() {
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : '#fff',
    borderRadius:25,
    height: 256,
    width : 256,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.6
  },
});