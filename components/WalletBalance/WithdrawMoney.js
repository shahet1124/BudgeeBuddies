//Withdraw Savings
import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   StatusBar,
   SafeAreaView,
   Platform,
   Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WithdrawMoney({ navigation }) {
   const [amount, setAmount] = useState('');

   const handleBackPress = () => {
      Alert.alert('Navigation', 'Going back to previous screen');
      navigation.goBack();
   };

   const handleSubmitPress = () => {
      if (amount) {
         Alert.alert(
            'Withdrawal Submitted',
            `Amount of $${amount} will be withdrawn `,
            [{ text: 'OK' }]
         );
         navigation.navigate("UpiWalletPin4")
         setAmount('');
      } else {
         Alert.alert('Error', 'Please fill all fields');
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00cea8" barStyle="dark-content" />

         {/* Status Bar Simulation */}
         <View style={styles.statusBarSimulation}>
            <Text style={styles.statusBarText}>16:04</Text>
            <View style={styles.statusBarIcons}>
               <Ionicons name="cellular" size={16} color="white" />
               <Ionicons name="wifi" size={16} color="white" />
               <Ionicons name="battery-full" size={16} color="white" />
            </View>
         </View>

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Withdraw Money</Text>
            <View style={{ width: 24 }} />
         </View>

         {/* Content */}
         <View style={styles.content}>
            <View style={styles.section}>
               <Text style={styles.label}>Amount </Text>
               <TextInput
                  style={styles.inputField}
                  placeholder="Amount"
                  placeholderTextColor="#999"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
               />
            </View>



            <TouchableOpacity
               style={styles.submitButton}
               onPress={handleSubmitPress}
            >
               <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00cea8',
   },
   statusBarSimulation: {
      height: Platform.OS === 'ios' ? 20 : 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
   },
   statusBarText: {
      color: 'white',
      fontSize: 14,
   },
   statusBarIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 60,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginBottom: 20,
   },
   backButton: {
      marginRight: 15,
   },
   title: {
      color: '#333',
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      marginRight: 24,
   },
   content: {
      flex: 1,
      backgroundColor: '#f5fff9',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 24,
   },
   section: {
      marginBottom: 20,
      marginTop: 20,
   },
   label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 14,
      color: '#333',
   },
   inputField: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 10,
      padding: 16,
      fontSize: 16,
      color: '#333',
   },
   dropdownContainer: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 10,
   },
   dropdown: {
      height: 50,
      width: '100%',
   },
   submitButton: {
      backgroundColor: '#00cea8',
      paddingVertical: 14,
      borderRadius: 50,
      width: 200,
      alignSelf: 'center',
      marginTop: 40,
   },
   submitButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
});