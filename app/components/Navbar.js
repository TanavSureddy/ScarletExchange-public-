import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('HomeScreen')}>
          <Image 
            source={require('../assets/selectedhome.png')} // Replace with your image path
            style={styles.headerImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('SavedProductsScreen')}>
          <FontAwesome name="bookmark" size={24} color="black" />
        </TouchableOpacity>  
        <TouchableOpacity style={styles.plusButton} onPress={() => navigateToScreen('CreateNewListing')}>
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('InboxScreen')}>
          <Image 
            source={require('../assets/messages.png')} // Replace with your image path
            style={styles.headerImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('ProfileScreen')}>
          <Image 
            source={require('../assets/profile.png')} // Replace with your image path
          
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: 60,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  plusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  headerImage: {
    width: 24,
    height: 24,
  },
});

export default Navbar;
