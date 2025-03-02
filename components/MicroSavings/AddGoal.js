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
   Alert,
   KeyboardAvoidingView,
   ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

export default function AddGoal() {
   const [goalName, setGoalName] = useState('');
   const [goalAmount, setGoalAmount] = useState('');
   const [deadline, setDeadline] = useState('');
   const [date, setDate] = useState(new Date()); // Initializes with current date
   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
   const [selectedDate, setSelectedDate] = useState(null);
   const navigation = useNavigation();
   const handleBackPress = () => {
      Alert.alert('Navigation', 'Going back to previous screen');
      // In a real app: navigation.goBack();
   };

   const handleEnablePress = () => {
      if (goalName && goalAmount && deadline) {
         Alert.alert(
            'Goal Added',
            `Goal ${goalName} with amount $${goalAmount} and deadline ${deadline} has been added successfully!`,
            [{ text: 'OK' }]
         );

         setGoalName('');
         setGoalAmount('');
         setDeadline('');
         setSelectedDate(null);
         navigation.navigate('MicroSavingsB');
      } else {
         Alert.alert('Error', 'Please fill all fields');
      }
   };

   const showDatePicker = () => {
      setDatePickerVisible(true);
   };

   const hideDatePicker = () => {
      setDatePickerVisible(false);
   };

   // Corrected onChange handler
   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setSelectedDate(currentDate); // Set the selected date
      setDeadline(format(currentDate, 'MMM dd, yyyy')); // Format the date
      hideDatePicker(); // Close the picker after selection
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
            <Text style={styles.title}>Add Goal</Text>
            <View style={{ width: 24 }} />
         </View>

         {/* Content */}
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
         >
            <ScrollView style={styles.content}>
               <View style={styles.inputContainer}>
                  <Text style={styles.label}>Goal Name</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Amount"
                     placeholderTextColor="#999"
                     value={goalName}
                     onChangeText={setGoalName}
                  />

                  <Text style={styles.label}>Goal Amount</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Amount"
                     placeholderTextColor="#999"
                     value={goalAmount}
                     onChangeText={setGoalAmount}
                     keyboardType="numeric"
                  />

                  <Text style={styles.label}>Deadline</Text>
                  <TouchableOpacity onPress={showDatePicker}>
                     <TextInput
                        style={styles.input}
                        placeholder="Deadline"
                        placeholderTextColor="#999"
                        value={deadline}
                        editable={false}
                        pointerEvents="none"
                     />
                  </TouchableOpacity>

                  {/* DateTimePicker */}
                  {isDatePickerVisible && (
                     <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange} // Using the defined onChange handler
                     />
                  )}

                  <TouchableOpacity
                     style={styles.enableButton}
                     onPress={handleEnablePress}
                  >
                     <Text style={styles.enableButtonText}>Enable</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
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
      height: '100%',
   },
   inputContainer: {
      marginTop: 60,
   },
   label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
   },
   input: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 10,
      padding: 16,
      fontSize: 16,
      color: '#999',
      marginBottom: 20,
   },
   enableButton: {
      backgroundColor: '#00cea8',
      borderRadius: 50,
      padding: 14,
      alignItems: 'center',
      marginTop: 30,
      width: '70%',
      alignSelf: 'center',
   },
   enableButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
   },
});