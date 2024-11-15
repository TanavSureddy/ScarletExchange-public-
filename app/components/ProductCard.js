import React, { useState }  from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const ProductCard = ({ name, price, imageUri , onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return ( 
    <TouchableOpacity onPress={onPress} style={styles.container}>
    <View>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Image 
          source={isFavorite ? require('../assets/filledheart.png') : require('../assets/heart.png')} // Replace with your heart icon image paths
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
      <View style={styles.details}>
      <View style={styles.separator}></View> 
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,

    elevation: 5,
    margin: 5,
    marginBottom: 20,
    width: '46%',
    borderColor: '#000', // Black border color
    borderWidth: 1, // Border width
     // Adjust width as needed
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
    padding: 10,
  },
  separator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60, // Adjust as needed
    height: 1,
    backgroundColor: '#000',
  },
  name: {
    fontFamily: 'ralewaybold',
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontFamily: 'ralewaylight',
    color: 'black',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default ProductCard;