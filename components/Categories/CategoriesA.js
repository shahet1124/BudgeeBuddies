import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView, Modal, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const App = () => {
   const [totalBalance, setTotalBalance] = useState(7783.00);
   const [totalExpense, setTotalExpense] = useState(1187.40);
   const [maxBudget, setMaxBudget] = useState(20000.00);
   const [modalVisible, setModalVisible] = useState(false);
   const [newCategory, setNewCategory] = useState("");
   const navigation = useNavigation();

   // Calculate expense percentage
   const expensePercentage = (totalExpense / maxBudget) * 100;

   const [categories, setCategories] = useState([
      { id: 1, name: 'Food', icon: <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="white" />, color: '#7BB3F6', navigation: 'CategoriesNavigation' },
      { id: 2, name: 'Transport', icon: <FontAwesome5 name="bus" size={24} color="white" />, color: '#7BB3F6', navigation: 'TransportScreen' },
      { id: 3, name: 'Medicine', icon: <MaterialCommunityIcons name="pill" size={28} color="white" />, color: '#7BB3F6', navigation: 'MedicineScreen' },
      { id: 4, name: 'Groceries', icon: <MaterialCommunityIcons name="shopping" size={24} color="white" />, color: '#7BB3F6', navigation: 'GroceriesScreen' },
      { id: 5, name: 'Rent', icon: <MaterialIcons name="vpn-key" size={24} color="white" />, color: '#7BB3F6', navigation: 'RentScreen' },
      { id: 6, name: 'Gifts', icon: <FontAwesome5 name="gift" size={24} color="white" />, color: '#7BB3F6', navigation: 'GiftsScreen' },
      { id: 7, name: 'Self Care', icon: <FontAwesome5 name="coins" size={24} color="white" />, color: '#7BB3F6', navigation: 'SelfCareScreen' },
      { id: 8, name: 'Entertainment', icon: <MaterialIcons name="movie-filter" size={24} color="white" />, color: '#7BB3F6', navigation: 'EntertainmentScreen' },
      { id: 9, name: 'More', icon: <Ionicons name="add" size={28} color="white" />, color: '#7BB3F6', navigation: 'MoreScreen', more: true },
   ]);





   const handleCategoryPress = (category) => {
      if (category.more) {
         setModalVisible(true);
      }
      if (category.navigation) {
         navigation.navigate('CategoriesNavigation', {
            id: category.id, name: category.name,
         });
      }
   };

   const addCategory = () => {
      if (newCategory.trim() !== "") {
         const newCategoryObj = {
            id: categories.length + 1,
            name: newCategory,
            icon: <Ionicons name="apps" size={24} color="white" />,
            color: '#FF8C00',
         };
         setCategories([...categories, newCategoryObj]);
         setNewCategory("");
         setModalVisible(false);
      }
   };


   const renderCategory = (category) => (
      <TouchableOpacity
         key={category.id}
         style={[styles.categoryItem, { backgroundColor: category.color }]}
         onPress={() => {
            if (category.more) {
               setModalVisible(true);
            } else {
               handleCategoryPress(category); // Call the function to navigate
            }
         }}
      >
         <View style={styles.categoryIconContainer}>
            {category.icon}
         </View>
         <Text style={styles.categoryName}>{category.name}</Text>
      </TouchableOpacity>
   );


   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00C48C" barStyle="light-content" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity>
               <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Categories</Text>
            <TouchableOpacity>
               <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
         </View>

         {/* Balance and Expense Section */}
         <View style={styles.balanceContainer}>
            <View style={styles.balanceRow}>
               <View style={styles.balanceItem}>
                  <View style={styles.balanceHeader}>
                     <MaterialCommunityIcons name="check-circle-outline" size={16} color="black" />
                     <Text style={styles.balanceLabel}>Total Balance</Text>
                  </View>
                  <Text style={styles.balanceAmount}>₹{totalBalance.toFixed(2)}</Text>
               </View>
               <View style={styles.divider} />
               <View style={styles.balanceItem}>
                  <View style={styles.balanceHeader}>
                     <MaterialCommunityIcons name="check-circle-outline" size={16} color="black" />
                     <Text style={styles.balanceLabel}>Total Expense</Text>
                  </View>
                  <Text style={[styles.balanceAmount, { color: '#FF3B30' }]}>-₹{totalExpense.toFixed(2)}</Text>
               </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBarContainer}>
               <View style={[styles.progressBar, { width: `${expensePercentage} %` }]} />
               <Text style={styles.progressText}>30%</Text>
            </View>
            <Text style={styles.maxBudget}>₹{maxBudget.toFixed(2)}</Text>

            <View style={styles.progressHint}>
               <MaterialCommunityIcons name="check-circle-outline" size={16} color="black" />
               <Text style={styles.hintText}>30% Of Your Expenses, Looks Good.</Text>
            </View>
         </View>


         {/* Categories Grid */}
         <LinearGradient
            colors={['#FFFFFF', '#F2F8F4']}
            style={styles.categoriesContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
         >
            <View style={styles.categoriesGrid}>
               {categories.map(category => renderCategory(category))}
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
               <TouchableOpacity style={styles.navItem}>
                  <Ionicons name="home-outline" size={24} color="black" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.navItem}>
                  <Ionicons name="wallet-outline" size={24} color="black" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.navItem}>
                  <Ionicons name="stats-chart" size={24} color="black" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.navItem}>
                  <Ionicons name="person-outline" size={24} color="black" />
               </TouchableOpacity>
            </View>
         </LinearGradient>

         {/* Modal for Adding Category */}
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Add New Category</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Enter category name"
                     placeholderTextColor="gray"
                     value={newCategory}
                     onChangeText={setNewCategory}
                  />
                  <View style={styles.modalButtons}>
                     <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={addCategory}>
                        <Text style={styles.modalButtonText}>Add</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
      </SafeAreaView>
   );
};
const styles = StyleSheet.create({
   container: {
      top: 30,
      flex: 1,
      backgroundColor: '#00C48C',
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
   },
   balanceContainer: {
      paddingHorizontal: 16,
      paddingBottom: 24,
   },
   balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
   },
   balanceItem: {
      flex: 1,
   },
   balanceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
   },
   balanceLabel: {
      marginLeft: 4,
      color: 'black',
      fontSize: 14,
   },
   balanceAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
   },
   divider: {
      width: 1,
      backgroundColor: '#E0E0E0',
      marginHorizontal: 16,
   },
   progressBarContainer: {
      height: 24,
      backgroundColor: '#E0E0E0',
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
   },
   progressBar: {
      height: '100%',
      backgroundColor: 'black',
      borderRadius: 12,
   },
   progressText: {
      position: 'absolute',
      left: 12,
      top: 4,
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
   },
   maxBudget: {
      alignSelf: 'flex-end',
      fontSize: 12,
      color: '#666',
      marginTop: 4,
   },
   progressHint: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
   },
   hintText: {
      marginLeft: 4,
      color: 'black',
      fontSize: 14,
   },
   categoriesContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 24,
      overflow: 'hidden',
   },
   categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
   },
   categoryItem: {
      width: '30%',
      aspectRatio: 1,
      borderRadius: 16,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
   },
   categoryIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
   },
   categoryName: {
      color: 'black',
      fontSize: 14,
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalView: {
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   input: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      paddingVertical: 5,
      marginBottom: 20,
      fontSize: 16,
   },
   modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
   },
   modalButton: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: '#ccc',
      marginHorizontal: 5,
   },
   addButton: {
      backgroundColor: '#00C48C',
   },
   modalButtonText: {
      color: 'white',
      fontSize: 16,
   },
   bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 16,
      backgroundColor: '#F2F8F4',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
   },
   navItem: {
      alignItems: 'center',
   },
});

export default App;
