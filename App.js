import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Mijn Producten</Text>
        {/* de kaarten */}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 40, alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 ,marginTop:20},
});
