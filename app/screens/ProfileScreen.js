import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { fdb } from '../config/firebaseSetup';
import Navbar from '../components/Navbar'; 
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => { 
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null); 
    const [userImg, setUserImg] = useState(null);
  const goToDrafts = () => {
    navigation.navigate('DraftsPage');
  };

  const goToNewItem = () => {
    navigation.navigate('CreateNewListing');
  };

  const handleEditProfile = () => {

    navigation.navigate('EditProfileScreen', {userId: user.uid}); // Navigate to EditProfileScreen

  };

  const handleCreateNewListing = () => {
    navigation.navigate('CreateNewListing');
  };


  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(fdb, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) { 
        const userData = docSnap.data();
        setUserData(userData);
        setUserImg(userData.userImg);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const fetchProducts = async (userId) => {
    try {
        const q = query(collection(fdb, 'products'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
    
        const productsList = [];
        querySnapshot.forEach((doc) => {
          productsList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsList);
    
        if (querySnapshot.empty) {
          console.log('No products listed by the user.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
      /*const fetchUpdatedProfileData = async (userId) => {
        try {*/
  };

  useEffect(() => {
    const success = route.params?.setSuccess;
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(success){
            setUserData(null);
            setUser(user);
            fetchUserData(user.uid);

          }
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
        fetchProducts(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.userImg}
            source={{
              uri: userImg ? userImg : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvRezh6gJwbRNHueze-bhw3PmbmI',
            }}
            defaultSource={require('../assets/default_profile_img.png')}
          />
          <Text style={styles.userName}>{userData?.fname || 'Test'} {userData?.lname || 'User'}</Text>

          <View style={styles.starsContainer}>
          <Image 
                source={require('../assets/star.png')} 
                style={styles.stars}
                resizeMode="cover"
            />
            <Image 
                source={require('../assets/star.png')} 
                style={styles.stars}
                resizeMode="cover"
            />
            <Image 
                source={require('../assets/star.png')} 
                style={styles.stars}
                resizeMode="cover"
            />
            <Image 
                source={require('../assets/star.png')} 
                style={styles.stars}
                resizeMode="cover"
            />
            <Image 
                source={require('../assets/star.png')} 
                style={styles.stars}
                resizeMode="cover"
            />

          <TouchableOpacity style={styles.button} >
            <Text style={styles.Text}>(2 REVIEWS)</Text>
          </TouchableOpacity>

            
          </View>

          <View style={styles.profilebar}>
          <TouchableOpacity style={styles.preferences} onPress={handleEditProfile}>
          <Image 
                        source={require('../assets/settings.png')} 
                        resizeMode="cover"
                        style={styles.preferences}
                    />
          </TouchableOpacity>

          <TouchableOpacity style={styles.analytics} >
          <Image 
                        source={require('../assets/analytics.png')} 
                        resizeMode="cover"
                        style={styles.analytics}
                    />
          </TouchableOpacity>

          <TouchableOpacity style={styles.history} >
          <Image 
                        source={require('../assets/history.png')}
                        resizeMode="cover"
                        style={styles.history}
                    />
          </TouchableOpacity>

          </View>

          <View style = {styles.textbar}>
            <Text style = {styles.preferencesText}> PREFERENCES</Text>
            <Text style = {styles.analyticsText}> ANALYTICS</Text>
            <Text style = {styles.historyText}> HISTORY</Text>

          </View>
            
          <TouchableOpacity style={styles.newItem} onPress={goToNewItem}>
          <Image 
                        source={require('../assets/newItem.png')} 
                        style={styles.newItemPicture}
                    />
            <Text style={styles.itemText}>  | Create New Item</Text>
            
          </TouchableOpacity>

          
          
        </View>
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.draftButton} onPress={goToDrafts}>
          <Image 
                        source={require('../assets/folder.png')} 
                        style={styles.folderIcon}
                    />
            <Text style={styles.draftButtonText}>Drafts</Text>
          </TouchableOpacity>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productContainer}
              onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
            >
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.productThumbnail}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const numColumns = 3;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImg: {
    height: 120,
    width: 120,
    borderRadius: 75,
  },
  userName: {
    fontFamily: "ralewaybold",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,

  },

  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  Text: {
    fontFamily: 'ralewaylight',
    color: 'red',
    padding: 10,
    
  },

  profilebar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  textbar: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20
    
  },
  preferences: {
    marginRight: 30, 
  },
  
  analytics: {
    marginRight: 30, 
  },
  
  history: {
    
  },

  preferencesText: {
    fontSize: 10,
    fontFamily: 'ralewaylight',
  

  
  },

  analyticsText: {
    fontSize: 10,
    fontFamily: 'ralewaylight',
    marginHorizontal: 25,
    marginRight: 30
    

  },
  historyText: {
    fontSize: 10,
    fontFamily: 'ralewaylight',
    marginRight: 22
  },
  newItem: {
    paddingHorizontal: 90,
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 45,
    width: 340,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,

  },

  itemText: {
    fontSize: 15,
    fontFamily: 'ralewaylight'
  },
  editButton: {
    backgroundColor: '#2e64e5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  draftButton: {
    borderWidth: 1,
    borderColor: 'black',
    height: 130,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  folderIcon: {
    marginBottom: 10

  },
  draftButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'ralewaylight',
    color: 'black',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: -10,
    marginBottom: 20,
    marginLeft: 20

  },
  productContainer: {
    borderWidth: 1,
    borderColor: 'black',
    height: 130,
    width: 130,
    marginBottom: 10,
    marginRight: 35,
    border: 10,
    overflow: 'hidden',
  },
  productImageContainer: {
    flex: 1
  },
  productThumbnail: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
