import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   SafeAreaView,
   KeyboardAvoidingView,
   Platform,
   TouchableWithoutFeedback,
   Keyboard,
   ScrollView,
   Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export default function CreateAccountScreen() {
   const navigation = useNavigation();
   const [income, setIncome] = useState('');
   const [numFamilyMembers, setNumFamilyMembers] = useState('1');
   const [familyMembers, setFamilyMembers] = useState([]);
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [currentDatePickerIndex, setCurrentDatePickerIndex] = useState(0);

   // Gender options for dropdown
   const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

   // Initialize family members when the number changes
   useEffect(() => {
      const count = parseInt(numFamilyMembers) || 0;
      const newFamilyMembers = Array(count).fill(null).map((_, i) => ({
         id: i,
         gender: '',
         dateOfBirth: '',
         showGenderDropdown: false
      }));
      setFamilyMembers(newFamilyMembers);
   }, [numFamilyMembers]);

   const handleGenderSelect = (index, gender) => {
      const updatedMembers = [...familyMembers];
      updatedMembers[index] = {
         ...updatedMembers[index],
         gender,
         showGenderDropdown: false
      };
      setFamilyMembers(updatedMembers);
   };

   const toggleGenderDropdown = (index) => {
      const updatedMembers = [...familyMembers];
      updatedMembers[index] = {
         ...updatedMembers[index],
         showGenderDropdown: !updatedMembers[index].showGenderDropdown
      };
      // Close other open dropdowns
      updatedMembers.forEach((member, i) => {
         if (i !== index && member.showGenderDropdown) {
            member.showGenderDropdown = false;
         }
      });
      setFamilyMembers(updatedMembers);
   };

   const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
         const updatedMembers = [...familyMembers];
         updatedMembers[currentDatePickerIndex] = {
            ...updatedMembers[currentDatePickerIndex],
            dateOfBirth: selectedDate.toISOString().split('T')[0]
         };
         setFamilyMembers(updatedMembers);
      }
   };

   const openDatePicker = (index) => {
      Keyboard.dismiss();
      setCurrentDatePickerIndex(index);
      setShowDatePicker(true);
   };

   const handleNext = () => {
      console.log('Form Data:', {
         income,
         familyMembers
      });
      navigation.navigate('CreateAccountC', { income2: income, numFamilyMembers2: numFamilyMembers });
   };

   const formatDate = (dateString) => {
      if (!dateString) return 'DOB';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'short',
         day: 'numeric'
      });
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
         >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <View style={styles.headerContainer}>
                     <Text style={styles.headerText}>Create Account</Text>
                  </View>

                  <View style={styles.formContainer}>
                     <View style={{ top: 40 }}>
                        <View style={styles.inputContainer}>
                           <Text style={styles.inputLabel}>Enter Your Income Per Month</Text>
                           <TextInput
                              style={styles.input}
                              placeholder="Eg: 1,00,000"
                              placeholderTextColor="#A7A7A7"
                              value={income}
                              onChangeText={setIncome}
                              keyboardType="numeric"
                           />
                        </View>

                        <View style={styles.inputContainer}>
                           <Text style={styles.inputLabel}>Enter Number Of Person In Your Family</Text>
                           <TextInput
                              style={styles.input}
                              placeholder="Eg: 10"
                              placeholderTextColor="#A7A7A7"
                              value={numFamilyMembers}
                              onChangeText={setNumFamilyMembers}
                              keyboardType="numeric"
                           />
                        </View>

                        {familyMembers.map((member, index) => (
                           <View key={index} style={styles.familyMemberContainer}>
                              <View style={styles.familyMemberRow}>
                                 <View style={styles.genderContainer}>
                                    <Text style={styles.familyMemberLabel}>Gender</Text>
                                    <TouchableOpacity
                                       style={styles.dropdownContainer}
                                       onPress={() => toggleGenderDropdown(index)}
                                    >
                                       <Text style={[styles.dropdownText, member.gender ? styles.activeDropdownText : null]}>
                                          {member.gender || 'Select'}
                                       </Text>
                                       <Ionicons name="chevron-down" size={24} color="#A7A7A7" style={styles.dropdownIcon} />
                                    </TouchableOpacity>

                                    {member.showGenderDropdown && (
                                       <View style={styles.dropdownOptions}>
                                          {genderOptions.map((option) => (
                                             <TouchableOpacity
                                                key={option}
                                                style={styles.dropdownOption}
                                                onPress={() => handleGenderSelect(index, option)}
                                             >
                                                <Text style={styles.dropdownOptionText}>{option}</Text>
                                             </TouchableOpacity>
                                          ))}
                                       </View>
                                    )}
                                 </View>

                                 <View style={styles.dobContainer}>
                                    <Text style={styles.familyMemberLabel}>Date of Birth</Text>
                                    <TouchableOpacity
                                       style={styles.dateInput}
                                       onPress={() => openDatePicker(index)}
                                    >
                                       <Text style={[styles.dropdownText, member.dateOfBirth ? styles.activeDropdownText : null]}>
                                          {formatDate(member.dateOfBirth)}
                                       </Text>
                                       <Ionicons name="calendar-outline" size={24} color="#A7A7A7" style={styles.calendarIcon} />
                                    </TouchableOpacity>
                                 </View>
                              </View>
                           </View>
                        ))}

                        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                           <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </ScrollView>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

         {showDatePicker && (
            <DateTimePicker
               value={new Date()}
               mode="date"
               display="default"
               onChange={handleDateChange}
               maximumDate={new Date()}
            />
         )}
      </SafeAreaView>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00D3A1',
   },
   keyboardAvoidingView: {
      flex: 1,
   },
   scrollContainer: {
      flexGrow: 1,
      paddingBottom: 40
   },
   headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: height * 0.04,
   },
   headerText: {
      fontSize: width * 0.07,
      fontWeight: 'bold',
      color: '#212121',
      top: 30,

   },
   formContainer: {
      // flex: 1,
      top: 30,
      height: '100%',
      backgroundColor: '#F9F9F9',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: width * 0.05,
      paddingTop: height * 0.03,
   },
   inputContainer: {
      marginBottom: height * 0.02,
   },
   inputLabel: {
      fontSize: width * 0.038,
      color: '#212121',
      marginBottom: height * 0.01,
      fontWeight: '500',
   },
   input: {
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      padding: height * 0.018,
      fontSize: width * 0.038,
      color: '#212121',
   },
   dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      overflow: 'hidden',
      height: height * 0.06,
   },
   dropdownIcon: {
      position: 'absolute',
      right: width * 0.03,
   },
   familyMemberContainer: {
      marginBottom: height * 0.01,
   },
   familyMemberRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   familyMemberLabel: {
      fontSize: width * 0.038,
      color: '#212121',
      marginBottom: height * 0.01,
      fontWeight: '500',
   },
   genderContainer: {
      width: '48%',
      position: 'relative',
   },
   dobContainer: {
      width: '48%',
   },
   dropdownText: {
      flex: 1,
      padding: height * 0.018,
      fontSize: width * 0.038,
      color: '#A7A7A7',
   },
   activeDropdownText: {
      color: '#212121',
   },
   dateInput: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      overflow: 'hidden',
      height: height * 0.06,
   },
   calendarIcon: {
      position: 'absolute',
      right: width * 0.03,
   },
   dropdownOptions: {
      position: 'absolute',
      top: height * 0.09,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      zIndex: 1000,
      elevation: 3,
   },
   dropdownOption: {
      padding: height * 0.015,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
   },
   dropdownOptionText: {
      fontSize: width * 0.038,
      color: '#212121',
   },
   termsContainer: {
      marginTop: height * 0.02,
      alignItems: 'center',
   },
   termsText: {
      fontSize: width * 0.032,
      color: '#757575',
      textAlign: 'center',
   },
   termsLink: {
      color: '#00D3A1',
      fontWeight: '500',
   },
   nextButton: {
      backgroundColor: '#00D3A1',
      borderRadius: 30,
      padding: height * 0.018,
      alignItems: 'center',
      marginTop: height * 0.02,
      marginBottom: height * 0.02,
   },
   nextButtonText: {
      color: '#fff',
      fontSize: width * 0.04,
      fontWeight: 'bold',
   },
});