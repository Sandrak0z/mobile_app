import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetails = ({ route }) => { 
  const { titel, prijs, foto } = route.params;

  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: foto }} style={styles.detailImage} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.header}>{titel}</Text>
        <Text style={styles.price}>€ {prijs}</Text>
        <Text style={styles.description}> productbeschrijving...</Text>
      </View>
      <View style={styles.content}>

          <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.totalPrice}>Totaal: € {prijs * quantity}</Text>
        </View>
      

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  detailImage: { width: '100%', height: 300 },
  content: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: '#236b41', marginVertical: 10 },
  description: { fontSize: 16, color: '#666', lineHeight: 24 }
});

export default ProductDetails;