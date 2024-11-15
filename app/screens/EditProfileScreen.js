import React from 'react' 
import { View, TextInput, Button, ScrollView, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { editProfile, uploadProfileImg } from '../api/ProfileAPI';
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



const EditProfileScreen = () => {
    const navigation = useNavigation();
    console.log(navigation);
    const route = useRoute();
    const userId = route.params?.userId;
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [userImg, setUserImg] = useState('');
    const editedData = {};
    if (email !== '') editedData.email = email;
    if (fname !== '') editedData.fname = fname;
    if (lname !== '') editedData.lname = lname;
    if (userImg !== '') editedData.userImg = userImg
    const [successScreen, setSuccessScreen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [imgUri, setImgUri] = useState(null);
    const handleEditProfileScreen = async () => {
        try{
            console.log("reached here");
            console.log("editedData before sending:",editedData);
            const resp = await editProfile(userId, editedData);

            //calls api method
            if (!resp.error){
                setSuccessScreen(true);
                setSuccess(true);
                navigation.navigate('HomeScreen');
                //alerts if method response is successful
            } else{
                console.log(resp.message);
                //returns error in executing the editing of profile
            }
        } catch (error) {
            alert('error');
            console.error(error);
        }
    };
    const Img = null;
    const handleUploadProfileImg = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
      try{
            const imageURI = result.assets[0].uri;
            setImgUri(imageURI);
            const storage = getStorage();
            const imageName = 'ProfileImg-${currentDate.getTime()}';

            const response = await fetch(imageURI);
            const blob = await response.blob();
            const storageRef = ref(storage, `images/${imageName}`);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            setUserImg(downloadURL);

        //const storage = getStorage();
        //const imageRef = ref(storage, `profileImage/${userId}/${Date.now()}.jpg`);

            /*const resizedImage=  ImageManipulator.manipulateAsync(
                        imageUri,
                        [{ resize: { width: 150, height: 150 } }],
                        { compress: 1, format: 'jpeg', base64: false }
                      );
                      console.log(resizedImage);*/

            setIsVisible(true);
            await editProfile(userId, editedData);
        } catch(error){
            console.log("error in uploading image url ", error);
        }
        } else {
            console.log('Error uploading image, result cancelled');
          }
    };

    return (
        <SafeAreaView style={styles.safeArea}>

              {/* Back Button */}
              <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.headerContainer, {marginBottom: 17, marginLeft: 21}]}>

                <TouchableOpacity style={{marginLeft: 200}}>
                  <Text style = {[styles.inputLabel, {color: 'black'}]}>
                    SAVE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style= {{marginLeft: 24}}>
                  <Text style = {[styles.inputLabel, {color: 'black'}]}>
                    PUBLISH
                  </Text>
                </TouchableOpacity>
              </View>


              <ScrollView contentContainerStyle={styles.container}>
                {/* Note: add stars to unfilled fields and the FF6767 color for unfilled fields */}
                <View style = {{borderBottomWidth: 2, marginBottom: 16}}>
                <Text style={[styles.inputLabel, {color:'black', marginBottom: 6}]}> Profile Information </Text>
                </View>

                <Text style={styles.inputLabel}> Edit Email </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Set new email"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={styles.inputLabel}> Edit First Name </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Set new first name"
                  value={fname}
                  onChangeText={setFname}
                />
                {/* Note: make this a dropdown, and a cropdown for category as well */}
                <Text style={styles.inputLabel}> Edit Last Name </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Set new last name"
                  value={lname}
                  onChangeText={setLname}
                />

               <View style={styles.container}>

                           <TouchableOpacity style={styles.backButton}
                               onPress={handleUploadProfileImg}>
                               <Text style={styles.backButtonText}>
                                   Upload Image
                               </Text>
                           </TouchableOpacity>

                               <View style={styles.imageContainer}>
                                   <Image source={{ uri: imgUri }}
                                       style={{ width: 200, height: 200, margin: 5 }} />
                               </View>

                           <Button title="Submit" onPress={handleEditProfileScreen} />
                                          {successScreen && <SuccessMessage message= 'Profile updated' />}
                       </View>

              </ScrollView>

              <Navbar />
            </SafeAreaView>
    )
}
export default EditProfileScreen;
const SuccessMessage = ({message}) => {
        console.log("success screen set");
        return(
        <View>
        <Text> {message} </Text>
        </View>
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
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 60, // Adjust padding to accommodate the navbar
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
    fontSize: 16,
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
    fontSize: 16,
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

