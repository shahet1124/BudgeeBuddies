import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, ContentContainer, PrimaryButton } from './components';

const OTPVerificationScreen = ({ navigation, route }) => {
   const { mobileNumber } = route.params || { mobileNumber: '' };
   const [otp, setOtp] = useState('');
   const otpInputRef = useRef(null);

   useEffect(() => {
      // Focus OTP input when component mounts
      setTimeout(() => {
         if (otpInputRef.current) {
            otpInputRef.current.focus();
         }
      }, 100);
   }, []);

   const handleSubmit = () => {
      // In a real app, you would validate the OTP
      if (otp.length === 6) {
         navigation.navigate('PersonalDetails');
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <Header navigation={navigation} />

         <ContentContainer>
            <View style={styles.content}>
               <Text style={styles.title}>Enter OTP</Text>

               <TextInput
                  ref={otpInputRef}
                  style={styles.otpInput}
                  placeholder="OTP"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={6}
               />

               <PrimaryButton
                  title="Submit"
                  onPress={handleSubmit}
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

export default OTPVerificationScreen;