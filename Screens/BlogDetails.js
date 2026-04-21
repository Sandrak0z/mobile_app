import React from 'react';
import { ScrollView, Image, Text, StyleSheet, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

const BlogDetails = ({ route }) => {
  const { titel, inhoud, foto } = route.params;
  const { width } = useWindowDimensions(); 
  const htmlContent = inhoud ? inhoud : '<p>fout bij het laden van de inhoud.</p>';

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: foto || 'https://via.placeholder.com/150' }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{titel}</Text>

        <RenderHtml
          contentWidth={width - 40} 
          source={{ html: htmlContent }}
          tagsStyles={{
            p: { marginBottom: 10, fontSize: 16, lineHeight: 24, color: '#333' },
            h2: { marginTop: 20, marginBottom: 10, fontSize: 22, fontWeight: 'bold', color: '#236b41' },
            h3: { marginTop: 15, marginBottom: 8, fontSize: 18, fontWeight: 'bold' },
            li: { fontSize: 16, marginBottom: 5 }
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
});

export default BlogDetails;