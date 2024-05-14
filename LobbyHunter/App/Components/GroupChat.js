import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupChat = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, time: new Date().toLocaleTimeString() }]);
      setInputText('');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{route.params.groupName}</Text>
        </View>
        <ScrollView style={styles.messageContainer}>
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageBubble}>
              <Text>{msg.text}</Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Send Message"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  backButton: {
    marginRight: 10
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  messageContainer: {
    flex: 1,
    padding: 10
  },
  messageBubble: {
    padding: 10,
    backgroundColor: '#e0e0ff',
    marginBottom: 10,
    borderRadius: 10
  },
  messageTime: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#666'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 10
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10
  }
});

export default GroupChat;
