import React, { useEffect, useState } from 'react';
// import { CLIENT_ID, CLIENT_SECRET } from '@env'
// import axios from 'axios';
import { Button, Linking, TouchableOpacity, Alert} from 'react-native';
import Chat from './Components/Chat';
import PostDetail from './Components/Postdetail';
import PostCreate from './Components/PostCreate';
import DiscordLogin from './Components/DiscordLogin';
import UserProfile from './Components/UserProfile';
import { Text, StyleSheet, Image, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import logo from './img/logo.png';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import addImg from './img/plus.png';
import filterImg from './img/sort.png';
import Hyperlink from 'react-native-hyperlink';

import { TextInput } from 'react-native';
import { create } from 'react-test-renderer';


const Stack = createStackNavigator();
// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="MainScreen">
//         <Stack.Screen name="MainScreen" component={MainScreen} />
//         <Stack.Screen name="PostDetail" component={PostDetail} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
const Tab = createBottomTabNavigator();

const App = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showCreate,setShowCreate] = useState(false);

  const handleDiscordLogin = (username) => {
    setUser(username);
  };

  const handlePostBack = () => {
    console.log("HandlePostBack")

    setShowPost(false);
  }
  const handleCreateBack = (isCreate) => {
    if (isCreate === true){
      Alert.alert(
        "Post Created!",
      );
    }
   
    console.log("HandleCreatBack")
    setShowCreate(false);
  }
  // event listeners
  //Linking.addEventListener('url', handleCallback);

// ============================================================
// ============================================================
  const Post = ({ title, subTitle, user, timeAgo, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.post}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postSubTitle}>{subTitle}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={styles.userName}>{user}</Text>
          <Text style={styles.timeStamp}>{timeAgo}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const TopBar = ({ onPress }) => {
    return (
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>POSTS</Text>
        <TouchableOpacity onPress={onPress} style={styles.addButton}>
          <Image source={addImg} style={{ width: 24, height: 24, }} />
        </TouchableOpacity>
      </View>
    );
  };  
  const SearchBar = ({ onSearch, onFilterPress }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = () => {
      onSearch(searchQuery);
    };
  
    return (
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Text style={{ marginRight: 5 }}>Sort by:</Text>
        <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
          <Image source={filterImg} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
    );
  };
// Added extra on line 161 since user isnt rendering and to see styling
  const MainScreen = () => {
    // Dummy data for posts
    
    const postsData = [
      { title: 'Tournament group', subTitle: 'Rocket League', user: 'User379', timeAgo: '1h ago' },
      { title: 'Ranked', subTitle: 'CS:GO', user: 'DevinSurf', timeAgo: '2h ago' },
      { title: 'casual group', subTitle: 'CS:GO', user: 'evilblue', timeAgo: '4 ago' },
      { title: 'sample farming', subTitle: 'Helldivers 2', user: 'rob_bot4', timeAgo: '1d ago' },
      { title: 'onyx arena team', subTitle: 'Halo Infinite', user: 'demon117', timeAgo: '2d ago' },
      // ... more posts
    ];
    const handlePostPress = (post) => {
      setShowPost(true);
    };
    const handleAddPress = (create) => {
      setShowCreate(true);
      // Handle the add button press here
    };
    
    const handleSearch = (query) => {
      console.log('Searching for:', query);
      // Perform search operation here
    };
    const handleFilterPress = () => {
      console.log('Filter button pressed');
      // Here you will later implement opening the filters
    };

    if (showPost){
      return(
        <SafeAreaProvider>
          <PostDetail onPost = {handlePostBack} />
        </SafeAreaProvider>
      )   
    }
    if (showCreate){
      return(
        <SafeAreaProvider>
          <PostCreate onAdd = {handleCreateBack} />
        </SafeAreaProvider>
      )   
    }
    else
    {
      return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#d7d1e8', }}>
          <View style={{ 
            padding: 20, // You can adjust padding as needed
          }}>
            <TopBar onPress={() => handleAddPress()} />
            {/* {user && <Text style={{ fontSize: 18 }}>Hi, <Text style={{ fontWeight: 'bold', color: 'black' }}>{user.username}</Text></Text>} */}
            <SearchBar onSearch={handleSearch} onFilterPress={handleFilterPress} />
          
          </View>
          
          {/* Posts list */}
          <View style={{
            flex: 1, // This will ensure that the posts take up the remaining space
            justifyContent: 'center',
            top: '-7%',
            alignItems: 'center',
          }}>
          {postsData.map((post, index) => (
            <Post key={index} {...post} onPress={() => handlePostPress(post)} />
          ))}
        </View>
        </SafeAreaProvider>
      );
    } 
  };
  // Add the styles for your components here
  
