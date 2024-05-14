import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import backImg from '../img/back.png';
import sendImg from '../img/send.png';
import interviewImg from '../img/interview.png';
import addImg from '../img/plus.png';
import filterImg from '../img/sort.png';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Header = ({onAddPress}) => {
  return (
    <View style={[styles.topBar, styles.componentSpacing]}>
      <View style={{ flex: 1 }}></View>
      <Text style={styles.topBarText}>GROUPS</Text>
      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <Image source={addImg} style={{ width: 24, height: 24, }} />
      </TouchableOpacity>
    </View>
  );
};


const GroupChatHeader = ({ onBack }) => (
  <View style={[styles.topBar, styles.componentSpacing]}>
    {onBack ? (
      <TouchableOpacity onPress={onBack} style={{ marginRight: 20, backgroundColor: '#FFF', borderRadius: 10, padding:2 }}>
         <Image source={backImg} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    ) : (
      <View style={{ width: 44 }}></View> 
    )}
    <Text style={[styles.topBarText, { flex: 1, textAlign: 'center', marginLeft: 150}]}> {onBack ? 'Hell divers Squad' : 'GROUPS'} </Text>
  </View>
);

const SearchAndSort = () => (
  <View style={[styles.searchBarContainer, styles.componentSpacing]}>
    <TextInput style={styles.searchInput} placeholder="Search" />
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ marginRight: 5 }}>Sort by:</Text>
      <TouchableOpacity style={styles.sortButton}>
        <Image source={filterImg} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  </View>
);


const MessageRequests = () => (
  <TouchableOpacity style={[styles.messageRequestButton, , styles.componentSpacing]}>
    <Text style={styles.messageRequestText}>Message Requests</Text>
      <Image source={interviewImg} style={{ width: 24, height: 24 }} />
  </TouchableOpacity>
);

