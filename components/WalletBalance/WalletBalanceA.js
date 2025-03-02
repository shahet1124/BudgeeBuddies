import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   SafeAreaView,
   StatusBar,
   Platform, Animated,
   Dimensions
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7;

export default function WalletBalanceA({ navigation }) {
   // Handle navigation
   const navigateToTopUp = () => {
      // Navigate to top up screen
      alert('Navigating to Top-up Wallet screen');
      navigation.navigate('TopUpWallet');
   };

   const navigateToWithdraw = () => {
      // Navigate to withdraw screen
      alert('Navigating to Withdraw Money screen');
      navigation.navigate('WithdrawMoney');
   };

   const navigateToHistory = () => {
      // Navigate to transaction history
      alert('Navigating to Transaction History screen');
      navigation.navigate('TransactionsA');
   };

   const handlePaymentOption = (method) => {
      // Handle different payment methods
      alert(`Selected payment method: ${method}`);
      // Replace with appropriate navigation or action
   };
   const [activeTab, setActiveTab] = useState('WalletBalanceA');

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
   const handlehome = () => {
      setActiveTab('home');
      navigation.navigate("Home")
   }

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00d1a0" barStyle="dark-content" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity onPress={toggleSidebar}>
               <Feather name="menu" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Wallet Balance</Text>
            <View style={{ width: 24 }} />
         </View>

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

         {/* Balance Card */}
         <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>₹7,783.0</Text>
         </View>

         {/* Main Content */}
         <View style={styles.mainContent}>
            {/* Payment Options */}
            <View style={styles.paymentOptions}>
               <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => handlePaymentOption('QR Code')}
               >
                  <View style={styles.iconContainer}>
                     <MaterialCommunityIcons name="qrcode-scan" size={28} color="black" />
                  </View>
                  <Text style={styles.paymentText}>Scan QR{'\n'}code</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => handlePaymentOption('Mobile Number')}
               >
                  <View style={styles.iconContainer}>
                     <FontAwesome5 name="mobile-alt" size={28} color="black" />
                  </View>
                  <Text style={styles.paymentText}>Pay mobile{'\n'}number</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => handlePaymentOption('UPI ID')}
               >
                  <View style={styles.iconContainer}>
                     <MaterialCommunityIcons name="bank-transfer" size={28} color="black" />
                  </View>
                  <Text style={styles.paymentText}>Pay to UPI{'\n'}ID</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => handlePaymentOption('Wallet')}
               >
                  <View style={styles.iconContainer}>
                     <FontAwesome5 name="wallet" size={24} color="black" />
                  </View>
                  <Text style={styles.paymentText}>Pay to{'\n'}Wallet</Text>
               </TouchableOpacity>
            </View>

            {/* Transaction History Button */}
            <TouchableOpacity
               style={styles.historyRow}
               onPress={navigateToHistory}
            >
               <View style={styles.historyLeft}>
                  <Ionicons name="time-outline" size={24} color="black" />
                  <Text style={styles.historyText}>See Transaction History</Text>
               </View>
               <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>

            {/* Main Action Buttons */}
            <View style={styles.actionButtonsContainer}>
               <TouchableOpacity
                  style={styles.actionButton}
                  onPress={navigateToTopUp}
               >
                  <Text style={styles.actionButtonText}>Top-up Wallet</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.actionButton}
                  onPress={navigateToWithdraw}
               >
                  <Text style={styles.actionButtonText}>Withdraw Money</Text>
               </TouchableOpacity>
            </View>
         </View>

         {/* Bottom Navigation Bar */}
         <View style={styles.bottomNav}>
            <TouchableOpacity
               style={[styles.navItem, activeTab === 'home' ? styles.activeNavItem : null]}
               onPress={handlehome}
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
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00d1a0',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
   },
   balanceCard: {
      backgroundColor: '#f5fff7',
      marginHorizontal: 20,
      marginVertical: 15,
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
   },
   balanceLabel: {
      fontSize: 16,
      marginBottom: 5,
      color: 'black',
   },
   balanceAmount: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'black',
   },
   mainContent: {
      flex: 1,
      backgroundColor: '#f5fff7',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 25,
   },
   paymentOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 15,
      marginBottom: 30,
   },
   paymentOption: {
      alignItems: 'center',
      width: '25%',
   },
   iconContainer: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
   },
   paymentText: {
      textAlign: 'center',
      fontSize: 12,
      color: 'black',
      lineHeight: 16,
   },
   historyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
      marginHorizontal: 20,
   },
   historyLeft: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   historyText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '600',
      color: 'black',
   },
   actionButtonsContainer: {
      marginTop: 'auto',
      paddingHorizontal: 20,
      paddingBottom: 20,
   },
   actionButton: {
      backgroundColor: '#00d1a0',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 15,
   },
   actionButtonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
   },
   bottomTabBar: {
      height: 60,
      backgroundColor: '#e6ffee',
      flexDirection: 'row',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
   },
   tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   activeTab: {
      backgroundColor: '#00d1a0',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      borderWidth: 4,
      borderColor: '#e6ffee',
   },
   bottomNav: {
      // bottom: 20,
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