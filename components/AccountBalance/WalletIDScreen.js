import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, ContentContainer, PrimaryButton } from './components';

const WalletIDScreen = ({ navigation }) => {
   const [walletId, setWalletId] = useState('');
   const [handle, setHandle] = useState('@okbuddy');

   const handleNext = () => {
      navigation.navigate('IdentityProof');
   };

   return (
      <SafeAreaView style={styles.container}>
         <Header navigation={navigation} />

         <ContentContainer>
            <View style={styles.content}>
               <Text style={styles.title}>Enter Your UPI Wallet ID</Text>

               <View style={styles.inputContainer}>
                  <TextInput
                     style={styles.input}
                     placeholder="example123"
                     placeholderTextColor="#999"
                     value={walletId}
                     onChangeText={setWalletId}
                  />
                  <Text style={styles.handle}>{handle}</Text>
               </View>

               <PrimaryButton
                  title="Next"
                  onPress={handleNext}
                  style={styles.nextButton}
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
      paddingTop: 40,
      alignItems: 'center',
   },
   title: {
      fontSize: 20,
      fontWeight: '600',
      alignSelf: 'flex-start',
      marginBottom: 30,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 40,
   },
   input: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: '#f5f5f5',
      fontSize: 16,
      marginRight: 10,
   },
   handle: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
   },
   nextButton: {
      width: '35%',
   },
});

export default WalletIDScreen;