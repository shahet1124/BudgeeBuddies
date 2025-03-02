import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, ContentContainer } from './components';

const WelcomeScreen = ({ navigation }) => {
   return (
      <SafeAreaView style={styles.container}>
         <ContentContainer>
            <View style={styles.content}>
               <Image
                  // source={require('../assets/favicon.png')}
                  style={styles.image}
                  resizeMode="contain"
               />

               <Text style={styles.title}>
                  GET STARTED CREATE YOUR{'\n'}DIGITAL WALLET
               </Text>

               <PrimaryButton
                  title="Get Started"
                  onPress={() => navigation.navigate('MobileNumber')}
                  style={styles.button}
               />
            </View>
         </ContentContainer>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00C389',
   },
   content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
   },
   image: {
      width: 150,
      height: 150,
      marginBottom: 40,
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      lineHeight: 28,
   },
   button: {
      width: '80%',
      maxWidth: 200,
   },
});

export default WelcomeScreen;