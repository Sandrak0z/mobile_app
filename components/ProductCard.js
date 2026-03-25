import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useNavigation } from '@react-navigation/native';

const ProductCard = ({ foto, titel, prijs, onPress, inhoud, omschrijving}) => { 
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image source={{ uri: foto }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{titel}</Text>
        <Text style={styles.omschrijving}>{omschrijving}</Text>
        <Text style={styles.price}>€ {prijs}</Text>

        
        <TouchableOpacity 
          onPress={() => navigation.navigate('ProductDetails', { 
            titel: titel, 
            prijs: prijs, 
            foto: foto,
            inhoud: inhoud,
            omschrijving: omschrijving

          })}
        >
          <Text style={styles.link}>Bekijk details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%', 
    marginBottom: 15,
    marginTop: 15,
    borderColor: '#d0d0d0',
    borderWidth: 1, 
    alignItems: 'center',
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
  inhoud: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  omschrijving: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  price: {
    color: '#236b41',
    fontWeight: 'bold',
    marginTop: 5,
  },
  link: {
    color: '#236b41', 
    marginTop: 10,
    marginBottom: 10,
  }
});

export default ProductCard;