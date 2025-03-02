
import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   SafeAreaView,
   StatusBar,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   Alert
} from 'react-native';
import {
   Ionicons,
   AntDesign,
   Feather,
   MaterialIcons
} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function AddExpensesCategories({ route }) {
   // State for form fields
   const [date, setDate] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [category, setCategory] = useState('');
   const [amount, setAmount] = useState('');
   const [title, setTitle] = useState('');
   const [message, setMessage] = useState('');
   const [showCategoryPicker, setShowCategoryPicker] = useState(false);
   const { category2 } = route.params; // Receive data
   const navigation = useNavigation();

   // Sample categories
   const categories = [
      { id: '1', name: category2 },
   ];

   // Format date to display
   const formatDate = (date) => {
      const months = [
         'January', 'February', 'March', 'April', 'May', 'June',
         'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
   };

   // Handle date change
   const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setDate(currentDate);
   };

   // Handle category selection
   const handleCategorySelect = (categoryName) => {
      setCategory(categoryName);
      setShowCategoryPicker(false);
   };

   // Handle amount change with formatting
   const handleAmountChange = (text) => {
      // Remove non-numeric characters and convert to number
      const numericValue = text.replace(/[^0-9]/g, '');

      // Format with commas
      if (numericValue) {
         const formattedValue = new Intl.NumberFormat('en-IN').format(numericValue);
         setAmount(formattedValue);
      } else {
         setAmount('');
      }
   };

   // Handle save button press
   const handleSave = () => {
      // Validate form
      if (!category) {
         Alert.alert('Error', 'Please select a category');
         return;
      }

      if (!amount || amount === '0') {
         Alert.alert('Error', 'Please enter a valid amount');
         return;
      }

      if (!title) {
         Alert.alert('Error', 'Please enter an expense title');
         return;
      }

      // Create expense object
      const newExpense = {
         id: Date.now().toString(),
         date: formatDate(date),
         time: `${date.getHours()
            }: ${date.getMinutes().toString().padStart(2, '0')
            }`,
         category,
         amount: -parseFloat(amount.replace(/,/g, '')),
         title,
         message
      };

      // If callback was passed, call it with the new expense
      if (route.params?.onExpenseAdded) {
         route.params.onExpenseAdded(newExpense);
      }

      // Navigate back
      navigation.goBack();
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor="#00C897" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity
               style={styles.backButton}
               onPress={() => navigation.goBack()}
            >
               <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Expenses</Text>
            <TouchableOpacity style={styles.notificationButton}>
               <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
         </View>

         {/* Main Content */}
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.contentContainer}
         >
            <ScrollView style={styles.scrollView}>
               <View style={styles.formContainer}>
                  {/* Date Field */}
                  <View style={styles.formGroup}>
                     <Text style={styles.label}>Date</Text>
                     <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}
                     >
                        <Text style={styles.dateText}>{formatDate(date)}</Text>
                        <TouchableOpacity
                           style={styles.calendarButton}
                           onPress={() => setShowDatePicker(true)}
                        >
                           <AntDesign name="calendar" size={20} color="#00C897" />
                        </TouchableOpacity>
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

                  {/* Category Field */}
                  <View style={styles.formGroup}>
                     <Text style={styles.label}>Category</Text>
                     <TouchableOpacity
                        style={styles.dropdownInput}
                        onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                     >
                        <Text style={category ? styles.inputText : styles.placeholderText}>
                           {category || 'Select the category'}
                        </Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#00C897" />
                     </TouchableOpacity>

                     {showCategoryPicker && (
                        <View style={styles.categoryPicker}>
                           {categories.map((cat) => (
                              <TouchableOpacity
                                 key={cat.id}
                                 style={styles.categoryItem}
                                 onPress={() => handleCategorySelect(cat.name)}
                              >
                                 <Text style={styles.categoryItemText}>{cat.name}</Text>
                              </TouchableOpacity>
                           ))}
                        </View>
                     )}
                  </View>

                  {/* Amount Field */}
                  <View style={styles.formGroup}>
                     <Text style={styles.label}>Amount</Text>
                     <View style={styles.amountInputContainer}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <TextInput
                           style={styles.amountInput}
                           value={amount}
                           onChangeText={handleAmountChange}
                           keyboardType="numeric"
                           returnKeyType="done"
                        />
                     </View>
                  </View>

                  {/* Expense Title Field */}
                  <View style={styles.formGroup}>
                     <Text style={styles.label}>Expense Title</Text>
                     <TextInput
                        style={styles.textInput}
                        value={title}
                        onChangeText={setTitle}
                        returnKeyType="next"
                     />
                  </View>

                  {/* Message Field */}
                  <View style={styles.formGroup}>
                     <TextInput
                        style={styles.messageInput}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Enter Message"
                        placeholderTextColor="#00C897"
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                     />
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity
                     style={styles.saveButton}
                     onPress={handleSave}
                  >
                     <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>

         {/* Bottom Navigation */}
         <View style={styles.bottomNavigation}>
            <TouchableOpacity style={styles.navButton}>
               <Feather name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
               <Feather name="credit-card" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
               <Feather name="target" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
               <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00C897',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
   },
   backButton: {
      padding: 8,
   },
   headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
   },
   notificationButton: {
      padding: 8,
   },
   contentContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
   },
   scrollView: {
      flex: 1,
   },
   formContainer: {
      padding: 20,
   },
   formGroup: {
      marginBottom: 20,
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
   },
   dateInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#E8F8E8',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
   },
   dateText: {
      fontSize: 16,
      color: '#333',
   },
   calendarButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#E8F8E8',
      justifyContent: 'center',
      alignItems: 'center',
   },
   dropdownInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#E8F8E8',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
   },
   inputText: {
      fontSize: 16,
      color: '#333',
   },
   placeholderText: {
      fontSize: 16,
      color: '#AAA',
   },
   categoryPicker: {
      backgroundColor: 'white',
      borderRadius: 8,
      marginTop: 8,
      paddingVertical: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
   },
   categoryItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
   },
   categoryItemText: {
      fontSize: 16,
      color: '#333',
   },
   amountInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E8F8E8',
      borderRadius: 8,
      paddingHorizontal: 16,
   },
   currencySymbol: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginRight: 4,
   },
   amountInput: {
      flex: 1,
      fontSize: 16,
      color: '#333',
      paddingVertical: 12,
   },
   textInput: {
      backgroundColor: '#E8F8E8',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: '#333',
   },
   messageInput: {
      backgroundColor: '#E8F8E8',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: '#333',
      height: 150,
   },
   saveButton: {
      backgroundColor: '#00C897',
      borderRadius: 25,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 10,
   },
   saveButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
   },
   bottomNavigation: {
      flexDirection: 'row',
      backgroundColor: '#F1FFF9',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
   },
   navButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
   },
});