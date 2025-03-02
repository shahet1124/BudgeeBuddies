import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   SafeAreaView,
   StatusBar,
   KeyboardAvoidingView,
   Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TopUpWallet({ navigation }) {
   const [amount, setAmount] = useState('');

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00d1a0" barStyle="light-content" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
               <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Top-Up Wallet</Text>
            <View style={{ width: 24 }} />
         </View>

         {/* Balance Card */}
         <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>₹7,783.00</Text>
         </View>

         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.mainContent}
         >
            {/* Top-Up Form */}
            <View style={styles.formContainer}>
               <Text style={styles.formTitle}>Top-Up Wallet</Text>

               <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Amount</Text>
                  <TextInput
                     style={styles.input}
                     placeholder=""
                     value={amount}
                     onChangeText={setAmount}
                     keyboardType="numeric"
                  />
               </View>

               <TouchableOpacity style={styles.submitButton} onPress={()=>navigation.navigate("UpiWalletPin3")}>
                  <Text style={styles.submitButtonText}>Submit</Text>
               </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00d1a0',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
   },
   backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
   },
   balanceCard: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      marginVertical: 15,
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
   },
   balanceLabel: {
      fontSize: 16,
      marginBottom: 5,
      color: 'black',
   },
   balanceAmount: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'black',
   },
   mainContent: {
      flex: 1,
      marginTop: 10,
   },
   formContainer: {
      flex: 1,
      backgroundColor: '#f5fff5',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
   },
   formTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 20,
      marginBottom: 30,
   },
   inputContainer: {
      backgroundColor: '#e6ffee',
      borderRadius: 10,
      padding: 15,
      marginBottom: 30,
   },
   inputLabel: {
      fontSize: 16,
      color: '#6a6a6a',
      marginBottom: 5,
   },
   input: {
      fontSize: 16,
      color: 'black',
   },
   submitButton: {
      backgroundColor: '#00d1a0',
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 20,
   },
   submitButtonText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
   },
});