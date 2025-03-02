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
import { Ionicons, Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function ManageMicroSavings() {
   const [amountPerTransaction, setAmountPerTransaction] = useState('10');
   const [frequency, setFrequency] = useState('');
   const [amount, setAmount] = useState('');
   const navigation = useNavigation();

   const handleBackPress = () => {
      Alert.alert('Navigation', 'Going back to previous screen');
      // In a real app: navigation.goBack();

   };

   const handleEditAmount = () => {
      Alert.alert('Edit', 'Edit amount per transaction');
   };

   const handleDeleteAmount = () => {
      Alert.alert(
         'Delete',
         'Are you sure you want to delete this amount?',
         [
            {
               text: 'Cancel',
               style: 'cancel'
            },
            {
               text: 'Delete',
               onPress: () => setAmountPerTransaction(''),
               style: 'destructive'
            }
         ]
      );
   };

   const handleAddPress = () => {
      if ((amountPerTransaction || amountPerTransaction === '0') && frequency && amount) {
         Alert.alert('Success', 'Micro saving rule added successfully!');
         // Reset fields except amountPerTransaction
         setFrequency('');
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
            <Text style={styles.title}>Micro Savings</Text>
            <View style={{ width: 24 }} />
         </View>

         {/* Content */}
         <View style={styles.content}>
            <View style={styles.manageLabelContainer}>
               <Text style={styles.manageLabel}>Manage Micro Savings</Text>
            </View>

            <View style={styles.section}>
               <Text style={styles.label}>Amount Per Transaction</Text>
               <View style={styles.amountInputContainer}>
                  <TextInput
                     style={styles.amountInput}
                     value={amountPerTransaction}
                     onChangeText={setAmountPerTransaction}
                     keyboardType="numeric"
                  />
                  <View style={styles.amountActions}>
                     <TouchableOpacity onPress={handleEditAmount}>
                        <Feather name="edit-2" size={20} color="#333" style={styles.actionIcon} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={handleDeleteAmount}>
                        <Feather name="trash-2" size={20} color="#333" />
                     </TouchableOpacity>
                  </View>
               </View>
            </View>

            <View style={styles.section}>
               <Text style={styles.label}>Amount</Text>
               <View style={styles.dropdownContainer}>
                  <Picker
                     selectedValue={frequency}
                     onValueChange={(itemValue) => setFrequency(itemValue)}
                     style={styles.dropdown}
                     mode="dropdown"
                  >
                     <Picker.Item label="Frequency" value="" color="#999" />
                     <Picker.Item label="Daily" value="daily" color="#333" />
                     <Picker.Item label="Weekly" value="weekly" color="#333" />
                     <Picker.Item label="Monthly" value="monthly" color="#333" />
                  </Picker>
               </View>

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
               style={styles.addButton}
               onPress={handleAddPress}
            >
               <Text style={styles.addButtonText}>Add</Text>
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
   manageLabelContainer: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignSelf: 'flex-start',
      marginBottom: 20,
   },
   manageLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
   },
   section: {
      marginBottom: 20,
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
   },
   amountInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 10,
      marginBottom: 16,
   },
   amountInput: {
      flex: 1,
      padding: 16,
      fontSize: 16,
      color: '#333',
   },
   amountActions: {
      flexDirection: 'row',
      paddingRight: 16,
   },
   actionIcon: {
      marginRight: 16,
   },
   dropdownContainer: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 10,
      marginBottom: 16,
   },
   dropdown: {
      height: 50,
      width: '100%',
   },
   inputField: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 10,
      padding: 16,
      fontSize: 16,
      color: '#333',
      marginBottom: 16,
   },
   addButton: {
      backgroundColor: '#00cea8',
      paddingVertical: 12,
      borderRadius: 50,
      width: 180,
      alignSelf: 'center',
      marginTop: 20,
   },
   addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
});