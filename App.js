import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen.js'; 
import ProductDetails from './Screens/ProductDetails.js';
import BlogDetails from './Screens/BlogDetails.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Winkel' }} 
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails} 
          options={{ title: 'Product Details' }} 
        />
        <Stack.Screen 
          name="BlogDetails" 
          component={BlogDetails} 
          options={{ title: 'Blog Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}