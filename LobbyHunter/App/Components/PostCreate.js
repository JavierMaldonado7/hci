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

  const PostCreate = ( {onAdd} ) => {
    const [title, setTitle] = React.useState('');
    const [game, setGame] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [tags, setTags] = React.useState('');

    const PostCreateBar = ({ onAdd }) => {
      return (
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => onAdd(false)} style={{ marginRight: 20, backgroundColor: '#FFF', borderRadius: 10, padding:2 }}>
            <Image source={backImg} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <Text style={styles.topBarText}>CREATE POST</Text>
        </View>
      );
    };

    const handleAddPress = () => {
        console.log('Post data:', { title, game, description, tags });
        // Handle the add button press here, potentially call onAdd with the post data
        onAdd(true);
      };

    return(
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#d7d1e8', }}>
        <View>
         <PostCreateBar onAdd={onAdd}/>
          <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
            placeholderTextColor="#666"
            
          />
          <TextInput
            style={styles.input}
            onChangeText={setGame}
            value={game}
            placeholder="Game"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.textArea}
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
            multiline={true}
            numberOfLines={4}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            onChangeText={setTags}
            value={tags}
            placeholder="Tags"
            placeholderTextColor="#666"
          />
          <Text style={styles.disclaimer}>Tags are comma delimited</Text>
          <TouchableOpacity onPress={handleAddPress} style={styles.postButton}>
            <Text style={styles.postButtonText}>POST</Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaProvider>
  
    );
  };
  
  const styles = StyleSheet.create({
    topBar: {
      top: '5%',
      height: '18%', // Adjust the height as needed
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
      left: '-30%',
    },
    addButton: {
      padding: 10,
      // Styles for the button
    },
    addButtonText: {
      color: 'white',
      fontSize: 30, // Adjust the size as needed
      fontWeight: 'bold',
      left: '-350%',
    },
    // ===================================================
    formContainer: {
        padding: 20,
        backgroundColor: 'white',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        // placeholderTextColor: '#666',
      },
      textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        height: 100,
        marginBottom: 10,
        borderRadius: 5,
        // placeholderTextColor: '#666',
      },
      disclaimer: {
        fontSize: 12,
        color: '#666',
        marginBottom: 20,
      },
      postButton: {
        backgroundColor: '#4630EB',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      postButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
export default PostCreate;