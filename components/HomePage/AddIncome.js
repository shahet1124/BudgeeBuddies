// AddIncomeScreen.js
import React, { useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   SafeAreaView,
   StatusBar,
   Platform,
   KeyboardAvoidingView,
   ScrollView,
   Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const AddIncomeScreen = () => {
   // Form state
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [type, setType] = useState('');
   const [price, setPrice] = useState('');
   const [category, setCategory] = useState('');
   const [title, setTitle] = useState('');
   const [notes, setNotes] = useState('');
   const navigation = useNavigation();

   // UI state
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [showTimePicker, setShowTimePicker] = useState(false);
   const [showTypePicker, setShowTypePicker] = useState(false);
   const [errors, setErrors] = useState({});

   // Format date for display
   const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   };

   // Format time for display
   const formatTime = (time) => {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
   };

   // Date picker handlers
   const onDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
         setDate(selectedDate);
         setErrors({ ...errors, date: null });
      }
   };

   // Time picker handlers
   const onTimeChange = (event, selectedTime) => {
      setShowTimePicker(false);
      if (selectedTime) {
         setTime(selectedTime);
         setErrors({ ...errors, time: null });
      }
   };

   // Validate the form
   const validateForm = () => {
      let isValid = true;
      let newErrors = {};

      if (!date) {
         newErrors.date = 'Date is required';
         isValid = false;
      }

      if (!time) {
         newErrors.time = 'Time is required';
         isValid = false;
      }

      if (!type) {
         newErrors.type = 'Type is required';
         isValid = false;
      }

      if (!price || isNaN(parseFloat(price))) {
         newErrors.price = 'Valid price is required';
         isValid = false;
      }

      if (!category) {
         newErrors.category = 'Category is required';
         isValid = false;
      }

      if (!title) {
         newErrors.title = 'Title is required';
         isValid = false;
      }

      setErrors(newErrors);
      return isValid;
   };

   // Submit handler
   const handleSubmit = () => {
      if (validateForm()) {
         // Process the form data
         const formData = {
            date: formatDate(date),
            time: formatTime(time),
            type,
            price: parseFloat(price),
            category,
            title,
            notes
         };

         console.log('Form data:', formData);
         Alert.alert('Success', 'Income added successfully!');
         // Here you would typically navigate back or reset the form
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00C49A" barStyle="light-content" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity
               style={styles.backButton}
               onPress={() => navigation ? navigation.goBack() : null}
            >
               <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Income</Text>
         </View>

         <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formContainer}
         >
            <ScrollView style={styles.scrollView}>
               <View style={styles.formContent}>
                  {/* Date, Time, Type Row */}
                  <View style={styles.formRow}>
                     {/* Date Field */}
                     <View style={styles.formField}>
                        <Text style={styles.fieldLabel}>Date</Text>
                        <TouchableOpacity
                           style={[styles.input, errors.date ? styles.inputError : null]}
                           onPress={() => setShowDatePicker(true)}
                        >
                           <Text style={styles.inputText}>
                              {formatDate(date)}
                           </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                           <DateTimePicker
                              value={date}
                              mode="date"
                              display="default"
                              onChange={onDateChange}
                           />
                        )}
                     </View>

                     {/* Time Field */}
                     <View style={styles.formField}>
                        <Text style={styles.fieldLabel}>Time</Text>
                        <TouchableOpacity
                           style={[styles.input, errors.time ? styles.inputError : null]}
                           onPress={() => setShowTimePicker(true)}
                        >
                           <Text style={styles.inputText}>
                              {formatTime(time)}
                           </Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                           <DateTimePicker
                              value={time}
                              mode="time"
                              display="default"
                              onChange={onTimeChange}
                           />
                        )}
                     </View>

                     {/* Type Field */}
                     <View style={styles.formField}>
                        <Text style={styles.fieldLabel}>Type</Text>
                        <TouchableOpacity
                           style={[styles.input, styles.selectInput, errors.type ? styles.inputError : null]}
                           onPress={() => setShowTypePicker(!showTypePicker)}
                        >
                           <Text style={styles.inputText}>
                              {type || 'Select'}
                           </Text>
                           <Feather name="chevron-down" size={16} color="#666" />
                        </TouchableOpacity>
                        {showTypePicker && (
                           <View style={styles.pickerContainer}>
                              <Picker
                                 selectedValue={type}
                                 onValueChange={(itemValue) => {
                                    setType(itemValue);
                                    setShowTypePicker(false);
                                    setErrors({ ...errors, type: null });
                                 }}
                              >
                                 <Picker.Item label="Online" value="Online" />
                                 <Picker.Item label="offline" value="offline" />
                              </Picker>
                           </View>
                        )}
                     </View>
                  </View>

                  {/* Price Field */}
                  <View style={styles.fullFormField}>
                     <Text style={styles.fieldLabel}>Price</Text>
                     <TextInput
                        style={[styles.input, errors.price ? styles.inputError : null]}
                        placeholder="Example"
                        placeholderTextColor="#aaa"
                        value={price}
                        onChangeText={(text) => {
                           setPrice(text);
                           setErrors({ ...errors, price: null });
                        }}
                        keyboardType="numeric"
                     />
                  </View>

                  {/* Category Field */}
                  <View style={styles.fullFormField}>
                     <Text style={styles.fieldLabel}>Category</Text>
                     <View style={styles.pickerContainer}>
                        <Picker
                           selectedValue={category}
                           onValueChange={(itemValue) => {
                              setCategory(itemValue);
                              setErrors({ ...errors, category: null });
                           }}
                           style={styles.picker}
                        >
                           <Picker.Item label="Food" value="Food" />
                           <Picker.Item label="Transport" value="Transport" />
                           <Picker.Item label="Medicine" value="Medicine" />
                           <Picker.Item label="Groceries" value="Groceries" />
                        </Picker>
                     </View>
                  </View>

                  {/* Title Field */}
                  <View style={styles.fullFormField}>
                     <Text style={styles.fieldLabel}>Title</Text>
                     <TextInput
                        style={[styles.input, errors.title ? styles.inputError : null]}
                        placeholder="Title"
                        placeholderTextColor="#aaa"
                        value={title}
                        onChangeText={(text) => {
                           setTitle(text);
                           setErrors({ ...errors, title: null });
                        }}
                     />
                  </View>

                  {/* Notes Field */}
                  <View style={styles.fullFormField}>
                     <Text style={styles.fieldLabel}>Notes</Text>
                     <TextInput
                        style={[styles.input, styles.notesInput]}
                        placeholder="Note"
                        placeholderTextColor="#aaa"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        numberOfLines={3}
                     />
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                     style={styles.submitButton}
                     onPress={handleSubmit}
                  >
                     <Text style={styles.submitButtonText}>Add Income</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
         <Text>
            +
         </Text>

         {/* Bottom Navigation */}
         <View style={styles.bottomNavigation}>
            <TouchableOpacity style={styles.navItem}>
               <Feather name="home" size={24} color="#00C49A" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
               <Feather name="credit-card" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
               <Feather name="target" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
               <Feather name="user" size={24} color="#666" />
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      top: 20,
      flex: 1,
      backgroundColor: '#00C49A',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
   },
   backButton: {
      marginRight: 15,
   },
   headerTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
   },
   formContainer: {
      flex: 1,
      backgroundColor: '#e6f7f2',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
   },
   scrollView: {
      flex: 1,
   },
   formContent: {
      padding: 20,
   },
   formRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
   },
   formField: {
      flex: 1,
      // marginHorizontal: 1,
   },
   fullFormField: {
      marginBottom: 5,
   },
   fieldLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: '#333',
      marginBottom: 5,
   },
   input: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 14,
      color: '#333',
      borderWidth: 1,
      borderColor: '#ddd',
   },
   inputError: {
      borderColor: '#ff6b6b',
   },
   inputText: {
      color: '#333',
      fontSize: 13,
   },
   selectInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   pickerContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginTop: 5,
      borderWidth: 1,
      borderColor: '#ddd',
   },
   notesInput: {
      height: 80,
      textAlignVertical: 'top',
   },
   submitButton: {
      backgroundColor: '#00C49A',
      borderRadius: 50,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
   },
   submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
   },
   bottomNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      bottom: 20,
   },
   navItem: {
      alignItems: 'center',
      paddingVertical: 5,
   },
});

export default AddIncomeScreen;

