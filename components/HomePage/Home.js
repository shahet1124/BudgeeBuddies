import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   TouchableOpacity,
   StatusBar,
   FlatList,
   Image
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function HomeScreen() {
   const [transactions, setTransactions] = useState([
      { id: '1', amount: '₹40,000', date: 'Wed • April 18', category: null, type: 'income' },
      { id: '2', amount: '₹10,000', date: 'Tue • April 17', category: null, type: 'expense' },
      { id: '3', amount: '₹5000', date: 'Mon • April 16', category: null, type: 'expense' },
      { id: '4', amount: '₹5000', date: 'Sun • April 15', category: null, type: 'expense' },
   ]);

   const [activeTab, setActiveTab] = useState('home');

   const totalBalance = 7783.00;
   const weeklySpending = 2187.40;
   const monthlyLimit = 10000.00;

   const selectCategory = (id) => {
      // In a real app, this would open a category selection modal
      console.log('Select category for transaction', id);
   };

   const addIncome = () => {
      console.log('Add income');
      // Would open income entry form
   };

   const addExpense = () => {
      console.log('Add expense');
      // Would open expense entry form
   };

   const renderTransaction = ({ item }) => (
      <View style={styles.transactionItem}>
         <View style={[styles.iconContainer, { backgroundColor: item.type === 'income' ? '#4CD964' : '#007AFF' }]}>
            {item.type === 'income' ? (
               <Ionicons name="add" size={24} color="white" />
            ) : (
               <Ionicons name="remove" size={24} color="white" />
            )}
         </View>
         <View style={styles.transactionInfo}>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
         </View>
         <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => selectCategory(item.id)}
         >
            <Text style={styles.categoryButtonText}>Select Category</Text>
            <MaterialIcons name="arrow-drop-down" size={20} color="#999" />
         </TouchableOpacity>
      </View>
   );

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#00BFA5" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity>
               <Ionicons name="menu-outline" size={24} color="black" />
            </TouchableOpacity>
            <View>
               <Text style={styles.headerTitle}>Hi, Welcome Back</Text>
               <Text style={styles.headerSubtitle}>Axel Manning</Text>
            </View>
            <View style={styles.spacer} />
         </View>

         {/* Balance Card */}
         <View style={styles.balanceCard}>
            <View style={styles.balanceSection}>
               <Text style={styles.balanceLabel}>Current Balance</Text>
               <Text style={styles.balanceAmount}>₹7,783.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.balanceSection}>
               <Text style={styles.balanceLabel}>Weekly Expenses</Text>
               <Text style={styles.expenseAmount}>₹2,187.40</Text>
               <View style={styles.limitContainer}>
                  <View style={styles.limitBar}>
                     <View style={[styles.limitProgress, { width: `${(weeklySpending / monthlyLimit) * 100}%` }]} />
                  </View>
                  <Text style={styles.limitText}>₹{monthlyLimit.toLocaleString()}</Text>
               </View>
            </View>
         </View>

         {/* Expense Status */}
         <Text style={styles.expenseStatus}>158% Of Your Expenses Looks Good</Text>

         {/* Transactions List */}
         <View style={styles.transactionsContainer}>
            <Text style={styles.transactionsTitle}>Uncategorized Transactions</Text>

            <FlatList
               data={transactions}
               renderItem={renderTransaction}
               keyExtractor={item => item.id}
               scrollEnabled={false}
            />
         </View>

         {/* Action Buttons */}
         <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={addIncome}>
               <Text style={styles.actionButtonText}>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={addExpense}>
               <Text style={styles.actionButtonText}>Add Expenses</Text>
            </TouchableOpacity>
         </View>

         {/* Bottom Navigation Bar */}
         <View style={styles.bottomNav}>
            <TouchableOpacity
               style={[styles.navItem, activeTab === 'home' ? styles.activeNavItem : null]}
               onPress={() => setActiveTab('home')}
            >
               <Ionicons
                  name={activeTab === 'home' ? "home" : "home-outline"}
                  size={24}
                  color={activeTab === 'home' ? "#00BFA5" : "#777"}
               />
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.navItem, activeTab === 'stats' ? styles.activeNavItem : null]}
               onPress={() => setActiveTab('stats')}
            >
               <Ionicons
                  name={activeTab === 'stats' ? "bar-chart" : "bar-chart-outline"}
                  size={24}
                  color={activeTab === 'stats' ? "#00BFA5" : "#777"}
               />
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.navItem, activeTab === 'goals' ? styles.activeNavItem : null]}
               onPress={() => setActiveTab('goals')}
            >
               <MaterialCommunityIcons
                  name="target"
                  size={24}
                  color={activeTab === 'goals' ? "#00BFA5" : "#777"}
               />
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.navItem, activeTab === 'profile' ? styles.activeNavItem : null]}
               onPress={() => setActiveTab('profile')}
            >
               <Ionicons
                  name={activeTab === 'profile' ? "person" : "person-outline"}
                  size={24}
                  color={activeTab === 'profile' ? "#00BFA5" : "#777"}
               />
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      // paddingTop: Constants.statusBarHeight,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#00D09E',
   },
   headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
   },
   headerSubtitle: {
      fontSize: 14,
      color: '#000',
   },
   spacer: {
      width: 24,
   },
   balanceCard: {
      backgroundColor: '#00D09E',
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
   },
   balanceSection: {
      marginTop: 10,
   },
   balanceLabel: {
      fontSize: 14,
      color: '#000',
      marginBottom: 5,
   },
   balanceAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
   },
   expenseAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
   },
   divider: {
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.1)',
      marginVertical: 15,
   },
   limitContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
   },
   limitBar: {
      flex: 1,
      height: 4,
      backgroundColor: 'rgba(255,255,255,0.4)',
      borderRadius: 2,
      marginRight: 10,
   },
   limitProgress: {
      height: 4,
      backgroundColor: '#FFF',
      borderRadius: 2,
   },
   limitText: {
      fontSize: 12,
      color: '#000',
   },
   expenseStatus: {
      fontSize: 14,
      fontWeight: '500',
      color: '#333',
      textAlign: 'center',
      marginVertical: 15,
   },
   transactionsContainer: {
      flex: 1,
      paddingHorizontal: 20,
   },
   transactionsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
   },
   transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#E0E0E0',
   },
   iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
   },
   transactionInfo: {
      flex: 1,
   },
   transactionAmount: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
   },
   transactionDate: {
      fontSize: 12,
      color: '#999',
   },
   categoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 20,
   },
   categoryButtonText: {
      fontSize: 14,
      color: '#777',
      marginRight: 4,
   },
   actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
   },
   actionButton: {
      flex: 1,
      backgroundColor: '#00BFA5',
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
      marginHorizontal: 5,
   },
   actionButtonText: {
      color: '#FFF',
      fontWeight: '500',
      fontSize: 16,
   },
   bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      backgroundColor: '#FFF',
   },
   navItem: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      paddingHorizontal: 15,
   },
   activeNavItem: {
      borderRadius: 20,
      backgroundColor: 'rgba(0, 191, 165, 0.1)',
   },
});