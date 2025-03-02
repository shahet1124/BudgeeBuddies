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
import { Picker } from '@react-native-picker/picker';

export default function WithdrawSavingsScreen({ navigation }) {
   const [amount, setAmount] = useState('');
   const [category, setCategory] = useState('');

   const handleBackPress = () => {
      Alert.alert('Navigation', 'Going back to previous screen');
      // In a real app: navigation.goBack();
   };

   const handleSubmitPress = () => {
      if (amount && category) {
         Alert.alert(
            'Withdrawal Submitted',
            `Amount of $${amount} will be withdrawn from ${category}.`,
            [{ text: 'OK' }]
         );
         setAmount('');
         setCategory('');
         navigation.navigate("UpiWalletPin")

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
            <Text style={styles.title}>Withdraw Savings</Text>
            <View style={{ width: 24 }} />
         </View>

         {/* Content */}
         <View style={styles.content}>
            <View style={styles.section}>
               <Text style={styles.label}>Amount Per Transaction</Text>
               <TextInput
                  style={styles.inputField}
                  placeholder="Amount"
                  placeholderTextColor="#999"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
               />
            </View>

            <View style={styles.section}>
               <Text style={styles.label}>Withdraw Amount From</Text>
               <View style={styles.dropdownContainer}>
                  <Picker
                     selectedValue={category}
                     onValueChange={(itemValue) => setCategory(itemValue)}
                     style={styles.dropdown}
                     mode="dropdown"
                  >
                     <Picker.Item label="Category" value="" color="#999" />
                     <Picker.Item label="Savings Account" value="savings" color="#333" />
                     <Picker.Item label="Emergency Fund" value="emergency" color="#333" />
                     <Picker.Item label="Vacation Fund" value="vacation" color="#333" />
                     <Picker.Item label="Education Fund" value="education" color="#333" />
                  </Picker>
               </View>
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