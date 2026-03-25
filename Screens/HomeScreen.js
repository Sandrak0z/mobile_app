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
          inhoud={"Deze krachtige vlekkenreiniger is speciaal ontwikkeld voor witte was."}
        />
        
        <ProductCard 
          titel="Silicone Sandwich Bag" 
          prijs="11" 
          foto="https://www.kudzu.be/media/large2x_68da6aa626a82_Afbeelding%20155.jpeg" 
          omschrijving="Herbruikbare zakjes voor voedselopslag, perfect voor onderweg."
          inhoud={"Deze herbruikbare zakjes zijn ideaal voor voedselopslag en zijn perfect voor onderweg."}

        />

        <ProductCard 
          titel="Vlekkenreinger Witte Was" 
          prijs="10" 
          foto="https://www.kudzu.be/media/large2x_670967dc770cd_05419980270221_a1c1_20240801.jpg"
          omschrijving="Verwijdert vlekken en houdt je witte kleding stralend."  
          inhoud={"Deze krachtige vlekkenreiniger is speciaal ontwikkeld voor witte was."}
        />

        <Text style={styles.header}>Blogposts</Text>

        <BlogCard 
          titel="Duurzaam Leven" 
          foto="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
          omschrijving="5 praktische tips om je huis groener te maken."
          inhoud={"Duurzaam leven hoeft niet ingewikkeld of duur te zijn. Het begint allemaal bij de kleine keuzes die we dagelijks maken. Hier zijn 5 simpele tips om vandaag nog te beginnen: Zeg nee tegen wegwerpplastic: Neem altijd je eigen herbruikbare tas en waterfles mee. Kleine moeite, groot verschil voor de oceaan! Kies voor natuurlijke schoonmaakmiddelen: Wist je dat je met azijn, baking soda en citroen bijna je hele huis kunt poetsen? Beter voor jou én het milieu. Eet meer lokaal en seizoensgebonden: Groenten en fruit die niet de hele wereld over hoeven te vliegen, smaken beter en hebben een lagere CO2-voetafdruk. Was op lage temperaturen: De meeste kleding wordt prima schoon op 30 graden. Dit bespaart enorm veel energie en je kleding gaat langer mee. Kies voor kwaliteit boven kwantiteit: Investeer in producten die lang meegaan in plaats van goedkope 'fast fashion' of wegwerpartikelen"}
       
        />

        <BlogCard
          titel="Zero Waste Lifestyle"
          foto="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500"
          omschrijving="Hoe je afval kunt verminderen in je dagelijks leven."
          inhoud={"Veel mensen denken dat je je hele leven moet omgooien om duurzaam te zijn, maar niets is minder waar. Het geheim zit in de herhaling van kleine acties. Kies voor herasbaar: Vervang je plastic flesje door een stijlvolle RVS drinkbus. Het bespaart je geld en vermindert de plasticsoep. Was op 30 graden: De moderne wasmachines en wasmiddelen krijgen je kleding perfect schoon op lage temperaturen. Dit is beter voor je energierekening én je kleding gaat langer mee. Eet vaker plantaardig: Je hoeft geen fulltime veganist te worden, maar één dag per week geen vlees eten bespaart al duizenden liters water. Natuurlijke schoonmaak: Gebruik vaker natuurlijke zepen, zoals de Shea Lichaamszeep uit onze winkel, in plaats van agressieve chemische middelen. Koop bewust: Vraag jezelf bij elke aankoop af: 'Heb ik dit echt nodig?' Kwaliteit boven kwantiteit is de basis van een groene lifestyle."}
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