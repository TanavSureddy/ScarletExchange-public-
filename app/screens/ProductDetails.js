import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { fdb } from '../config/firebaseSetup';
import Navbar from '../components/Navbar'; // Import the Navbar component

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(fdb, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('No such product document!');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const goToNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.productImage}
      resizeMode="cover"
    />
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
          <View style = {styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Image 
                        source={require('../assets/backBtn.png')} 
                        style={styles.newItemPicture}
                    />

           
      </TouchableOpacity> 

      <TouchableOpacity style={styles.backButton}>
           <Image 
                        source={require('../assets/editIcon.png')} 
                        style={styles.editIcon}
                    />

           
      </TouchableOpacity> 

          </View>

      
      
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={goToPreviousImage} style={[styles.navigationButton, { left: 0 }]}>
          <Text style={styles.navigationButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <FlatList
          data={product.images}
          renderItem={renderImage}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={(data, index) => ({
            length: styles.productImage.width,
            offset: styles.productImage.width * index,
            index,
          })}
          initialScrollIndex={currentImageIndex}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / styles.productImage.width);
            setCurrentImageIndex(newIndex);
          }}
        />

        <TouchableOpacity onPress={goToNextImage} style={[styles.navigationButton, { right: 0 }]}>
          <Text style={styles.navigationButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}> ${product.price}</Text>
        <View style={styles.content2}>
          <Text style={styles.productCondition}>Condition: </Text>
          <Text style={styles.conditonText}>{product.condition}</Text>
        </View>

      
        <Image  style={styles.line}
                        source={require('../assets/line.png')} 
                    />
         <View style = {styles.content2}>
         <Text style={styles.productTags}>Category:</Text>
         <Text style={styles.textbookText}>{product.tags}</Text>

          
        </View>
        
        <Image style={styles.line}
                        source={require('../assets/line.png')} 
                    />
        <Text style={styles.productDescription}>Description: {product.description}</Text>
        
        
      </View>

      <View style={styles.archive}>
      <TouchableOpacity style={styles.archiveItem} >

<Text style={styles.archiveText}>Archive Item</Text>

</TouchableOpacity>
        
         </View>
      
      
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50

  },
  backButton: {
    paddingRight: 250,
    paddingHorizontal: 20,
    paddingVertical: 10,
    top: 20,
    left: 20,
    zIndex: 1,
  },
  editIcon: {
    width: 24,
    height: 24
  },

  content: {
    flexDirection: 'column',
    padding: 20,
  },
  productName: {
    fontFamily: 'ralewaybold',
    fontSize: 24,
    marginBottom: 8,
  },
  productPrice: {
    fontFamily: 'ralewaylight',
    fontSize: 18,
    marginBottom: 30,
  },
  productCondition: {
    fontFamily: 'ralewaylight',
    fontSize: 16,
    marginBottom: 10,
  },
  conditonText: {
    fontFamily: 'ralewaylight',
    fontSize: 16,
    paddingLeft: 145
  },
  textbookText: {
    fontFamily: 'ralewaylight',
    fontSize: 16,
    paddingLeft: 150
  },
  productDescription: {
    fontFamily: 'ralewaylight',
    fontSize: 16,
    marginBottom: 10,
  },
  content2: {
    flexDirection: 'row',

  },
  productTags: {
    fontFamily: 'ralewaylight',
    fontSize: 16,
    marginBottom: 10,
  },
  line: {
    width: 350,
    marginBottom: 10
  },
  carouselContainer: {
    paddingHorizontal: 20,
    height: 250,
    marginBottom: 20,
  },
  productImage: {
    
    borderRadius: 20,
    width: 350, // Adjust the width of each image as needed
    height: '100%', // Make each image take up the full height of the carousel
  },
  navigationButton: {
    position: 'absolute',
    top: '50%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    zIndex: 2,
  },
  navigationButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  archive: {
    marginTop: 50,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
  },
  archiveItem: {
    alignItems: 'center',   // Aligns children horizontally
  justifyContent: 'center', // Aligns children vertically
  borderWidth: 1,
  borderRadius: 10,
  borderColor: 'black',
  width: '80%', // Set the width to take up the full container width
  height: 40, // Set a fixed height or adjust as needed
    

  },
  archiveText: {
    fontFamily: 'ralewaylight',
  },
});

export default ProductDetailScreen;
