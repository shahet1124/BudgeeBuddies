import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   TextInput,
   Dimensions,
   StatusBar,
   SafeAreaView
} from 'react-native';

const UpiWalletPin2 = () => {
   const [pin, setPin] = useState(['', '', '', '', '', '']);
   const inputRefs = useRef([]);
   const navigation = useNavigation()

   // Initialize refs array
   if (inputRefs.current.length === 0) {
      inputRefs.current = Array(6).fill().map(() => React.createRef());
   }

   const handlePinChange = (text, index) => {
      if (text.length <= 1) {
         const newPin = [...pin];
         newPin[index] = text;
         setPin(newPin);

         // Move to next input if current input is filled
         if (text.length === 1 && index < 5) {
            inputRefs.current[index + 1].focus();
         }
      }
   };

   const handleKeyPress = (e, index) => {
      // Move to previous input on backspace if current input is empty
      if (e.nativeEvent.key === 'Backspace' && index > 0 && pin[index] === '') {
         inputRefs.current[index - 1].focus();
      }
   };

   const handleSubmit = () => {
      const enteredPin = pin.join('');
      // Validate and process PIN
      console.log('Submitted PIN:', enteredPin);
      // Add your authentication logic here
      navigation.navigate("WalletBalanceA")
   };

   const isSubmitEnabled = pin.every(digit => digit !== '');

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00D5A7" barStyle="light-content" />

         {/* Header with back button */}
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
               <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
         </View>

         {/* Main content */}
         <View style={styles.content}>
            <Text style={styles.title}>Enter Your UPI Wallet Pin</Text>

            {/* PIN input fields */}
            <View style={styles.pinContainer}>
               {pin.map((digit, index) => (
                  <TextInput
                     key={index}
                     ref={ref => inputRefs.current[index] = ref}
                     style={styles.pinInput}
                     keyboardType="numeric"
                     maxLength={1}
                     secureTextEntry={true}
                     value={digit}
                     onChangeText={(text) => handlePinChange(text, index)}
                     onKeyPress={(e) => handleKeyPress(e, index)}
                     autoFocus={index === 0}
                  />
               ))}
            </View>

            {/* Submit button */}
            <TouchableOpacity
               style={[
                  styles.submitButton,
                  !isSubmitEnabled && styles.submitButtonDisabled
               ]}
               onPress={handleSubmit}
               disabled={!isSubmitEnabled}
            >
               <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00D5A7',
   },
   header: {
      paddingHorizontal: 20,
      paddingVertical: 15,
   },
   backButton: {
      height: 36,
      width: 36,
      borderRadius: 18,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   backButtonText: {
      fontSize: 20,
      color: '#000',
   },
   content: {
      flex: 1,
      backgroundColor: '#F5FFF8',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 30,
      paddingTop: 50,
      alignItems: 'center',
   },
   title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#333',
      marginBottom: 40,
   },
   pinContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 40,
   },
   pinInput: {
      width: 45,
      height: 45,
      borderWidth: 1,
      borderColor: '#999',
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 24,
   },
   submitButton: {
      backgroundColor: '#00D5A7',
      paddingVertical: 12,
      borderRadius: 30,
      width: '60%',
      alignItems: 'center',
   },
   submitButtonDisabled: {
      opacity: 0.7,
   },
   submitButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
   },
});

export default UpiWalletPin2;