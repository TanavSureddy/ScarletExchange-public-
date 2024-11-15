
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image} from 'react-native';
import offerStyle from '../styles/offerStyle';
//import firestore from '@react-native-firebase/firestore';

// this will hold our offers 
// no code in it right now 
// three parameters, image src, name of item and cost

// we also need a heart button component 

// 
const OfferBar = ({itemName="NULL", cost=0}) => {
    return (
        <View style={[offerStyle.container, offerStyle.border]}>
            <>
            <Image 
                style={{ width: '100%', height: undefined, aspectRatio: 1 }} 
                resizeMode="contain" 
                source={require('../assets/Logo.jpg')}
            />
            </>
            <>
            <Text>
                Name: {itemName} {"\n"}
                Cost: ${cost}
            </Text>
            </>

        </View>
        
    );
}


export default OfferBar;