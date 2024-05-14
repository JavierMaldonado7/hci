import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';

const DiscordLogin = ({onSubmit})  => {
  //const handlePress = async () => {
    //Linking.openURL('https://discord.com/api/oauth2/authorize?client_id=1113138846914322524&redirect_uri=playder%3A%2F%2Fapi%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email')

    const handlePress = async () => {

      // await axios.get("http://" + config.ip + ":" + config.port+ "/api/discord")
      //   .then(response=> {
      //     //open authorize url
      //     Linking.openURL(response.data.url)
      //   })
      //   .catch(error=>{
      //     console.error(error);
      //   })
        onSubmit("Devan");
   
    };

return (
<View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={styles.innerContainer}>
          <Image
              source={require('../img/discord.png')}
              style={{ width: 20, height: 20, tintColor: '#fff' }}
          />
          <Text style={styles.buttonText}> Signup with Discord</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7289da',
    padding: '2.4%',
    borderRadius: 50,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default DiscordLogin;
