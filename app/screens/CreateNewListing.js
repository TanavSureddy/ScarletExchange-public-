import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { fdb, auth,storage } from '../config/firebaseSetup';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../components/Navbar';
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore";  
import { useNavigation, useRoute} from '@react-navigation/core';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 


const CreateNewListing = () => {


  const [productCondition, setProductCondition] = useState('');
  const conditions = ['New', 'Used (Very Good)', 'Used (Good)', 'Used (Bad)'];

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  //const [productCondition, setProductCondition] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productTags, setProductTags] = useState('');
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null); 
  const navigation = useNavigation(); 
  const route = useRoute();
  

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Allow multiple image selection
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages(prevImages => [...prevImages, ...selectedImages]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  }; 

  const handleSaveDraft = async () => {
    try {
      const draftData = {
        name: productName,
        price: productPrice,
        condition: productCondition,
        description: productDescription,
        tags: productTags,
        images: images,
        userId: userId,
      };
  
      const draftId = route.params?.draftId; // Get the existing draft ID from route params
  
      if (draftId) {
        // Update the existing draft
        const draftRef = doc(collection(fdb, 'drafts'), draftId);
        await setDoc(draftRef, draftData, { merge: true }); // Use setDoc to update the existing draft
        console.log('Draft updated with ID: ', draftId);
        alert('Draft updated successfully!');
      } else {
        // Add a new draft
        const newDraftRef = await addDoc(collection(fdb, 'drafts'), draftData);
        console.log('Draft saved with ID: ', newDraftRef.id);
        alert('Draft saved successfully!');
      }
  
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error('Error saving draft: ', error);
      alert('Failed to save draft. Please try again.');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Handle when user is not authenticated
      }
    });

    // Fill out fields with draft data if available
    const draft = route.params?.draft;
    if (draft) {
      setProductName(draft.name || '');
      setProductPrice(draft.price || '');
      setProductCondition(draft.condition || '');
      setProductDescription(draft.description || '');
      setProductTags(draft.tags || '');
      setImages(draft.images || []);
    }

    return unsubscribe;
  }, [route.params?.draft]);


  const ImageButton = props => {
    return (
      <View style = {{marginBottom: 10}}> 
        <TouchableOpacity onPress={pickImages} style={[styles.container2, styles.dottedBorder,
           {height: 110, width: 110, borderColor: `${props.color}`,justifyContent: 'center', alignItems: 'center'}]
           }>
          <Image tintColor={props.color} resizeMode="contain" source = {require('../assets/plus.png')} style={[styles.image, {height:35, width: 35}]}/>
        </TouchableOpacity>
      </View>

    );
  };
  const handleUpload = async () => { 
    try {
      const currentDate = new Date(); 
      const uploadedImageURLs = [];
  
      // Upload each image to Firebase Storage and get the download URL
      for (const imageUri of images) {
        const imageName = `img-${currentDate.getTime()}`;
        const response = await fetch(imageUri);
        const blob = await response.blob();
        
        // Create a reference to the storage location
        const storageRef = ref(storage, `images/${imageName}`);
        
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, blob);
  
        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        uploadedImageURLs.push(downloadURL);
      }
  
      // Add product data including image URLs to Firestore
      const docRef = await addDoc(collection(fdb, 'products'), {
        name: productName,
        price: productPrice,
        condition: productCondition,
        description: productDescription,
        tags: productTags,
        images: uploadedImageURLs, // Store image URLs in Firestore
        userId: userId,
        date: currentDate,
      });
  
      console.log('Document written with ID: ', docRef.id);
      // Reset form fields after successful submission
      setProductName('');
      setProductPrice('');
      setProductCondition('');
      setProductTags('');
      setProductDescription('');
      setImages([]);
  
      alert('Product added successfully!'); 
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error('Error adding product: ', error);
      // Show error alert
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Back Button 
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View> */}
      <View style={[styles.headerContainer, {marginBottom: 17, marginLeft: 21}]}>
        <Image resizeMode="contain" source = {require('../assets/close.png')} style={[styles.image, {width: 22, height: 22}]}/> 
        <TouchableOpacity onPress={handleSaveDraft} style={{marginLeft: 200}}>
          <Text style = {[styles.inputLabel]}> 
            SAVE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpload} style= {{marginLeft: 24}}>
          <Text style = {[styles.inputLabel]}> 
            PUBLISH
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.headerContainer, {marginLeft: 21, borderBottomWidth: 2}]}>
        <Text style = {[styles.inputLabel, {color: 'black'}]}> 
          IMAGES/VIDEO
        </Text>
      </View>
      <View style = {[{marginLeft: 21, marginTop: 18, marginRight: 24}]}>
        <View style= {styles.row}>
          <ImageButton color='#FF6767'/>
        </View>
        {/*<ImageButton color='black'/> we only need one for now*/}
        <Text style={[styles.smallText, {color: '#FF6767'}]}>one photo/video required</Text>
        <Text style = {[styles.smallText]}>(drag to reorder)</Text>
      </View>

        {/* The button look on IOS is kind of ugly, but refactoring it into a touchableOpacity would require 
          some workaround. */}
        <ScrollView horizontal>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={{ width: 200, height: 200, margin: 5 }} />
          ))}
        </ScrollView>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Note: add stars to unfilled fields and the FF6767 color for unfilled fields */}
        <View style = {{borderBottomWidth: 2, marginBottom: 16}}>
        <Text style={[styles.inputLabel, {color:'black', marginBottom: 6}]}> Product Information </Text>
        </View>

        <Text style={styles.inputLabel}> Product Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the name of your product"
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.inputLabel}> Price *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the price of your product in USD"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />
        {/*this is now a dropdown to select condition*/}
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { marginBottom: 1 }]}>Item's Condition *</Text>
        <Picker
          selectedValue={productCondition}
          onValueChange={(itemValue) => setProductCondition(itemValue)}>
          {conditions.map((condition, index) => ( //uses the picker and the 
          //condition states that we have in the beg to map it
            <Picker.Item key={index} label={condition} value={condition} />
          ))}
        </Picker>
      </View>
      </SafeAreaView>

      <Text style={[styles.inputLabel, { marginBottom: 1 }]}>Select Item's Category *</Text>
    <Picker
    selectedValue={productTags} //using the picker to have tags for the different categories 
    onValueChange={(itemValue) => setProductTags(itemValue)}> 
    <Picker.Item label="Textbook" value="Textbook" />  
    <Picker.Item label="Clothing" value="Clothing" />
    <Picker.Item label="Dorm Essentials" value="Dorm Essentials" />
    <Picker.Item label="Technology" value="Technology" />
    <Picker.Item label="Miscellaneous" value="Miscellaneous" />
        </Picker>



        <Text style={styles.inputLabel}> Description </Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Provide detailed information about your product"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline
        />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backButtonContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#e7e7e7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  backButtonText: {
    color: '#000000',
    fontSize: 14,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 360, // Adjust padding to accommodate the navbar
  },
  dottedBorder: {
    borderStyle: 'dotted',
    borderColor:'#FF6767',
    borderRadius: 6,
    borderWidth: 2,
  },
  container2: {
    padding: 10,
    borderBottomWidth: 2,
    height: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginBottom: 5,
    marginRight: 24,
  },
  inputLabel: {
    fontFamily: 'ralewaybold',
    fontSize: 14,
    marginBottom: 6,
    color: '#FF6767',
  },  
  button: {
    borderWidth: 3,
    borderColor: "blue",
    borderRadius: 5,
    alignItems: 'center',
    width: '10%',
  },
  input: {
    height: 40,
    borderColor: '#FF6767',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'ralewaylight',
    borderRadius: 5,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '10%',
    height: undefined,
    aspectRatio: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  smallText: {
    fontFamily: 'ralewaylight',
    fontSize: 12,
  }
});

export default CreateNewListing;