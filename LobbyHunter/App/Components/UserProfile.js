import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

const UserProfile = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(user.about);
  const [imageUri, setImageUri] = useState(user.avatar);
  const [platform, setPlatform] = useState(user.platform);
  const [dob, setDob] = useState(user.dob);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      about,
      platform,
      dob,
      avatar: imageUri,
    };
    onSave(updatedUser);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBackPress = () => {
    setIsEditing(false);
  };

  const handleAddPress = () => {
    console.log('Button pressed');
    // Handle the button press here
  };

  // Define Post component
  const Post = ({ title, subTitle, user, timeAgo }) => {
    return (
      <View style={styles.post}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postSubTitle}>{subTitle}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={styles.userNamePosts}>{user}</Text>
          <Text style={styles.timeStamp}>{timeAgo}</Text>
        </View>
      </View>
    );
  };

  // Define postsData array
  const postsData = [
    { title: 'Tournament group', subTitle: 'Rocket League', user: 'User379', timeAgo: '1h ago' },
    // Add more posts as needed
  ];

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#d7d1e8', paddingHorizontal: 20}}>
      {/* Main TopBar */ }
      <View style={{ padding: 10 }}/>
      <View style={styles.topBar}>
        {isEditing ? (
          <>
            {/* Back button on the left side */}
            <TouchableOpacity onPress={handleBackPress}>
              <Image source={require('../img/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.topBarEditProfileText}>EDIT PROFILE</Text>

            {/* Save button on the right side */}
            <TouchableOpacity onPress={handleAddPress}>
              <Image source={require('../img/save.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.topBarProfileText}>PROFILE</Text>
            {/* Add your existing TopBar content for non-editing state */}
            {/* If you want an edit button here, use a TouchableOpacity with an onPress event to set isEditing to true */}
            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
              <Image source={require('../img/edit.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </>
        )}
        </View>  

      <SafeAreaView>
        {isEditing ? (
          <>
            {/* Main container with row layout */}
            <View style={styles.mainContainer}>
              {/* Left section for username and profile picture */}
              <View style={styles.leftSection}>
                {/* Display the username at the top */}
                <Text style={styles.userName}>User71{user.username}</Text>

                {/* Profile picture container */}
                <View style={styles.profilePictureContainer}>
                  {/* Display the profile picture underneath the username */}
                  <Image source={require('../img/profile.png')} style={styles.profilePicture} />

                  {/* Change picture button overlaying profile picture */}
                  <TouchableOpacity style={styles.addProfileButton} onPress={pickImage}>
                    <View style={styles.addProfileButtonCircle}>
                      <Text style={styles.arrowText}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Right section for description box */}
              <View style={styles.rightSection}>
                  {/* About section container */}
                  <View style={styles.aboutContainer}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.aboutInput}
                        value={about}
                        onChangeText={setAbout}
                        placeholder="Tell us what kind of gamer you are!"
                        multiline={true} // Enable multiline for bio
                        numberOfLines={5}
                      />
                    </View>
                  </View>
              </View>
            </View>

            {/* Display other user information as desired */}
            { /* Adding a container for games information */}
            <View style={styles.gamesContainer}>
              {/* Create a row layout with "Games:" header and paltoforms */}
              <View style={styles.activityHeaderRow}>
                <Text style={styles.gamesHeader}>Games:   </Text>
                <TextInput
                  style={styles.gamesTextInput}
                  placeholder="Enter game"
                  placeholderTextColor="#6e6e6e"
                />
                {/* Add game button */}
                <TouchableOpacity style={styles.addGameButton} onPress={handleAddPress}>
                  {/* Circle around the '+' text */}
                  <View style={styles.addGameButtonCircle}>
                    <Text style={styles.arrowText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* List of games */}
              <View style={styles.gamesList}>
                <View style={styles.gameItem}>
                  {/* x-mark button */}
                  <TouchableOpacity onPress={handleAddPress}>
                    <Image source={require('../img/x-mark.png')} style={styles.xMarkIcon} />
                  </TouchableOpacity>
                  {/* Game name */}
                  <Text style={styles.gameText}>Rocket League</Text>
                </View>
                <View style={styles.gameItem}>
                  {/* x-mark button */}
                  <TouchableOpacity onPress={handleAddPress}>
                    <Image source={require('../img/x-mark.png')} style={styles.xMarkIcon} />
                  </TouchableOpacity>
                  {/* Game name */}
                  <Text style={styles.gameText}>Counter Strike: Global Offensive</Text>
                </View>
                <View style={styles.gameItem}>
                  {/* x-mark button */}
                  <TouchableOpacity onPress={handleAddPress}>
                    <Image source={require('../img/x-mark.png')} style={styles.xMarkIcon} />
                  </TouchableOpacity>
                  {/* Game name */}
                  <Text style={styles.gameText}>Animal Crossing</Text>
                </View>
              </View>
            </View>

            {/* Platforms section */}
            <View style={styles.gamesContainer}>
              {/* Create a row layout with "Platforms:" and input field */}
              <View style={styles.gamesHeaderContainer}>
                {/* Games header text */}
                <Text style={styles.gamesHeader}>Platforms: </Text>
              </View>

              {/* Container for the platform logo and input field */}
              <View style={styles.row}>
                {/* Platform logo */}
                <Image source={require('../img/xboxLogo.png')} style={styles.platformLogo} />

                {/* Input field for the platform username */}
                <TextInput
                style={styles.platformInput}
                placeholder="Enter platform username"
                placeholderTextColor="#6e6e6e"
                onChangeText={setPlatform}
                />
              </View>

                {/* Container for the platform logo and input field */}
                <View style={styles.row}>
                {/* Platform logo */}
                <Image source={require('../img/steamLogo.png')} style={styles.platformLogo} />

                {/* Input field for the platform username */}
                <TextInput
                style={styles.platformInput}
                placeholder="Enter platform username"
                placeholderTextColor="#6e6e6e"
                onChangeText={setPlatform}
                />
              </View>

            </View>
          </>
        ) : (
          <>
            {/* Existing code for non-editing mode */}
            {/* Main container with row layout */}
            <View style={styles.mainContainer}>
              {/* Left section for username and profile picture */}
              <View style={styles.leftSection}>
                {/* Display the username at the top */}
                <Text style={styles.userName}>User71{user.username}</Text>

                {/* Display the profile picture underneath the username */}
                <Image source={require('../img/profile.png')} style={styles.profilePicture} />
              </View>

              {/* Right section for description box */}
              <View style={styles.rightSection}>
                  {/* About section container */}
                  <View style={styles.aboutContainer}>
                    <Text style={styles.about}>{about}</Text>
                  </View>
              </View>
            </View>

            {/* Message button */}
            <View style={styles.messageButtonContainer}>
              <TouchableOpacity style={styles.messageButton} onPress={handleAddPress}>
                <Text style={styles.messageButtonText}>Invite +</Text>
              </TouchableOpacity>
            </View>

            {/* Display other user information as desired */}
            { /* Adding a container for games information */}
            <View style={styles.gamesContainer}>
              {/* Create a row layout with "Games:" header and paltoforms */}
              <View style={styles.gamesHeaderContainer}>
                <Text style={styles.gamesHeader}>Games:   </Text>
                {/* Container for the platforms */}
                <View style={styles.platformsContainer}>
                  <Image source={require('../img/xboxLogo.png')} style={styles.platformLogo} />
                  <Text style={styles.platformText}>sly882</Text>
                  <Image source={require('../img/steamLogo.png')} style={styles.platformLogo} />
                  <Text style={styles.platformText}>FireFury</Text>
                </View>
              </View>
              {/* List of games */}
              <View style={styles.gamesList}>
                <Text style={styles.gameText}>Rocket League</Text>
                <Text style={styles.gameText}>Counter Strike: Global Offensive</Text>
                <Text style={styles.gameText}>Animal Crossing</Text>
              </View>
            </View>

            {/* Activity section */}
            <View style={styles.activityContainer}>
              {/* Create a row layout with "Activity:" and "Posts" box */}
              <View style={styles.activityHeaderRow}>
                {/* Activity header text outside the container */}
                <Text style={styles.activityHeaderText}>Activity: </Text>

                {/* Create a container for "Posts" and the down arrow */}
                <View style={styles.activityHeader}>
                  <Text style={styles.activityHeaderText}>Posts</Text>

                  {/* Button with arrow pointing downwards */}
                  <TouchableOpacity style={styles.arrowButton}>
                    <Text style={styles.arrowText}>↓</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <PostsComponent /> */}
            <View style={styles.postsListContainer}>
              {postsData.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </View>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  aboutInput: {
    flex: 1,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 15,
    paddingLeft: 10,
    borderRadius: 4,
    padding: 5,
  },
  gamesTextInput: {
    flex: 1,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    top: '2%',
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 4,
    padding: 5,
  },
  platformInput: {
    flex: 1,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    bottom: '2.3%',
    marginTop: 15,
    paddingLeft: 10,
    borderRadius: 4,
    padding: 5,
  },
  // imageEdit: {
  //   width: '100%',
  //   alignItems: 'center',
  //   zIndex: 1,
  // },
  // profileHeader: {
  //   alignSelf: 'center',
  //   fontWeight: 'bold',
  //   color: '#ddd',
  //   fontSize: 24,
  // },
  // circle: {
  //   position: 'absolute',
  //   backgroundColor: '#674FA4',
  //   width: 1000, // adjust based on your need
  //   height: 1000, // adjust based on your need
  //   borderRadius: 500, // adjust based on your need
  //   top: -800, // adjust based on your need
  //   opacity: 0.8, // adjust based on your need
  // },
  // bannerImage: {
  //   width: screenWidth, // Set image width equal to the screen width
  //   height: '100%', // Set image height equal to the banner height
  // },
  // lineStyle: {
  //   borderBottomColor: '#674FA4',
  //   borderBottomWidth: 1.3,
  //   width: '100%',
  //   alignSelf: 'center',
  // },
  // card: {
  //   flex: 1,
  //   paddingTop: '60%', // Adjust for the image height and negative margin
  //   paddingBottom: 20,
  //   paddingHorizontal: 20,
  //   alignItems: 'center', // Align items to the center
  //   borderBottomLeftRadius: 20,
  //   borderBottomRightRadius: 20,
  //   marginBottom: 25,
  //   width: screenWidth * 0.9, // Set card width equal to the screen width
  //   alignSelf: 'center', // Center the card horizontally
  // },
  // imageWrapper: {
  //   position: 'absolute',
  //   width: '100%', // Takes full width of the screen
  //   alignItems: 'center', // Centers the child elements
  //   zIndex: 1, // Places the element above other elements
  // },
  // image: {
  //   borderRadius: 50,
  //   overflow: 'hidden',
  //   borderWidth: 3,
  //   borderColor: '#d7d1e8',
  // },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  topBar: {
    height: '11%', // Adjust the height as needed
    paddingHorizontal: 30, // Add padding horizontally
    backgroundColor: '#4630EB', // Choose your preferred bar color
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Distribute space between elements
    paddingTop: 20, // For status bar on iOS
  },
  topBarProfileText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    left: '160%',
  },
  topBarEditProfileText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    // Styles for the button
  },
  editIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
    left: '25%',
  },
  // profilePicture: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   alignSelf: 'center',
  //   marginBottom: 20,
  // },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  mainContainer: {
    flexDirection: 'row', // Separate the left and right sections
    alignItems: 'flex-start', // Align the children at the top
  },
  leftSection: {
      flex: 1, // This section will take up 50% of the container's width
      alignItems: 'flex-start', // Align items to the start (left)
  },
  rightSection: {
      flex: 2, // This section will take up the remaining width
      justifyContent: 'center', // Center the content vertically
      paddingLeft: 20, // Add some padding to the left
      paddingTop: 45,
  },
  profilePicture: {
      width: 100, // Adjust as needed
      height: 100, // Adjust as needed
      borderRadius: 50, // Make the picture circular
      marginTop: 10, // Add some spacing from the username
  },
    profilePictureContainer: {
    position: 'relative', // Allows absolute positioning of children
  },

  userName: {
      fontSize: 24,
      fontWeight: 'bold',
      left: '9%',
      // Add any additional styling for the user's name
  },
  aboutContainer: {
    backgroundColor: '#d1c4e9',
    borderRadius: 10, // Add rounded corners
    padding: 10, // Add padding inside the box
    marginLeft: 10, // Add some margin on the left for spacing
    marginBottom: 10, // Add margin below the box for spacing
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    elevation: 3, // Shadow elevation for Android
  },
  about: {
    fontSize: 16, // Adjust font size as needed
    // Additional styles for about text
  },
  gamesContainer: {
    marginTop: 20, // Adjust as needed
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#d1c4e9', // Light purple or another suitable background color
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, // Shadow elevation for Android
    width: '100%', // Full width
  },
  gamesHeaderContainer: {
    flexDirection: 'row', // Use row layout to position "Games:" and platforms side by side
    alignItems: 'center', // Vertically center the items
    marginVertical: 10, // Add some vertical margin to separate it from other content
  },
  gamesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  platformsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  platformLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  platformText: {
    fontSize: 16,
    marginRight: 20,
  },
  gamesList: {
    flexDirection: 'column',
  },
  gameText: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Styles for the activity container
  activityContainer: {
    marginTop: 20, // Adjust margin at the top for separation
    padding: 10,
    borderRadius: 10, // Rounded corners
    backgroundColor: '#d1c4e9', // Light purple or another suitable background color
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    width: '100%',
  },
  // Styles for the activity header row
  activityHeaderRow: {
    flexDirection: 'row', // Arrange "Activity:" and "Posts" box in a row
    justifyContent: 'space-between', // Space out the text and the box
    alignItems: 'center', // Center the text and box vertically
  },
  // Styles for the activity header
  activityHeader: {
    flexDirection: 'row', // Aligns the text and button in a row
    justifyContent: 'space-between', // Places the arrow at the right end
    alignItems: 'center', // Centers the content vertically
    paddingVertical: 10, // Adjust vertical padding as desired
    paddingHorizontal: 10, // Adjust horizontal padding as desired
    borderRadius: 5, // Optional: round edges of the container
    backgroundColor: '#f2f2f2', // Optional: set a light background color
  },
  // Styles for the "Activity: Posts" header text
  activityHeaderText: {
    fontSize: 18, // Adjust font size as desired
    fontWeight: 'bold', // Set the font weight
    color: '#000', // Set the text color
  },
  // Styles for the "Posts" text
  postsText: {
    fontSize: 16, // Adjust font size as desired
    fontWeight: 'bold', // Set the font weight
    color: '#000', // Set the text color
  },
  // Styles for the down arrow text in the button
  arrowText: {
    fontSize: 16, // Adjust font size as desired
    color: '#000', // Set the text color
  },
  // Styles for the arrow button itself
  arrowButton: {
    paddingLeft: 10, // Optional: adjust left padding for arrow
  },
  post: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    marginTop: 20,
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
  userNamePosts: {
    fontSize: 14,
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
  },
  label: {
    fontSize: 24, // Font size for the labels
    fontWeight: 'bold',
    marginBottom: 8, // Margin below the label
    marginRight: 10,
    paddingTop: 25,
  },
  // Container for the inputs
  inputContainer: {
    marginBottom: 16, // Margin between each input container
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  addProfileButtonCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addGameButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
  addGameButtonCircle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f1f1f1',
  },
  gameItem: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center',
    marginBottom: 8, // Adjust as needed
  },
  xMarkIcon: {
    width: 15, // Adjust as needed
    height: 15, // Adjust as needed
    marginRight: 5, // Adjust as needed
    bottom: "10%",
  },
  messageButtonContainer: {
    alignItems: 'center',
  },
  messageButton: {
    marginTop: 20, // Adjust as needed
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#674FA4', // Light purple or another suitable background color
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, // Shadow elevation for Android
    padding: 10,
    borderRadius: 5,
  },
  messageButtonText: {
    fontWeight: 'bold',
  },
  postsListContainer: {
    alignItems: 'center',
  },
});

export default UserProfile;