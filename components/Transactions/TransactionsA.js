import React, { useState } from 'react';
import {
   View,
   Text,
   ScrollView,
   StyleSheet,
   SafeAreaView,
   TouchableOpacity,
   Dimensions,
   StatusBar,
   Animated,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7;

// Simple Icon Components
const MenuIcon = () => (
   <View style={styles.iconContainer}>
      <View style={[styles.menuLine, { width: 18 }]} />
      <View style={[styles.menuLine, { width: 14, marginVertical: 4 }]} />
      <View style={[styles.menuLine, { width: 18 }]} />
   </View>
);

const NotificationIcon = () => (
   <View style={styles.bellContainer}>
      <Text style={styles.bellIcon}>🔔</Text>
   </View>
);

const UpArrowIcon = () => (
   <View style={[styles.arrowIconContainer, { backgroundColor: '#e6f7ef' }]}>
      <Text style={[styles.arrowIcon, { color: '#00C684' }]}>↗</Text>
   </View>
);

const DownArrowIcon = () => (
   <View style={[styles.arrowIconContainer, { backgroundColor: '#e6f0fa' }]}>
      <Text style={[styles.arrowIcon, { color: '#1976D2' }]}>↘</Text>
   </View>
);

const ProfileIcon = ({ letter }) => {
   const colors = {
      'R': '#5E9CF1',
      'J': '#4285F4',
      'D': '#0F5FE0',
      'B': '#4285F4',
      'M': '#7FB3F8',
   };
   const backgroundColor = colors[letter] || '#4285F4';

   return (
      <View style={[styles.profileIcon, { backgroundColor }]}>
         <Text style={styles.profileIconText}>{letter}</Text>
      </View>
   );
};

const BottomTabIcon = ({ icon, active }) => (
   <View style={[styles.bottomTabIcon, active ? styles.activeTab : {}]}>
      <Text style={styles.tabIconText}>{icon}</Text>
   </View>
);

const TransactionPage = () => {
   const navigation = useNavigation();

   // Responsive sizing
   const { width } = Dimensions.get('window');
   const isSmallDevice = width < 375;
   const isLargeDevice = width >= 428;

   // Adjust font sizes based on device width
   const fontSizes = {
      title: isSmallDevice ? 18 : isLargeDevice ? 22 : 20,
      balance: isSmallDevice ? 24 : isLargeDevice ? 30 : 26,
      transaction: isSmallDevice ? 14 : isLargeDevice ? 18 : 16,
      amount: isSmallDevice ? 15 : isLargeDevice ? 19 : 17,
      date: isSmallDevice ? 11 : isLargeDevice ? 15 : 13,
   };

   // Dummy transaction data
   const transactions = [
      {
         month: 'April',
         items: [
            { id: 1, name: 'Rambhai Sarda', date: '18:27 - April 30', amount: 4000, letter: 'R' },
            { id: 2, name: 'Jay Bhavani Vadapav', date: '17:00 - April 24', amount: -100, letter: 'J' },
            { id: 3, name: 'Dilip Joshi', date: '8:30 - April 15', amount: -674.40, letter: 'D' },
            { id: 4, name: 'Bhaveshbhai Mehta', date: '9:30 - April 08', amount: -413, letter: 'B' },
         ]
      },
      {
         month: 'March',
         items: [
            { id: 5, name: 'Murlidhar Nasta Centre', date: '19:30 - March 31', amount: -70.40, letter: 'M' },
         ]
      }
   ];

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

               {/* Sidebar Header with Close Button */}
               <View style={styles.sidebarHeader}>
                  <Text style={styles.sidebarTitle}>Menu</Text>
                  <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
                     <Feather name="x" size={24} color="#00C49A" />
                  </TouchableOpacity>
               </View>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="home" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Dashboard</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="bar-chart-2" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Analytics</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="credit-card" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Transactions</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="settings" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Settings</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarItem}>
                  <Feather name="help-circle" size={24} color="#00C49A" />
                  <Text style={styles.sidebarItemText}>Help</Text>
               </TouchableOpacity>
            </View>
         </Animated.View>

         {/* Header */}
         <View style={styles.header}>

            <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
               <MenuIcon name="menu" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontSize: fontSizes.title }]}>Transaction</Text>

         </View>

         {/* Balance Card */}
         <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={[styles.balanceAmount, { fontSize: fontSizes.balance }]}>₹7,783.00</Text>
         </View>

         {/* Income & Expense Cards */}
         <View style={styles.statsContainer} >
            <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('TransactionsIncome')} >
               <UpArrowIcon />
               <Text style={styles.statLabel}>Income</Text>
               <Text style={styles.incomeAmount}>₹4,120.00</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('TransactionsExpense')}>
               <DownArrowIcon />
               <Text style={styles.statLabel}>Expense</Text>
               <Text style={styles.expenseAmount}>₹1,187.40</Text>
            </TouchableOpacity>
         </View>

         {/* Transactions List */}
         <View style={styles.transactionsContainer}>
            <ScrollView
               style={styles.transactionsList}
               showsVerticalScrollIndicator={false}
            >
               {transactions.map((section) => (
                  <View key={section.month} style={styles.section}>
                     <Text style={styles.sectionTitle}>{section.month}</Text>

                     {section.items.map((item) => (
                        <View key={item.id} style={styles.transactionItem}>
                           <View style={styles.transactionLeft}>
                              <ProfileIcon letter={item.letter} />
                              <View style={styles.transactionDetails}>
                                 <Text style={[styles.transactionName, { fontSize: fontSizes.transaction }]}>{item.name}</Text>
                                 <Text style={[styles.transactionDate, { fontSize: fontSizes.date }]}>{item.date}</Text>
                              </View>
                           </View>
                           <Text style={[
                              styles.transactionAmount,
                              { fontSize: fontSizes.amount },
                              item.amount > 0 ? styles.income : styles.expense
                           ]}>
                              {item.amount > 0 ? '₹' : '-₹'}{Math.abs(item.amount).toFixed(2).replace(/\.00$/, '')}
                           </Text>
                        </View>
                     ))}
                  </View>
               ))}

               {/* Add extra space at bottom for better scrolling */}
               <View style={styles.bottomPadding} />
            </ScrollView>
         </View>

         {/* Bottom Navigation Bar */}
         <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
               <BottomTabIcon icon="🏠" active={true} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("WalletBalanceA")}>
               <BottomTabIcon icon="👛" active={false} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("MicroSavingsB")}>
               <BottomTabIcon icon="🎯" active={false} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
               <BottomTabIcon icon="👤" active={false} />
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
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
   },
   headerTitle: {
      color: '#fff',
      fontWeight: '600',
   },
   menuButton: {
      padding: 5,
   },
   notificationButton: {
      padding: 5,
   },
   menuLine: {
      height: 2,
      backgroundColor: '#fff',
      borderRadius: 1,
   },
   iconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
   },
   bellContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 16,
   },
   bellIcon: {
      fontSize: 16,
   },
   balanceCard: {
      marginHorizontal: 20,
      backgroundColor: '#f8f8f8',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: 16,
   },
   balanceLabel: {
      textAlign: 'center',
      fontSize: 14,
      color: '#555',
      marginBottom: 8,
   },
   balanceAmount: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#333',
   },
   statsContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 20,
   },
   statCard: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      borderRadius: 16,
      padding: 15,
      alignItems: 'center',
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
   },
   statLabel: {
      fontSize: 14,
      color: '#555',
      marginTop: 8,
      marginBottom: 5,
   },
   incomeAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
   },
   expenseAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1976D2',
   },
   arrowIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
   },
   arrowIcon: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   transactionsContainer: {
      flex: 1,
      backgroundColor: '#f5f7fa',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
   },
   transactionsList: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
   },
   section: {
      marginBottom: 15,
   },
   sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
   },
   transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
   },
   transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   profileIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
   },
   profileIconText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
   },
   transactionDetails: {
      justifyContent: 'center',
   },
   transactionName: {
      color: '#333',
      fontWeight: '500',
      marginBottom: 3,
   },
   transactionDate: {
      color: '#999',
   },
   transactionAmount: {
      fontWeight: '600',
   },
   income: {
      color: '#333',
   },
   expense: {
      color: '#1976D2',
   },
   bottomPadding: {
      height: 80,
   },
   bottomNav: {
      flexDirection: 'row',
      backgroundColor: '#f0f8f5',
      paddingTop: 12,
      paddingBottom: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 5,
      bottom: 20
   },
   navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   bottomTabIcon: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
   },
   activeTab: {
      backgroundColor: '#00C684',
   },
   tabIconText: {
      fontSize: 20,
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
});

export default TransactionPage;