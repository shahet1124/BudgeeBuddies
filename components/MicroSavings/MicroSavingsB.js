import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   StatusBar,
   SafeAreaView,
   Platform,
   Alert
} from 'react-native';
import { Ionicons, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MicroSavingsB({ navigation }) {
   const [activeTab, setActiveTab] = useState('goals');

   const handleManageMicroSavings = () => {
      Alert.alert('Navigation', 'Navigating to Manage Micro Savings screen');
      navigation.navigate('ManageMicroSavings');
   };

   const handleManageGoals = () => {
      Alert.alert('Navigation', 'Navigating to Manage Goals screen');
      // In a real app: navigation.navigate('ManageGoals');
   };

   const handleSeeSavings = () => {
      Alert.alert('Navigation', 'Navigating to See Savings screen');
      navigation.navigate('SeeSavings');
   };

   const handleWithdrawSavings = () => {
      Alert.alert('Navigation', 'Navigating to Withdraw Savings screen');
      navigation.navigate('WithdrawSavings');
   };

   const handleMenu = () => {
      Alert.alert('Menu', 'Opening menu');
   };

   const handleHome = () => {
      setActiveTab('home');
      navigation.navigate('Home');
   }
   const handleWalletBalanceA = () => {
      setActiveTab('WalletBalanceA');
      navigation.navigate('WalletBalanceA');
   }
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
            <TouchableOpacity onPress={handleMenu} style={styles.menuButton}>
               <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Micro Savings</Text>
            <View style={{ width: 24 }} />
         </View>

         {/* Content */}
         <View style={styles.content}>
            <View style={styles.buttonContainer}>
               <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleManageMicroSavings}
               >
                  <Text style={styles.actionButtonText}>Manage Micro{'\n'}Savings</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleManageGoals}
               >
                  <Text style={styles.actionButtonText}>Manage Goals</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleSeeSavings}
               >
                  <Text style={styles.actionButtonText}>See Savings</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleWithdrawSavings}
               >
                  <Text style={styles.actionButtonText}>Withdraw{'\n'}Savings</Text>
               </TouchableOpacity>
            </View>

            {/* Navigation Bar */}
            <View style={styles.navigation}>
               <TouchableOpacity
                  style={styles.navItem}
                  onPress={handleHome}
               >
                  <Ionicons
                     name="home-outline"
                     size={24}
                     color={activeTab === 'home' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.navItem}
                  onPress={handleWalletBalanceA}
               >
                  <FontAwesome
                     name="wallet"
                     size={22}
                     color={activeTab === 'wallet' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  style={[
                     styles.navItem,
                     activeTab === 'goals' ? styles.activeNavItem : null
                  ]}
                  onPress={() => setActiveTab('goals')}
               >
                  <Feather
                     name="target"
                     size={24}
                     color={activeTab === 'goals' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => setActiveTab('profile')}
               >
                  <MaterialCommunityIcons
                     name="account-outline"
                     size={24}
                     color={activeTab === 'profile' ? '#00cea8' : '#333'}
                  />
               </TouchableOpacity>
            </View>
         </View>
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
   menuButton: {
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
   },
   buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 80,
   },
   actionButton: {
      backgroundColor: '#00cea8',
      borderRadius: 30,
      width: 260,
      height: 85,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
   },
   actionButtonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   navigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      backgroundColor: '#f5fff9',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
   },
   navItem: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
   },
   activeNavItem: {
      backgroundColor: 'rgba(0, 206, 168, 0.1)',
      borderRadius: 50,
   },
})