const GroupList = ({ groups, onSelectGroup }) => {
  const pinnedGroups = groups.filter(group => group.pinned);
  const allGroups = groups.filter(group => !group.pinned);

  return (
    <>
      <Text style={styles.sectionTitle}>Pinned Groups</Text>
      {pinnedGroups.map(group => (
        <TouchableOpacity
          key={group.id}
          onPress={() => onSelectGroup(group)}
          style={styles.post}
        >
          <View style={styles.postHeader}>
            <Text style={styles.postName}>{group.name}</Text>
            <Text style={styles.postTime}>{group.time}</Text>
          </View>
          <Text style={styles.postMessage}>{group.latestMessage}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.sectionTitle}>All Groups</Text>
      <FlatList
        data={allGroups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectGroup(item)}
            style={styles.post}
          >
            <View style={styles.postHeader}>
              <Text style={styles.postName}>{item.name}</Text>
              <Text style={styles.postTime}>{item.time}</Text>
            </View>
            <Text style={styles.postMessage}>{item.latestMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
const ChatPage = ({ group, onBack }) => {
  // Hardcoded messages for display
  const messages = [
    { id: 1, text: 'The Dude: Dude, what would happen if we hopped on fortnite!', timestamp: '4:20am', sender: 'user' },
    { id: 2, text: 'Me: For Super Earth', timestamp: '8:30am', sender: 'me' },
    { id: 3, text: 'User 66: For Democracy!', timestamp: '9:45am', sender: 'other' },
  ];

  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log("Message to send:", message);  // Log the message or handle sending
    setMessage('');  // Clear input after sending
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#d7d1e8', paddingHorizontal: 10 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <GroupChatHeader onBack={onBack} />
          {messages.map(msg => (
            <View key={msg.id} style={[
              styles.chatBubble,
              msg.sender === 'me' ? styles.myMessage : styles.otherMessage
            ]}>
              <Text style={styles.chatText}>{msg.text}</Text>
              <Text style={styles.chatTime}>{msg.timestamp}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            onChangeText={setMessage}
            value={message}
            placeholder="Send Message"
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Image source={sendImg} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const AddPage = ({ onBack }) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  const isCreateButtonEnabled = groupName.trim() && description.trim();

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#d7d1e8', paddingHorizontal: 10 }}>
      <View style={{ flex: 1 }}>
        <GroupChatHeader onBack={onBack} />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Group Name:</Text>
            <TextInput
              style={styles.textInput}
              value={groupName}
              onChangeText={setGroupName}
              placeholder="Enter group name"
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.textInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
            />
            <Text style={styles.label}>Admin Permissions:</Text>
            <TouchableOpacity style={styles.permissionsBox}>
              <Text>Permissions Settings</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Member Permissions:</Text>
            <TouchableOpacity style={styles.permissionsBox}>
              <Text>Permissions Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.createButton,
                { opacity: isCreateButtonEnabled ? 1 : 0.5 },
              ]}
              disabled={!isCreateButtonEnabled}
              onPress={() => {
                // Handle the creation logic
                console.log(`Creating group: ${groupName}, ${description}`);
                // Optionally reset inputs
                setGroupName('');
                setDescription('');
                Alert.alert(
                  `The group "${groupName}" has been Created!`,
                );
                onBack()
              }}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const Chat = () => {
  const groups = [
    { id: 1, name: 'Hell divers Squad', latestMessage: 'For democracy!', time: '9:45 AM', pinned: true },
    { id: 2, name: 'Rush B Team', latestMessage: 'im on rn', time: 'Yesterday', pinned: false },
    { id: 3, name: 'The Chads', latestMessage: 'Yea, no thanks im a gamer', time: '1 week ago', pinned: false },
    { id: 4, name: 'Csgo tryhards', latestMessage: 'screw this im quitting', time: '1 week ago', pinned: false },
    { id: 5, name: 'One Piece Fans', latestMessage: 'Ill be on tomorrow', time: '2 weeks ago', pinned: false },
    // More groups...
  ];
  const [currentView, setCurrentView] = useState('groups');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setCurrentView('chat');
  };

  const handleBack = () => {
    setCurrentView('groups');
    setSelectedGroup(null);
  };

  const handleAdd = () => {
    console.log('add button pressed');
    setCurrentView('add');
    setSelectedGroup(null);
  }

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#d7d1e8', paddingHorizontal: 10 }}>
    {currentView === 'groups' ? (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Header onAddPress={handleAdd} />
          <SearchAndSort />
          <MessageRequests />
          <GroupList groups={groups} onSelectGroup={handleSelectGroup} />
        </View>
      </ScrollView>
    ) : currentView === 'chat' ? (
      <ChatPage group={selectedGroup} onBack={handleBack} />
    ) : (
      <AddPage onBack={handleBack} />
    )}
  </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 10,
    backgroundColor: '#f0f0f0'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 20,
    paddingTop:30, // For status bar on iOS
  },
  topBarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    right: 90,
  },
  addButton: {
    marginRight: 10
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center'
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 16,
    flex: 1,
    marginRight: 10
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20
  },
  messageRequestButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0'
  },
  messageRequestText: {
    fontSize: 16
  },
  post: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 7,
    marginBottom:7,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  postName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // allows text to grow and fill space
    marginRight: 8 // ensures space between name and time
  },
  postTime: {
    fontSize: 16,
    color: '#666'
  },
  postMessage: {
    marginTop: 4,
    fontSize: 16,
    color: '#666'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
    marginTop:10,
    backgroundColor: '#4630EB',
    color: 'white',
    alignItems: 'center',
  },
  componentSpacing: {
    marginBottom: 10  // Adjust this value to control vertical spacing
  },
  chatBubble: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 8,
    maxWidth: '80%'
  },
  myMessage: {
    backgroundColor: '#add8e6',
    marginLeft: '20%',
    alignSelf: 'flex-end'
  },
  otherMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start'
  },
  chatText: {
    fontSize: 16,
    color: '#000'
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end'
  },
  messageInputContainer: {
    flexDirection: 'row',
    padding: 10
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  sendButton: {
    marginLeft:10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  permissionsBox: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#4630EB',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Chat;
