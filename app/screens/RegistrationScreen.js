import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'; 
import { auth ,fdb } from "../config/firebaseSetup";  
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import baseStyle from "../styles/baseStyle";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Logo from "../components/logo";
import ResetPassword from "./ResetPassword"; 
import * as ImagePicker from 'expo-image-picker';

const RegistrationScreen = () => {
 // yay nested components 
// Separate component for Email Input
const FieldInput = ({ field, setField, placeholder }) => {
  return (
    <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1, borderRadius: 10, width: 321, height: 49, padding: 10, marginBottom: 25 }}>
    
      <TextInput
        placeholder={placeholder}
        value={field}
        onChangeText={text => setField(text)}
        autoCapitalize="none"
        style={[{ fontFamily: 'ralewaylight' }, { color: 'black' }]}
      /> 
    </View>
  );
};

//Component to pick profile picture: 
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
      setImages(prevImages => [...selectedImages]); //  you can only use one image as your profile image
    }
  };

  // Separate component for Login Button

const dummy = () => {
    console.log("hello world...");
};

const LoginButton = ({ onPress }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        fontFamily: 'ralewaylight',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        borderColor: '#000000',
        borderWidth: 1,
        width: 227,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'ralewaybold'}}>Register</Text>
    </TouchableOpacity>
  );
};

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigation = useNavigation(); 
    const [images, setImages] = useState([]);


    const fbauth = auth; 

    // Sign in and Sign up request are not available on this page yet. Mainly because I don't know how to do authentication

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Logo />
        <Text style={{ fontFamily: 'ralewaybold', fontSize: 40, paddingBottom: 30, paddingTop: 30, fontWeight: '900'}}>Register</Text>
        <FieldInput field={firstName} setField={setFirstName} placeholder="First Name"/>
        <FieldInput field={lastName} setField={setLastName} placeholder="Last Name"/>
        <Text style={[styles.smallText, {marginBottom: 4}]}> Upload your profile image! (optional)</Text>
        <ImageButton />
        <ScrollView horizontal>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={{ width: 200, height: 200, margin: 5 }} />
          ))}
        </ScrollView>
        <LoginButton onPress={dummy} />

        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    smallText: {
        fontFamily: 'ralewaylight',
        fontSize: 14,
      },
  });

export default RegistrationScreen;