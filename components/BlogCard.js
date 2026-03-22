import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useNavigation } from '@react-navigation/native';

const BlogCard = ({ foto, titel, inhoud, omschrijving, onPress }) => {
  const navigation = useNavigation(); 
  return (
      <View style={styles.card}>      
      <Image source={{ uri: foto }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{titel}</Text>
        <Text style={styles.omschrijving}>{omschrijving}</Text>

   <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BlogDetails', { titel, inhoud, foto })}>
          <Text style={styles.link}>Lees meer →</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 12, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#ddd' },
  image: { width: '100%', height: 150 },
  info: { padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  inhoud: { fontSize: 14, color: '#666' },
  omschrijving: { fontSize: 14, color: '#666' },
  link: { color: '#236b41', marginTop: 10, fontWeight: 'bold' }
});

export default BlogCard;