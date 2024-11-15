import React from 'react' 
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'; 
import Navbar from '../components/Navbar';

const SavedProductsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text>This is for the saved products</Text>
    </View>
    <Navbar />
  </SafeAreaView> 
  )
}  

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default SavedProductsScreen;