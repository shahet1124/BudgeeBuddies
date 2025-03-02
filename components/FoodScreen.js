//Food Category
import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   SafeAreaView,
   StatusBar,
   ScrollView,
   FlatList
} from 'react-native';
import {
   Ionicons,
   MaterialCommunityIcons,
   FontAwesome5,
   AntDesign,
   Feather
} from '@expo/vector-icons';

export default function FoodScreen({ navigation }) {
   // State for budget and expenses
   const [allocatedBudget, setAllocatedBudget] = useState(7783.00);
   const [totalExpense, setTotalExpense] = useState(-1187.40);

   // Sample expense data grouped by month
   const [expenseData, setExpenseData] = useState({
      April: [
         { id: '1', title: 'XYZ', time: '18:27', date: 'April 30', amount: -2600 },
         { id: '2', title: 'Delivery Pizza', time: '15:00', date: 'April 24', amount: -1835 },
         { id: '3', title: 'Samosas', time: '12:30', date: 'April 15', amount: -1540 },
         { id: '4', title: 'Dosa At Brunch', time: '9:30', date: 'April 08', amount: -1213 },
      ],
      March: [
         { id: '5', title: 'Mexican Dinner', time: '20:50', date: 'March 31', amount: -2720 },
      ]
   });

   // Function to add new expense
   const handleAddExpense = () => {
      console.log('Add new expense');
      // Navigate to add expense screen
      // navigation.navigate('AddExpense', { category: 'Food', onExpenseAdded: handleExpenseAdded });
   };

   // Callback function for when a new expense is added
   const handleExpenseAdded = (newExpense) => {
      // Determine which month the expense belongs to
      const month = newExpense.date.split(' ')[0]; // Extract month name

      // Update the expenses state
      setExpenseData(prevData => {
         // If the month already exists in our data
         if (prevData[month]) {
            return {
               ...prevData,
               [month]: [newExpense, ...prevData[month]]
            };
         } else {
            // If it's a new month
            return {
               ...prevData,
               [month]: [newExpense]
            };
         }
      });

      // Update total expense
      setTotalExpense(prev => prev + newExpense.amount);
   };

   // Function to render expense items
   const renderExpenseItem = ({ item }) => (
      <View style={styles.expenseItem}>
         <View style={styles.expenseIconContainer}>
            <FontAwesome5 name="utensils" size={20} color="white" />
         </View>

         <View style={styles.expenseDetails}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseTime}>
               {item.time} - {item.date}
            </Text>
         </View>

         <Text style={styles.expenseAmount}>
            {item.amount.toLocaleString('en-IN', {
               style: 'currency',
               currency: 'INR',
               minimumFractionDigits: 0,
               maximumFractionDigits: 0
            })}
         </Text>
      </View>
   );

   // Function to render each month section
   const renderMonthSection = () => {
      return Object.keys(expenseData).map(month => (
         <View key={month} style={styles.monthSection}>
            <Text style={styles.monthTitle}>{month}</Text>
            <FlatList
               data={expenseData[month]}
               renderItem={renderExpenseItem}
               keyExtractor={item => item.id}
               scrollEnabled={false}
            />
         </View>
      ));
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor="#00C897" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
               <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { textAlign: 'center' }]}>Food</Text>
         </View>

         {/* Budget Info */}
         <View style={styles.budgetContainer}>
            <View style={styles.budgetRow}>
               <View style={styles.budgetItem}>
                  <Text style={styles.budgetLabel}>
                     <Ionicons name="checkmark-circle-outline" size={16} color="black" />
                     Allocated Budget (Food)
                  </Text>
                  <Text style={styles.budgetAmount}>
                     ₹{allocatedBudget.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                     })}
                  </Text>
               </View>

               <View style={styles.separator} />

               <View style={styles.budgetItem}>
                  <Text style={styles.budgetLabel}>
                     <Ionicons name="checkmark-circle-outline" size={16} color="black" />
                     Total Expense (Food)
                  </Text>
                  <Text style={[styles.budgetAmount, styles.expenseAmount]}>
                     {totalExpense.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                     })}
                  </Text>
               </View>
            </View>
         </View>

         {/* Main Content */}
         <View style={styles.contentContainer}>
            <ScrollView style={styles.scrollView}>
               <View style={styles.expensesContainer}>
                  <View style={styles.monthHeader}>
                     <Text style={styles.monthHeaderTitle}>April</Text>
                     <TouchableOpacity style={styles.calendarButton}>
                        <AntDesign name="calendar" size={24} color="#00C897" />
                     </TouchableOpacity>
                  </View>

                  {renderMonthSection()}
               </View>

               {/* Add Expenses Button */}
               <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddExpense}
               >
                  <Text style={styles.addButtonText}>Add Expenses</Text>
               </TouchableOpacity>
            </ScrollView>
         </View>

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
      top: 20,
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
   budgetContainer: {
      paddingHorizontal: 16,
      paddingBottom: 24,
   },
   budgetRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   budgetItem: {
      flex: 1,
   },
   budgetLabel: {
      fontSize: 14,
      color: 'black',
      marginBottom: 4,
   },
   budgetAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
   },
   expenseAmount: {
      color: '#d32f2f',
   },
   separator: {
      width: 1,
      height: '100%',
      backgroundColor: '#E0E0E0',
      marginHorizontal: 16,
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
   expensesContainer: {
      flex: 1,
      padding: 16,
   },
   monthHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
   },
   monthHeaderTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
   },
   calendarButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E8F8F4',
      justifyContent: 'center',
      alignItems: 'center',
   },
   monthSection: {
      marginBottom: 20,
   },
   monthTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: '#333',
   },
   expenseItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
   },
   expenseIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#4285F4',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
   },
   expenseDetails: {
      flex: 1,
   },
   expenseTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
   },
   expenseTime: {
      fontSize: 14,
      color: '#666',
      marginTop: 2,
   },
   expenseAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#d32f2f',
   },
   addButton: {
      backgroundColor: '#00C897',
      borderRadius: 25,
      paddingVertical: 14,
      alignItems: 'center',
      marginHorizontal: 16,
      marginVertical: 20,
   },
   addButtonText: {
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
      bottom: 10
   },
   navButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
   },
});