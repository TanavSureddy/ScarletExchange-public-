import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'; 
import { auth , } from "../config/firebaseSetup"; 
import { sendPasswordResetEmail } from "firebase/auth";
import loginStyles from "../styles/LoginStyles";
import Logo from "../components/logo";
import EmailInput from "../components/emailInput"; 

// Separate component for Login Button

// Separate component for Sign Up Text

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const navigation = useNavigation(); 

    const fbauth = auth;

    //Handles Password Reset Requests
    const passwordResetHandler = async () => {  
        try {  // you can comment and uncomment the email.endsWith part for debugging
            if (email.endsWith('@scarletmail.rutgers.edu')) {
                // If the email address is allowed, proceed with sending
                if (emailConfirm === email)
                {
                    sendPasswordResetEmail(auth, email)
                    .then(() => { 
                        alert("Email sent. Please check your inbox!");
                        navigation.navigate("LoginScreen")
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      // ..
                    });
                } else {
                    console.log("Email doesn't match");
                }
            }
        } catch (error) {
            console.log(error); 
            alert("Reset Failed:" + error.message)
        }
    }

    return (
        <SafeAreaView style={loginStyles.safeArea}>
        <ScrollView contentContainerStyle={loginStyles.safeArea}>

        <Logo />
        <Text style={loginStyles.titleText}>Reset Password</Text>
        <EmailInput email={email} setEmail={setEmail} />
        <EmailInput email={emailConfirm} setEmail={setEmailConfirm} />
        <TouchableOpacity
      onPress={passwordResetHandler}
      style={loginStyles.button}
    >
      <Text style={{ textAlign: 'center', color: 'black', fontSize: 15 }}>Send Password Reset</Text>
    </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;