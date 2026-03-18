import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const ProductDetails = ({ route }) => { 
  const { titel, prijs, foto } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: foto }} style={styles.detailImage} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.header}>{titel}</Text>
        <Text style={styles.price}>€ {prijs}</Text>
        <Text style={styles.description}>Hier komt de productbeschrijving...</Text>
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