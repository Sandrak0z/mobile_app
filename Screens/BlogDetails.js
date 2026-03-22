import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const BlogDetails = ({ route }) => {
  const { titel, inhoud, foto } = route.params;

  return (
    <ScrollView style={styles.container}>
      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{titel}</Text>
        <Text style={styles.body}>{inhoud}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  body: { fontSize: 16, lineHeight: 24, color: '#666' }
});

export default BlogDetails;