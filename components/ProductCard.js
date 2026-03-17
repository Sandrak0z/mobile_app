import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductCard = (props) => { 
  return (
    <View style={styles.card}>
      <Image source={{ uri: props.foto }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{props.titel}</Text>
        <Text style={styles.price}>€ {props.prijs}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%', 
    height: 220,
    marginBottom: 15,
    borderColor: '#d0d0d0',
    borderWidth: 1, 
    alignItems: 'center'
    
  },
  image: {
    width: '95%',
    height: 120, 
  },
  
  info: {
    marginTop: 10, 
    alignItems: 'center', 
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    color: '#236b41',
    fontWeight: 'bold',
    marginTop: 5,
  }

});

export default ProductCard;