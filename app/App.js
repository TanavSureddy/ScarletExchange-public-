import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; 
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {useFonts} from 'expo-font';
import ResetPassword from './screens/ResetPassword';
import PasswordResetConfirm from './screens/PasswordResetConfirm';
import SavedProductsScreen from './screens/SavedProductsScreen';
import InboxScreen from './screens/InboxScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen  from './screens/EditProfileScreen';
import CreateNewListing from './screens/CreateNewListing';
import ProductDetailScreen from './screens/ProductDetails';
import DraftsPage from './screens/DraftsPage';
import RegistrationScreen from './screens/RegistrationScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    ralewaybold: require('./assets/ralewaybold.ttf'),
    ralewaylight: require('./assets/ralewaylight.ttf'),
  });



  
  
  if(!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="SavedProductsScreen" component={SavedProductsScreen} options={{ headerShown: false }}/>  
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }}/>  
        <Stack.Screen name="CreateNewListing" component={CreateNewListing} options={{ headerShown: false }}/>
        <Stack.Screen name="InboxScreen" component={InboxScreen} options={{ headerShown: false }}/>  
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>  
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>  
        <Stack.Screen name="PasswordResetConfirm" component={PasswordResetConfirm} options={{ headerShown: false }}/> 
        <Stack.Screen name="ProductDetails" component={ProductDetailScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="DraftsPage" component={DraftsPage} options={{ headerShown: false }}/>  
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

