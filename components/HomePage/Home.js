// App.js
import React, { useState } from 'react';
import {
   SafeAreaView,
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   StatusBar,
   Animated,
   Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5, } from '@expo/vector-icons';



const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7;

const Home = () => {
   const navigation = useNavigation();
   const [activeTab, setActiveTab] = useState('home');

   const [isSidebarOpen, setSidebarOpen] = useState(false);
   const [sidebarAnimation] = useState(new Animated.Value(0));

   const toggleSidebar = () => {
      const toValue = isSidebarOpen ? 0 : 1;

      Animated.timing(sidebarAnimation, {
         toValue,
         duration: 300,
         useNativeDriver: true,
      }).start();

      setSidebarOpen(!isSidebarOpen);
   };

   const translateX = sidebarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-SIDEBAR_WIDTH, 0],
   });



   const sidebarOpacity = sidebarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
   });

   const handlewallate = () => {
      setActiveTab('stats');
      navigation.navigate("WalletBalanceA")
   }
   const handleMicroSavings = () => {
      setActiveTab('goals')
      navigation.navigate("MicroSavingsB")
   }

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00C49A" barStyle="light-content" />

         {/* Sidebar */}
         <Animated.View
            style={[
               styles.sidebar,
               { transform: [{ translateX }], opacity: sidebarOpacity }
            ]}
         >
            <View style={styles.sidebarContent}>
               <View style={styles.sidebarHeader}>
                  <Text style={styles.sidebarTitle}>Budgeting</Text>
                  <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
                     <Feather name="x" size={24} color="#00C49A" />
                  </TouchableOpacity>
               </View>

               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="bar-chart-2" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Manage Budget</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="credit-card" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Link Account</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="settings" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Upload Statement</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("CategoriesA")}>
                  <Feather name="help-circle" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Manage Categories</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="help-circle" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Statistics</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("Welcome")}>
                  <Feather name="help-circle" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Create wallet</Text>
               </TouchableOpacity>
            </View>
         </Animated.View>

         {/* Main Screen */}
         <Animated.View
            style={[
               styles.mainScreen,
            ]}
         >
            {/* Header */}
            <View style={styles.header}>
               <TouchableOpacity onPress={toggleSidebar}>
                  <Feather name="menu" size={24} color="#000" />
               </TouchableOpacity>
               <View style={styles.headerTextContainer}>
                  <Text style={styles.headerTitle}>Hi, Welcome Back</Text>
                  <Text style={styles.headerSubtitle}>Good Morning</Text>
               </View>
            </View>

            {/* Budget Info */}
            <View style={styles.budgetContainer}>
               <View style={styles.budgetRow}>
                  <View style={styles.budgetItem}>
                     <View style={styles.budgetLabelContainer}>
                        <Feather name="check-square" size={16} color="#000" />
                        <Text style={styles.budgetLabel}>Total Budget</Text>
                     </View>
                     <Text style={styles.budgetValue}>₹7,783.00</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.budgetItem}>
                     <View style={styles.budgetLabelContainer}>
                        <Feather name="check-square" size={16} color="#000" />
                        <Text style={styles.budgetLabel}>Total Expense</Text>
                     </View>
                     <Text style={[styles.budgetValue, styles.expenseValue]}>-₹1,187.40</Text>
                  </View>
               </View>

               {/* Progress Bar */}
               <View style={styles.progressContainer}>
                  <View style={styles.progressBarBg}>
                     <View style={[styles.progressBar, { width: '30%' }]} />
                  </View>
                  <Text style={styles.progressMaxValue}>₹20,000.00</Text>
                  <View style={styles.progressLabelContainer}>
                     <Feather name="check-square" size={16} color="#000" />
                     <Text style={styles.progressLabel}>30% Of Your Expenses, Looks Good.</Text>
                  </View>
               </View>
            </View>

            {/* Uncategorized Transactions */}
            <View style={styles.transactionsContainer}>
               <Text style={styles.transactionsTitle}>Uncategorized Transactions</Text>

               {/* Transaction Item */}
               <View style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                     <View style={[styles.transactionIcon, styles.incomeIcon]}>
                        <Feather name="plus" size={24} color="#fff" />
                     </View>
                     <View style={styles.transactionDetails}>
                        <Text style={styles.transactionAmount}>₹40,000</Text>
                        <Text style={styles.transactionDate}>18:27 - April 30</Text>
                     </View>
                  </View>
                  <View style={styles.categorySelector}>
                     <Text style={styles.categorySelectorText}>Select Category</Text>
                     <Feather name="chevron-down" size={20} color="#000" />
                  </View>
               </View>

               {/* Transaction Item */}
               <View style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                     <View style={[styles.transactionIcon, styles.expenseIcon]}>
                        <Feather name="minus" size={24} color="#fff" />
                     </View>
                     <View style={styles.transactionDetails}>
                        <Text style={styles.transactionAmount}>₹10,000</Text>
                        <Text style={styles.transactionDate}>17:00 - April 24</Text>
                     </View>
                  </View>
                  <View style={styles.categorySelector}>
                     <Text style={styles.categorySelectorText}>Select Category</Text>
                     <Feather name="chevron-down" size={20} color="#000" />
                  </View>
               </View>

               {/* Transaction Item */}
               <View style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                     <View style={[styles.transactionIcon, styles.expenseIcon]}>
                        <Feather name="minus" size={24} color="#fff" />
                     </View>
                     <View style={styles.transactionDetails}>
                        <Text style={styles.transactionAmount}>₹5000</Text>
                        <Text style={styles.transactionDate}>8:30 - April 15</Text>
                     </View>
                  </View>
                  <View style={styles.categorySelector}>
                     <Text style={styles.categorySelectorText}>Select Category</Text>
                     <Feather name="chevron-down" size={20} color="#000" />
                  </View>
               </View>

               {/* Transaction Item */}
               <View style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                     <View style={[styles.transactionIcon, styles.expenseIcon]}>
                        <Feather name="minus" size={24} color="#fff" />
                     </View>
                     <View style={styles.transactionDetails}>
                        <Text style={styles.transactionAmount}>₹5000</Text>
                        <Text style={styles.transactionDate}>8:30 - April 15</Text>
                     </View>
                  </View>
                  <View style={styles.categorySelector}>
                     <Text style={styles.categorySelectorText}>Select Category</Text>
                     <Feather name="chevron-down" size={20} color="#000" />
                  </View>
               </View>
            </View>

            {/* Add Income/Expense Buttons */}
            <View style={styles.actionButtonsContainer}>
               <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddIncome')}>
                  <Text style={styles.actionButtonText}>Add Income</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddExpenses')}>
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
                  onPress={handlewallate}
               >
                  <FontAwesome5 name="wallet" size={22} color="black" />
               </TouchableOpacity>

               <TouchableOpacity
                  style={[styles.navItem, activeTab === 'goals' ? styles.activeNavItem : null]}
                  onPress={handleMicroSavings}
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
         </Animated.View>
      </SafeAreaView >
   );
};

