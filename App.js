import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'; 
import ProductCard from './components/ProductCard';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Mijn Producten</Text>
      
        <TextInput 
          style={styles.searchBar} 
          placeholder="Zoek een product..." 
        />

        <ProductCard 
          titel="Vlekkenreinger Witte Was" 
          prijs="10" 
          foto="https://www.kudzu.be/media/large2x_688b7f6cc8f9a_Afbeelding%20312.jpeg" 
        />
        
        <ProductCard 
          titel="Silicone Sandwich Bag Natural Medium" 
          prijs="11" 
          foto="https://www.kudzu.be/media/large2x_68da6aa626a82_Afbeelding%20155.jpeg" 
        />

        <ProductCard 
          titel="Shea Lichaamszeep" 
          prijs="8" 
          foto="https://www.kudzu.be/media/large2x_69a954c324a70_Afbeelding.jpeg" 
        />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
  },
  content: { 
    padding: 20, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginTop: 60 
  },
  searchBar: {
    width: '100%',
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#929292',

   
  }
});