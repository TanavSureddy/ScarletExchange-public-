import React from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'

// Separate component for Logo
const Logo = () => {
    return (
      <Image
        source={require('../assets/Logo.jpg')}
        style={{ justifyContent: 'center', alignItems: 'center', width: 176, height: 220, marginTop: 5, zIndex:1 }}
      />
    );
  };

export default Logo;