// ============================================================
// ============================================================
  const UserProfileScreen = () => {
    const onSave = (userFormData) =>{
      // set it locally
      setUser(userFormData);

      saveUser(userFormData).then(isSaved => {
        if (isSaved){
          console.log("Profile saved!");
        }
      }).catch(error => {
        console.error('Failed to save User Profile', error);
      });
      
    };
    console.log("THE USER PROFILE IS PASSING: ", user);
    return (
      <SafeAreaProvider>
        <UserProfile user={user} onSave={onSave}/>
      </SafeAreaProvider>
    );
  };


  const UserMessage = () => {
    return(
      <SafeAreaProvider>
        <Chat/>
      </SafeAreaProvider> 
    )
  };


  // renders
  const renderContent = () => {
    if (!user) {
      // getUser().then(fetchedUser => {
      //   setUser(fetchedUser);
      //   if (fetchedUser.encoded_game_data) {
      //     setIsEncoded(true);
      //   }
      // }).catch(error => {
      //   console.warn('Failed to fetch User, new user detected', error);
      // });
  
      return (
        <LinearGradient
          colors={['rgb(124,80,232)', 'transparent']}
          style={styles.background}
        >
          <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.welcomeText}>Welcome to LobbyHunter!</Text>
            <Hyperlink linkDefault={true} linkStyle={{ color: '#2980b9' }}>
            <Text style={styles.privacyText}>
              By clicking Log in, you agree with our 
              <Text style={{color: 'rgb(124,80,280)'}}> Terms</Text>. 
              Learn how we process your data in our 
              <Text onPress={() => Linking.openURL('http://example.com/privacy')}>
                Privacy Policy
              </Text> 
              and 
              <Text onPress={() => Linking.openURL('http://example.com/cookies')}>
                Cookies Policy
              </Text>.
            </Text>
          </Hyperlink>
            <DiscordLogin onSubmit={handleDiscordLogin}/>
          </SafeAreaView>
        </LinearGradient>
      );
    }
  
  
  
    else if (user) {
      return (   
          <NavigationContainer>
          
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
            tabBarOptions={{ 
              activeTintColor: '#4630EB', 
              inactiveTintColor: 'gray', 
            }}
            tabBarStyle= {{
              backgroundColor: 'transparent', 
            }}>
            <Tab.Screen name="Home" component={MainScreen} 
              options={{
                tabBarIcon: ({color, size}) => (
                  <Image
                    source={require('../App/img/home.png')}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                ),
              }}
            />
            <Tab.Screen name="Chat" component={UserMessage} 
              options={{
                tabBarIcon: ({color, size}) => (
                  <Image
                    source={require('../App/img/chat.png')}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                ),
              }}
            />

            <Tab.Screen name="Profile" component={UserProfileScreen} 
              options={{
                tabBarIcon: ({color, size}) => (
                  <Image
                    source={require('../App/img/user.png')}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer> 
      );
    }
  }
  return renderContent();
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  privacyText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    width: 200, // adjust these values as needed
    height: 200, // adjust these values as needed
    resizeMode: 'contain', // this will ensure the logo is fully visible and maintains its aspect ratio
  },
  // MAIN SCREEEEEEEN=====================================
  post: {
    backgroundColor: 'white',
    width:'90%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postSubTitle: {
    fontSize: 14,
    color: '#666',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
  },
  
  topBar: {
    
    height: '30%', // Adjust the height as needed
    paddingHorizontal: 30, // Add padding horizontally
    backgroundColor: '#4630EB', // Choose your preferred bar color
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Distribute space between elements
    paddingTop:20, // For status bar on iOS
  },
  topBarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    left: '160%',
  },
  addButton: {
    // Styles for the button
  },
  addButtonText: {
    color: 'white',
    fontSize: 30, // Adjust the size as needed
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row', // Align search input and filter button in a row
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center', // Center items vertically
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 16,
    flex: 1, // Take up as much space as possible
    marginRight: 10, // Add some margin between the search input and the filter button
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#e0e0e0', // Temporary background color for the filter button
    borderRadius: 20, // Make it rounded
  },
  filterButtonText: {
    fontSize: 18, // Adjust the font size as needed
    color: '#333', // Temporary text color for the filter button symbol
  },
  // =========================================================================================
});

export default App;