const styles = StyleSheet.create({
   container: {
      top: 20,
      flex: 1,
      backgroundColor: '#F5F5F5',
   },
   sidebar: {
      position: 'absolute',
      width: SIDEBAR_WIDTH,
      height: '100%',
      backgroundColor: '#fff',
      zIndex: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
   },
   sidebarContent: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
   },
   sidebarHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
   },
   sidebarTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#00C49A',
   },
   sidebarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
   },
   sidebarItemText: {
      fontSize: 16,
      marginLeft: 15,
      color: '#333',
   },
   mainScreen: {
      flex: 1,
      backgroundColor: '#00C49A',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 20,
   },
   headerTextContainer: {
      marginLeft: 15,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
   },
   headerSubtitle: {
      fontSize: 14,
      color: '#333',
   },
   budgetContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
   },
   budgetRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
   },
   budgetItem: {
      flex: 1,
   },
   budgetLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
   },
   budgetLabel: {
      marginLeft: 5,
      fontSize: 14,
      color: '#000',
   },
   budgetValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
   },
   expenseValue: {
      color: '#E74C3C',
   },
   divider: {
      width: 1,
      height: 40,
      backgroundColor: '#fff',
      marginHorizontal: 10,
   },
   progressContainer: {
      marginTop: 10,
   },
   progressBarBg: {
      height: 19,
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden',
   },
   progressBar: {
      height: '100%',
      backgroundColor: 'black',
      borderRadius: 6,
   },
   progressMaxValue: {
      textAlign: 'right',
      marginTop: 5,
      fontSize: 14,
      color: '#000',
   },
   progressLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
   },
   progressLabel: {
      marginLeft: 5,
      fontSize: 14,
      color: '#000',
   },
   transactionsContainer: {
      backgroundColor: '#f5f5f5',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      flex: 1,
   },
   transactionsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 15,
      backgroundColor: '#dff7e2',
      textAlign: 'center',  // Centers text
      paddingVertical: 10,  // Adds space inside
      paddingHorizontal: 40, // Adds horizontal space
      borderRadius: 10,  // Optional: Rounded corners
      alignSelf: 'center', // Ensures width fits content and centers it
   },
   transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
   },
   transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   incomeIcon: {
      backgroundColor: '#4080FF',
   },
   expenseIcon: {
      backgroundColor: '#FF4040',
   },
   transactionDetails: {
      marginLeft: 10,
   },
   transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
   },
   transactionDate: {
      fontSize: 12,
      color: '#666',
   },
   categorySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 20,
      backgroundColor: '#fff',
   },
   categorySelectorText: {
      fontSize: 14,
      color: '#666',
      marginRight: 5,
   },
   actionButtonsContainer: {
      bottom: 20,

      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: '#f5f5f5',
   },
   actionButton: {
      flex: 1,
      backgroundColor: '#00C49A',
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
   },
   actionButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
   },
   bottomNav: {
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopColor: '#E0E0E0',
      backgroundColor: '#dff7e2',
      // borderRadius: 20
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
   navItem: {
      alignItems: 'center',
   },
});

export default Home;