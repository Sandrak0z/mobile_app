import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';


const HomeScreen = ({ navigation }) => { 
  const [onlyPromos, setOnlyPromos] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Artikellen</Text>
      
        <TextInput 
          style={styles.searchBar} 
          placeholder="Zoek een product..." 
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Alleen promoties tonen</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#236b41" }}
            thumbColor={onlyPromos ? "#ffffff" : "#f4f3f4"}
            onValueChange={() => setOnlyPromos(!onlyPromos)}
            value={onlyPromos}
          />
        </View>

        <ProductCard 
          titel="Vlekkenreinger Witte Was" 
          prijs="10" 
          foto="https://www.kudzu.be/media/large2x_688b7f6cc8f9a_Afbeelding%20312.jpeg"
          omschrijving="Verwijdert vlekken en houdt je witte kleding stralend."  
          onPress={() =>
            navigation.navigate("ProductDetails", {
              titel: "Vlekkenreinger Witte Was",
              prijs: "10",
              foto: "https://www.kudzu.be/media/large2x_688b7f6cc8f9a_Afbeelding%20312.jpeg",
              inhoud: "Deze krachtige vlekkenreiniger is speciaal ontwikkeld voor witte was."
            })
          }
        />
        
        <ProductCard 
          titel="Silicone Sandwich Bag" 
          prijs="11" 
          foto="https://www.kudzu.be/media/large2x_68da6aa626a82_Afbeelding%20155.jpeg" 
        />

        <Text style={styles.header}>Blogposts</Text>

        <BlogCard 
          titel="Duurzaam Leven" 
          foto="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
          omschrijving="5 praktische tips om je huis groener te maken."
          onPress={() => navigation.navigate('BlogDetails', { 
            titel: "Duurzaam Leven", 
            inhoud: "Volledige blog tekst hier...", 
            foto: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500" 
          })}
        />

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
  content: { padding: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, marginTop: 20, width: '100%', color: '#333' },
  searchBar: { width: '100%', height: 50, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  switchContainer: { width: '100%', height: 55, backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchText: { fontSize: 16, color: '#555' },
  customButton: { width: '100%', backgroundColor: '#236b41', paddingVertical: 15, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});

export default HomeScreen;