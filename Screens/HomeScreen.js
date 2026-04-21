import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import { Picker } from '@react-native-picker/picker';

const categoryNames = {
  "": "Alle categorieën",
  "69a5511b569e51eecf37b6ab": "Beauty & Verzorging",
  "69a5511b569e51eecf37b6a9": "Huis & Tuin",
  "69a5511b569e51eecf37b6a7": "Kledij & Tassen",
  "69a5511b569e51eecf37b6a5": "Koken",
};

const blogCategoryNames = {
  "": "Alle categorieën",
  "69a6a7e30a8b166018a6329d": "Tips & Tricks",
  "69a49b42061c2c219e9a849c": "Duurzaam Genieten",
  "69a49ad7cd177dc8c24451fb": "Beauty en Verzorging",
  "69a49abd8f0882b590161933": "Koken",
  "69a49a99c7da4d3b366842af": "Duurzaamheid"
};

const HomeScreen = ({ navigation }) => {
  const [sortBy, setSortBy] = useState("naam-az");
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");

  useEffect(() => {
    // PRODUCTEN FETCH
    fetch('https://api.webflow.com/v2/sites/698c7fc6053edea54bf62f29/products', {
      headers: { 'Authorization': 'Bearer 0e32ebd2af532b8a16135c44039a81a15c7c702d731e058aaeac322ede2a7165' }
    })
    .then((res) => res.json())
    .then(data => {
      setProducts(data.items.map(item => {
        const skuData = item.skus[0]?.fieldData || {};
        return {
          id: item.product.id,
          titel: item.product.fieldData.name,
          prijs: (item.skus[0]?.fieldData.price?.value || 0) / 100,
          omschrijving: item.product.fieldData['product-short-description'] || item.product.fieldData.description,
          inhoud: item.product.fieldData['long-description'] || "Geen uitgebreide beschrijving",
          category: categoryNames[item.product.fieldData.category] || "Onbekende categorie",
          foto: skuData.mainImage?.url || skuData['main-image']?.url || "https://via.placeholder.com/150",
        };
      }));
    }).catch(err => console.error("Fout bij producten:", err));

    // BLOGS FETCH
    fetch('https://api.webflow.com/v2/sites/698c7fc6053edea54bf62f29/collections/69a34a68b2ce95d6ac926b3d/items', {
      headers: { 'Authorization': 'Bearer 0e32ebd2af532b8a16135c44039a81a15c7c702d731e058aaeac322ede2a7165' }
    })
    .then((res) => res.json())
    .then(data => {
      setBlogs(data.items.map(item => ({
        id: item.id,
        titel: item.fieldData.name,
        omschrijving: item.fieldData['post-summary'] || "Lees meer...",
        inhoud: item.fieldData['post-body'] || "", 
        foto: item.fieldData['main-image']?.url,
        category: item.fieldData['categorie'] || item.fieldData['categorie-2']
      })));
    }).catch(err => console.error("Fout bij blogs:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "" || product.category === categoryNames[selectedCategory];
    const matchesSearch = product.titel.toLowerCase().includes(searchQuery.toLowerCase());
    const promoMatch = onlyPromos ? product.prijs < 15 : true;
    return matchesCategory && matchesSearch && promoMatch;
  }).sort((a, b) => {
    if (sortBy === "prijs-laag") return a.prijs - b.prijs;
    if (sortBy === "prijs-hoog") return b.prijs - a.prijs;
    if (sortBy === "naam-za") {
      return b.titel.localeCompare(a.titel);
    }
    return a.titel.localeCompare(b.titel);
  });

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.titel.toLowerCase().includes(blogSearchQuery.toLowerCase());
    const matchesCategory = selectedBlogCategory === "" || 
      (Array.isArray(blog.category) ? blog.category.includes(selectedBlogCategory) : blog.category === selectedBlogCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Artikelen</Text>
        <TextInput style={styles.searchBar} placeholder="Zoek een product..." value={searchQuery} onChangeText={setSearchQuery} />
        
        <View style={styles.dropdownRow}>
          <View style={styles.pickerContainer}>
            <Text style={styles.miniLabel}>Categorie</Text>
            <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory} style={styles.picker}>
              {Object.keys(categoryNames).map(id => <Picker.Item key={id} label={categoryNames[id]} value={id} />)}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.miniLabel}>Sorteer op</Text>
            <Picker selectedValue={sortBy} onValueChange={setSortBy} style={styles.picker}>
              <Picker.Item label="A-Z" value="naam-az" />
              <Picker.Item label="Z-A" value="naam-za" />
              <Picker.Item label="Prijs laag-hoog" value="prijs-laag" />
              <Picker.Item label="Prijs hoog-laag" value="prijs-hoog" />
            </Picker>
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Alleen promoties tonen</Text>
          <Switch onValueChange={() => setOnlyPromos(!onlyPromos)} value={onlyPromos} trackColor={{ true: "#236b41" }} />
        </View>

        <View style={styles.productGrid}>
          {filteredProducts.map((p) => (
            <ProductCard 
            key={p.id} 
            titel={p.titel} 
            prijs={p.prijs} 
            foto={p.foto} 
            omschrijving={p.omschrijving} 
            onPress={() => navigation.navigate('ProductDetails', p)} />
          ))}
        </View>

        <Text style={styles.header}>Blogposts</Text>
        <TextInput style={styles.searchBar} placeholder="Zoek in blogs..." value={blogSearchQuery} onChangeText={setBlogSearchQuery} />
        
        <View style={styles.pickerContainerFull}>
          <Text style={styles.miniLabel}>Filter Blog Categorie</Text>
          <Picker selectedValue={selectedBlogCategory} onValueChange={setSelectedBlogCategory} style={styles.picker}>
            {Object.keys(blogCategoryNames).map(id => <Picker.Item key={id} label={blogCategoryNames[id]} value={id} />)}
          </Picker>
        </View>

        {filteredBlogs.map((blog) => (
          <BlogCard 
            key={blog.id} 
            titel={blog.titel} 
            foto={blog.foto} 
            omschrijving={blog.omschrijving} 
            onPress={() => navigation.navigate('BlogDetail', { 
              titel: blog.titel, 
              inhoud: blog.inhoud, 
              foto: blog.foto 
            })} 
          />
        ))}

        <TouchableOpacity style={styles.customButton} onPress={() => alert('Winkelmandje!')}>
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
  pickerContainerFull: { width: '100%', backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#ddd', padding: 5, marginBottom: 15 },
  miniLabel: { fontSize: 10, color: '#888', fontWeight: 'bold', marginLeft: 10, textTransform: 'uppercase' },
  picker: { height: 50, width: '100%' },
  switchContainer: { width: '100%', height: 55, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchText: { fontSize: 16, color: '#555' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  customButton: { width: '100%', backgroundColor: '#236b41', paddingVertical: 15, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 40 },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});

export default HomeScreen;