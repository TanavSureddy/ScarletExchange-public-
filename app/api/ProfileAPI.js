import { fdb } from "../config/firebaseSetup";
import { doc,collection, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import * as firebase from 'firebase/app';
import 'firebase/storage';
export async function editProfile(userId, editedData){
    try{
        const profile = doc(fdb, "users", userId);
        //fetches user info with userId
        const profileSnapShot = await getDoc(profile);
        if(!profileSnapShot.exists()) throw new Error('User not found');
        //checks if the user exists

        const { email, fname, lname, userImg } = editedData;
        //stores the new data in updatedData

        const resp = await updateDoc(profile, editedData);
        //updates profile with new data

        return{message: 'Profile successfully edited'}

    }catch(error){
        return error;
    }

}
export async function uploadProfileImg(userId, Img){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status);
        if (status != "granted"){
            alert("Permission denied");
        } else {
                  try {
                      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });

                      if (!result.canceled) {

                          const uploadResponse = await uploadImageToExternalService(result.uri);
                          const imageUrl = uploadResponse.data.imageUrl;
                          if (!uploadResponse.error) {
                              const profileRef = doc(fdb, "users", userId);
                              const resp = await updateDoc(profileRef, { userImg: imageUrl });
                              console.log("Successfully set image to uploaded image");
                          } else {
                              console.error("Error uploading", error);
                          }

                      } else {
                          alert("Image launch unsuccessful");
                      }
                  } catch (error) {
                      console.error("Unsuccessful image upload", error);
                      return { error };
                  }
              }
}