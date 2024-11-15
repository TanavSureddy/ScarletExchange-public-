import React from "react";
import { View, TextInput } from 'react-native'
import loginStyles from "../styles/LoginStyles";
// Separate component for Email Input
const EmailInput = ({ email, setEmail }) => {
    return (
      <View style={loginStyles.EmailInput}>
      
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          style={[{ fontFamily: 'ralewaylight' }, { color: 'black' }]}
          /> 
      </View>
    );
  };

export default EmailInput;