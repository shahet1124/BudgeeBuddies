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
import { Picker } from '@react-native-picker/picker';
import { Ionicons, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MicroSavingsA() {
   const [amountPerTransaction, setAmountPerTransaction] = useState('');
   const [frequency, setFrequency] = useState('');
   const [amount, setAmount] = useState('');
   const [activeTab, setActiveTab] = useState('goals');
   const navigation = useNavigation();

   const handleAddPress = () => {
      if (amountPerTransaction && frequency && amount) {
         Alert.alert('Success', 'Micro saving rule added successfully!');
         setAmountPerTransaction('');
         setFrequency('');
         setAmount('');
      } else {
         Alert.alert('Error', 'Please fill all fields');
      }
   };

   const handleSetupGoalsPress = () => {
      Alert.alert('Navigation', 'Navigating to Goals setup');
      navigation.navigate('AddGoal')

   };

   const handleBackPress = () => {
      Alert.alert('Navigation', 'Navigating back');
   };

   const handleSetupMicroSavingsPress = () => {
      Alert.alert('Action', 'Setting up micro savings');
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
            <TouchableOpacity
               style={styles.setupButton}
               onPress={handleSetupMicroSavingsPress}
            >
               <Text style={styles.setupButtonText}>Set Up Micro Savings</Text>
            </TouchableOpacity>

            <View style={styles.section}>
               <Text style={styles.label}>Amount Per Transaction</Text>
               <TextInput
                  style={styles.inputField}
                  placeholder="Amount"
                  placeholderTextColor="#999"
                  value={amountPerTransaction}
                  onChangeText={setAmountPerTransaction}
                  keyboardType="numeric"
               />
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

            <TouchableOpacity
               style={styles.goalsButton}
               onPress={handleSetupGoalsPress}
            >
               <Text style={styles.goalsButtonText}>Set Up Goals</Text>
            </TouchableOpacity>

            {/* Navigation Bar */}
            <View style={styles.navigation}>
               <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => setActiveTab('home')}
               >
                  <Ionicons
                     name="home-outline"
                     size={24}
                     color={activeTab === 'home' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => setActiveTab('wallet')}
               >
                  <FontAwesome
                     name="wallet"
                     size={22}
                     color={activeTab === 'wallet' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  style={[
                     styles.navItem,
                     activeTab === 'goals' ? styles.activeNavItem : null
                  ]}
                  onPress={() => setActiveTab('goals')}
               >
                  <Feather
                     name="target"
                     size={24}
                     color={activeTab === 'goals' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => setActiveTab('profile')}
               >
                  <MaterialCommunityIcons
                     name="account-outline"
                     size={24}
                     color={activeTab === 'profile' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      // top: 50,
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
   setupButton: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 50,
      alignSelf: 'flex-start',
      marginBottom: 20,
   },
   setupButtonText: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
   },
   section: {
      marginBottom: 16,
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
   },
   inputField: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 10,
      padding: 16,
      fontSize: 16,
      color: '#333',
      marginBottom: 16,
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
   addButton: {
      backgroundColor: '#00cea8',
      paddingVertical: 12,
      borderRadius: 50,
      width: 200,
      alignSelf: 'center',
      marginTop: 8,
      marginBottom: 24,
   },
   addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   goalsButton: {
      backgroundColor: '#00cea8',
      paddingVertical: 16,
      borderRadius: 50,
      marginTop: 8,
   },
   goalsButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   navigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      backgroundColor: '#f5fff9',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
   },
   navItem: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
   },
   activeNavItem: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 50,
   },
});