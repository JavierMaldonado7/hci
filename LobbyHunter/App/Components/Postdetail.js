import React, { useState } from 'react';
import backImg from '../img/back.png';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// import styles from '../App.js';

const PostDetailBar = ({ onBackPress }) => {
    return (
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBackPress} style={{ marginRight: 5, backgroundColor: '#FFF', borderRadius: 10, padding:2 }}>
          <Image source={backImg} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text style={styles.topBarText}>POST DETAILS</Text>
      </View>
    );
};
const Comment = ({ username, timestamp, text }) => {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUsername}>{username}</Text>
      <Text style={styles.commentTimestamp}>{timestamp}</Text>
      <Text style={styles.commentText}>{text}</Text>
    </View>
  );
};
const PostContent = ({ title, user, game, timestamp, description }) => {
  return (
    <View style={styles.postContentContainer}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postUser}>{user}</Text>
      <Text style={styles.postGame}>{game}</Text>
      <Text style={styles.postTimestamp}>{timestamp}</Text>
      <Text style={styles.postDescription}>{description}</Text>
    </View>
  );
};

const PostDetail = ( {onPost} ) => {
    // stuff
    const handleBackPress = () => {
        console.log('back button pressed');
        onPost(true);
        // Handle the add button press here
    };
    return(
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#d7d1e8', }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>    
              <PostDetailBar onBackPress={() => onPost(true)} />   
              {/* Replace these strings with your actual data */}
              <PostContent 
                title="Looking for a Team"
                user="SwaggyMage34"
                game="in CS:GO"
                timestamp="37 min ago"
                description="hey Fellow Gamers,

                I’m totally over the solo queue chaos in CS:GO—randoms are killing my vibe. It's like, one game you're on cloud nine, next game you've got a teammate who's a total bot. I need a crew that's down for some serious comp play and maybe even eyeing those tourney trophies.
                
                Here’s the tea: I'm all about that map IQ, my aim’s on fleek, and I'm clutch when it's crunch time. I main AWP but can switch it up if the team needs. I'm usually vibing online post-dinner and on weekends.
                
                Slide into my DMs if you've got space in your lineup or if you're down to start a fresh team. Let's squad up, secure the bag, and send those randos packing.
                
                Catch you on the flip,
                SwaggyMage34"
              />
              {/* Divider */}
              <View style={styles.divider}>
                <Text style={styles.dividerText}>Comments</Text>
              </View>
              {/* Example comment */}
              <Comment 
                username="User 372"
                timestamp="36 min ago"
                text="First!"
              />
              <Comment 
                username="the0ne"
                timestamp="28 min ago"
                text="skill issue L moment, bronzemaxxing."
              />
              {/* Add more <Comment /> components here for additional comments */}
            </View>
          </ScrollView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
  topBar: {
    top: '5%',
    height: '10%', // Adjust the height as needed
    paddingHorizontal: 90, // Add padding horizontally
    backgroundColor: '#4630EB', // Choose your preferred bar color
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Distribute space between elements
    paddingTop:0, // For status bar on iOS
  },
  topBarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    left: '0%',
  },
  addButton: {
    // Styles for the button
  },
  addButtonText: {
    color: 'white',
    fontSize: 30, // Adjust the size as needed
    fontWeight: 'bold',
    left: '-400%',
  },

  postContentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postUser: {
    color: 'grey'
  },
  postGame: {
    color: 'grey'
  },
  postTimestamp: {
    color: 'grey'
  },
  // Add styles for postUser, postGame, postTimestamp, postDescription
  commentContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  commentUsername: {
    color: 'grey'
  },
  commentTimestamp: {
    color: 'grey'
  },
  // Add styles for commentUsername, commentTimestamp, commentText
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerText: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    backgroundColor: '#d7d1e8',
    top: -10,
    padding: 5,
  },
  container: {
    padding: 20,
  },
});
export default PostDetail;