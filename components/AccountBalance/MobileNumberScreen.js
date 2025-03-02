import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, ContentContainer, PrimaryButton } from './components';

const MobileNumberScreen = ({ navigation }) => {
   const [mobileNumber, setMobileNumber] = useState('');

   const handleGetOTP = () => {
      // In a real app, you would make an API call to send OTP
      if (mobileNumber.length >= 10) {
         // navigation.navigate('OTPVerification', { mobileNumber });
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <Header navigation={navigation} />

         <ContentContainer>
            <View style={styles.content}>
               <Text style={styles.title}>Mobile Number</Text>

               <View style={styles.inputContainer}>
                  <Text style={styles.prefix}>+ 91</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="XXXXX XXXXX"
                     placeholderTextColor="#999"
                     keyboardType="phone-pad"
                     value={mobileNumber}
                     onChangeText={setMobileNumber}
                     maxLength={10}
                  />
                  <TouchableOpacity
                     style={[styles.otpButton, !mobileNumber || mobileNumber.length < 10 ? styles.otpButtonDisabled : {}]}
                     onPress={handleGetOTP}
                     disabled={!mobileNumber || mobileNumber.length < 10}
                  >
                     <Text style={styles.otpButtonText}>Get OTP</Text>
                  </TouchableOpacity>
               </View>

               <Text style={styles.subtitle}>Enter OTP</Text>

               <TextInput
                  style={styles.otpInput}
                  placeholder="OTP"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  maxLength={6}
               />

               <PrimaryButton
                  title="Submit"
                  onPress={() => navigation.navigate('PersonalDetails')}
                  style={styles.submitButton}
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
   },
   title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 20,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
   },
   prefix: {
      fontSize: 16,
      marginRight: 10,
      paddingVertical: 15,
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
   },
   otpButton: {
      backgroundColor: '#00C389',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginLeft: 10,
   },
   otpButtonDisabled: {
      backgroundColor: '#a0e4d2',
   },
   otpButtonText: {
      color: 'white',
      fontWeight: '500',
   },
   subtitle: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 15,
   },
   otpInput: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: '#f5f5f5',
      fontSize: 16,
      marginBottom: 30,
   },
   submitButton: {
      width: '35%',
      alignSelf: 'center',
   },
});

export default MobileNumberScreen;