import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import { Picker } from '@react-native-picker/picker';

const categoryNames = {
  "" : "Alle categorieën",
  "69a5511b569e51eecf37b6ab" : "Beauty & Verzorging",
  "69a5511b569e51eecf37b6a9" : "Huis & Tuin",
  "69a5511b569e51eecf37b6a7" : "Kledij & Tassen",
  "69a5511b569e51eecf37b6a5" : "Koken",
}

const HomeScreen = ({ navigation }) => { 
  const [sortBy, setSortBy] = useState("naam-az");
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/698c7fc6053edea54bf62f29/products', {
      headers: { 
        'Authorization': 'Bearer 0e32ebd2af532b8a16135c44039a81a15c7c702d731e058aaeac322ede2a7165',
        'Content-Type': 'application/json'
      }
    })
        .then((res) => res.json())

    .then(data => {
      setProducts(
        data.items.map(item => {
          const skuData = item.skus[0]?.fieldData || {};
          return {
            id: item.product.id,
            titel: item.product.fieldData.name,
            prijs: (item.skus[0]?.fieldData.price?.value || 0) / 100,
            omschrijving: item.product.fieldData.description,
            inhoud: item.product.fieldData['long-description'] || "Geen uitgebreide beschrijving",
            category: categoryNames[item.product.fieldData.category] || "Onbekende categorie",

            foto: skuData.mainImage?.url || skuData['main-image']?.url || "https://via.placeholder.com/150",

          };
        })
      );
    }).catch(error => console.error('Error fetching products:', error));
  fetch('https://api.webflow.com/v2/sites/698c7fc6053edea54bf62f29/collections/69a34a68b2ce95d6ac926b3d/items', {
    headers: { 
      'Authorization': 'Bearer 0e32ebd2af532b8a16135c44039a81a15c7c702d731e058aaeac322ede2a7165',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .then(data => {
    setBlogs(data.items.map(item => ({
  id: item.id,
  titel: item.fieldData.name,
  omschrijving: item.fieldData['post-summary'] || "Lees meer over dit onderwerp...", 
  inhoud: item.fieldData['post-body'] || item.fieldData.content, 
  foto: item.fieldData['main-image']?.url
})));
  }).catch(error => console.error('Fout bij blogs:', error));
}, []);
      
  const filteredProducts = products.filter((product) => {
    const productNaam = product.titel.toLowerCase();
    const zoekTerm = searchQuery.toLowerCase();
    const matchesCategory = selectedCategory === "" || product.category === categoryNames[selectedCategory];
    const matchesSearch = productNaam.includes(zoekTerm);
    const promoMatch = onlyPromos ? product.prijs < 15 : true;

    return matchesCategory && matchesSearch && promoMatch;
  }).sort((a, b) => {
    if (sortBy === "prijs-laag") return a.prijs - b.prijs;
    if (sortBy === "prijs-hoog") return b.prijs - a.prijs;
    if (sortBy === "naam-az") return a.titel.localeCompare(b.titel);
    if (sortBy === "naam-za") return b.titel.localeCompare(a.titel);
    return 0;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Artikelen</Text>
      
        <TextInput 
          style={styles.searchBar} 
          placeholder="Zoek een product..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.dropdownRow}>
          <View style={styles.pickerContainer}>
          <Text style={styles.miniLabel}>Categorie</Text>
          <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Alle categorieën" value="" />
          <Picker.Item label="Beauty & Verzorging" value="69a5511b569e51eecf37b6ab" />
          <Picker.Item label="Huis & Tuin" value="69a5511b569e51eecf37b6a9" />
          <Picker.Item label="Kledij & Tassen" value="69a5511b569e51eecf37b6a7" />
          <Picker.Item label="Koken" value="69a5511b569e51eecf37b6a5" /> 
          </Picker></View>
  

          <View style={styles.pickerContainer}>
            <Text style={styles.miniLabel}>Sorteer op</Text>
            <Picker
              selectedValue={sortBy}
              onValueChange={(itemValue) => setSortBy(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="A-Z" value="naam-az" />
              <Picker.Item label="Z-A" value="naam-za" />
              <Picker.Item label="Prijs van laag naar hoog" value="prijs-laag" />
              <Picker.Item label="Prijs van hoog naar laag" value="prijs-hoog" />
            </Picker>
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Alleen promoties tonen</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#236b41" }}
            thumbColor={onlyPromos ? "#ffffff" : "#f4f3f4"}
            onValueChange={() => setOnlyPromos(!onlyPromos)}
            value={onlyPromos}
          />
        </View>

        <View style={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              titel={product.titel}
              prijs={product.prijs}
              foto={product.foto}
              omschrijving={product.omschrijving}
              inhoud={product.longDescription}
              onPress={() => navigation.navigate('ProductDetails', product)} 
            />
          ))}
        </View>

        <Text style={styles.header}>Blogposts</Text>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            titel={blog.titel}
            foto={blog.foto}
            omschrijving={blog.omschrijving}
            inhoud={blog.inhoud}
          />
        ))}

        <TouchableOpacity style={styles.customButton} onPress={() => alert('Winkelmandje geopend!')}>
          <Text style={styles.buttonText}>Winkelmandje Bekijken</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 15 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, marginTop: 20, color: '#333' },
  searchBar: { width: '100%', height: 50, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  
  dropdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  pickerContainer: { flex: 0.48, backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#ddd', padding: 5 },
  miniLabel: { fontSize: 10, color: '#888', fontWeight: 'bold', marginLeft: 10, textTransform: 'uppercase' },
  picker: { height: 50, width: '100%' },

  switchContainer: { width: '100%', height: 55, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchText: { fontSize: 16, color: '#555' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  customButton: { width: '100%', backgroundColor: '#236b41', paddingVertical: 15, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 40 },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});

export default HomeScreen;