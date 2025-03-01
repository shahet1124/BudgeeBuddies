import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   SafeAreaView,
   StatusBar,
   ScrollView,
   Alert,
   Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BudgetForm({ route }) {
   const { income2, numFamilyMembers2 } = route.params;
   // Form state
   const [income, setIncome] = useState(income2);
   const [familyMembers, setFamilyMembers] = useState(numFamilyMembers2);

   // Expenses categories
   const [categories, setCategories] = useState([
      { id: '1', name: 'Food', amount: '20000' },
      { id: '2', name: 'Travel', amount: '20000' },
      { id: '3', name: 'Bills', amount: '20000' },
      { id: '4', name: 'Health Care', amount: '20000' },
      { id: '5', name: 'Savings', amount: '20000' }
   ]);

   // Editing state
   const [editModalVisible, setEditModalVisible] = useState(false);
   const [currentCategory, setCurrentCategory] = useState(null);
   const [newCategoryName, setNewCategoryName] = useState('');

   // Errors state
   const [errors, setErrors] = useState({});

   // Total expenses calculation
   const [totalExpenses, setTotalExpenses] = useState(0);

   // Update total expenses whenever categories change
   useEffect(() => {
      const total = categories.reduce((sum, category) => {
         return sum + (parseFloat(category.amount) || 0);
      }, 0);
      setTotalExpenses(total);
   }, [categories]);

   // Handle amount change
   const handleAmountChange = (id, amount) => {
      // Only allow numbers
      if (amount === '' || /^\d+$/.test(amount)) {
         setCategories(categories.map(category =>
            category.id === id ? { ...category, amount } : category
         ));

         // Clear error for this category
         if (errors[id]) {
            setErrors(prev => ({
               ...prev,
               [id]: null
            }));
         }
      }
   };

   // Open edit modal
   const openEditModal = (category) => {
      setCurrentCategory(category);
      setNewCategoryName(category.name);
      setEditModalVisible(true);
   };

   // Save category name
   const saveCategoryName = () => {
      if (newCategoryName.trim() === '') {
         Alert.alert('Error', 'Category name cannot be empty');
         return;
      }

      setCategories(categories.map(category =>
         category.id === currentCategory.id
            ? { ...category, name: newCategoryName }
            : category
      ));

      setEditModalVisible(false);
   };

   // Delete category
   const deleteCategory = (id) => {
      Alert.alert(
         'Confirm Delete',
         'Are you sure you want to delete this category?',
         [
            { text: 'Cancel', style: 'cancel' },
            {
               text: 'Delete',
               onPress: () => {
                  setCategories(categories.filter(category => category.id !== id));

                  // Clear error for this category if exists
                  if (errors[id]) {
                     const newErrors = { ...errors };
                     delete newErrors[id];
                     setErrors(newErrors);
                  }
               },
               style: 'destructive'
            }
         ]
      );
   };

   // Add new category
   const addNewCategory = () => {
      const newId = (Math.max(...categories.map(c => parseInt(c.id)), 0) + 1).toString();
      setCategories([
         ...categories,
         { id: newId, name: 'New Category', amount: '0' }
      ]);
   };

   // Form validation
   const validateForm = () => {
      let newErrors = {};
      let isValid = true;

      // Validate income
      if (!income) {
         newErrors.income = 'Income is required';
         isValid = false;
      } else if (parseFloat(income) <= 0) {
         newErrors.income = 'Income must be greater than 0';
         isValid = false;
      }

      // Validate family members
      if (!familyMembers) {
         newErrors.familyMembers = 'Number of family members is required';
         isValid = false;
      } else if (parseInt(familyMembers) <= 0) {
         newErrors.familyMembers = 'Number of family members must be greater than 0';
         isValid = false;
      }

      // Validate categories
      categories.forEach(category => {
         if (!category.amount) {
            newErrors[category.id] = `Amount for ${category.name} is required`;
            isValid = false;
         }
      });

      // Check if total expenses exceed income
      if (totalExpenses > parseFloat(income)) {
         newErrors.totalExpenses = 'Total expenses cannot exceed income';
         isValid = false;
      }

      setErrors(newErrors);
      return isValid;
   };

   // Handle form submission
   const handleSubmit = () => {
      if (validateForm()) {
         // Form is valid, show success message
         Alert.alert(
            "Budget Saved",
            "Your budget has been saved successfully!",
            [{ text: "OK" }]
         );

         // Here you would typically send the data to your backend
         console.log({
            income: parseFloat(income),
            familyMembers: parseInt(familyMembers),
            categories: categories.map(category => ({
               name: category.name,
               amount: parseFloat(category.amount) || 0
            }))
         });
      } else {
         // Form has errors
         Alert.alert(
            "Validation Error",
            "Please fix the errors in the form",
            [{ text: "OK" }]
         );
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00c38d" />
         <View style={styles.header}>
            <Text style={styles.headerText}>Approximate Budget</Text>
         </View>

         <ScrollView style={styles.formContainer}>
            <View style={styles.formContent}>
               {/* Income Section */}
               <View style={styles.inputGroup}>
                  <Text style={styles.label}>Income Per Month</Text>
                  <Text>{income}</Text>
                  {errors.income && <Text style={styles.errorText}>{errors.income}</Text>}
               </View>

               {/* Family Members Section */}
               <View style={styles.inputGroup}>
                  <Text style={styles.label}>Numbers Of Family Members</Text>
                  <Text>{familyMembers}</Text>
               </View>

               {/* Expenses Section */}
               <View style={styles.expensesSection}>
                  <Text style={styles.expensesHeader}>Expected Expense</Text>

                  {categories.map(category => (
                     <View key={category.id} style={styles.expenseItem}>
                        <Text style={styles.expenseLabel}>{category.name}</Text>
                        <View style={styles.expenseInputContainer}>
                           <TextInput
                              style={[styles.expenseInput, errors[category.id] && styles.inputError]}
                              value={category.amount}
                              onChangeText={(text) => handleAmountChange(category.id, text)}
                              keyboardType="numeric"
                              placeholder="0"
                              placeholderTextColor="#999"
                           />
                           <View style={styles.expenseActions}>
                              <TouchableOpacity
                                 onPress={() => openEditModal(category)}
                                 style={styles.iconButton}
                              >
                                 <Ionicons name="pencil-outline" size={18} color="#333" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                 onPress={() => deleteCategory(category.id)}
                                 style={styles.iconButton}
                              >
                                 <Ionicons name="trash-outline" size={18} color="#333" />
                              </TouchableOpacity>
                           </View>
                        </View>
                        {errors[category.id] && <Text style={styles.errorText}>{errors[category.id]}</Text>}
                     </View>
                  ))}

                  <TouchableOpacity
                     style={styles.addCategoryButton}
                     onPress={addNewCategory}
                  >
                     <Ionicons name="add-circle-outline" size={20} color="#00c38d" />
                     <Text style={styles.addCategoryText}>Add Category</Text>
                  </TouchableOpacity>

                  {errors.totalExpenses && (
                     <Text style={[styles.errorText, styles.totalError]}>{errors.totalExpenses}</Text>
                  )}
               </View>

               {/* Terms and Privacy */}
               <Text style={styles.termsText}>
                  By continuing, you agree to{'\n'}Terms of Use and Privacy Policy.
               </Text>

               {/* Submit Button */}
               <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Done</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>

         {/* Edit Category Modal */}
         <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => setEditModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Edit Category Name</Text>

                  <TextInput
                     style={styles.modalInput}
                     value={newCategoryName}
                     onChangeText={setNewCategoryName}
                     placeholder="Enter category name"
                  />

                  <View style={styles.modalButtons}>
                     <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton]}
                        onPress={() => setEditModalVisible(false)}
                     >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                        style={[styles.modalButton, styles.saveButton]}
                        onPress={saveCategoryName}
                     >
                        <Text style={styles.saveButtonText}>Save</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00c38d',
   },
   header: {
      paddingVertical: 20,
      paddingHorizontal: 24,
   },
   headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
   },
   formContainer: {
      backgroundColor: '#f9f9f9',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
   },
   formContent: {
      padding: 24,
      paddingBottom: 40,
   },
   inputGroup: {
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   label: {
      fontSize: 16,
      color: '#333',
      flex: 1,
   },
   input: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ddd',
      width: 120,
      textAlign: 'right',
   },
   inputValue: {
      textAlign: 'right',
   },
   inputError: {
      borderColor: 'red',
   },
   errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
   },
   totalError: {
      textAlign: 'center',
      fontSize: 14,
      marginTop: 12,
   },
   expensesSection: {
      marginTop: 20,
   },
   expensesHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
   },
   expenseItem: {
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   expenseLabel: {
      fontSize: 16,
      color: '#333',
      flex: 1,
   },
   expenseInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1.5,
   },
   expenseInput: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ddd',
      textAlign: 'right',
   },
   expenseActions: {
      flexDirection: 'row',
      marginLeft: 8,
   },
   iconButton: {
      padding: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      marginHorizontal: 4,
   },
   addCategoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
      padding: 12,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: '#ddd',
   },
   addCategoryText: {
      marginLeft: 8,
      color: '#00c38d',
      fontWeight: '500',
   },
   termsText: {
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 20,
      color: '#666',
      fontSize: 12,
   },
   submitButton: {
      backgroundColor: '#00c38d',
      borderRadius: 30,
      paddingVertical: 15,
      alignItems: 'center',
      marginHorizontal: 40,
   },
   submitButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      width: '80%',
      elevation: 5,
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
      textAlign: 'center',
   },
   modalInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 24,
   },
   modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   modalButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
   },
   cancelButton: {
      backgroundColor: '#f0f0f0',
      marginRight: 8,
   },
   saveButton: {
      backgroundColor: '#00c38d',
      marginLeft: 8,
   },
   cancelButtonText: {
      color: '#333',
      fontWeight: '500',
   },
   saveButtonText: {
      color: '#fff',
      fontWeight: '500',
   },
});