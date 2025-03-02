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

   const categories = [
      { id: 1, name: 'Food', icon: <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="white" />, color: '#7BB3F6', navigation: 'CategoriesNavigation' },
      { id: 2, name: 'Transport', icon: <FontAwesome5 name="bus" size={24} color="white" />, color: '#7BB3F6', navigation: 'TransportScreen' },
      { id: 3, name: 'Medicine', icon: <MaterialCommunityIcons name="pill" size={28} color="white" />, color: '#7BB3F6', navigation: 'MedicineScreen' },
      { id: 4, name: 'Groceries', icon: <MaterialCommunityIcons name="shopping" size={24} color="white" />, color: '#7BB3F6', navigation: 'GroceriesScreen' },
      { id: 5, name: 'Rent', icon: <MaterialIcons name="vpn-key" size={24} color="white" />, color: '#7BB3F6', navigation: 'RentScreen' },
      { id: 6, name: 'Gifts', icon: <FontAwesome5 name="gift" size={24} color="white" />, color: '#7BB3F6', navigation: 'GiftsScreen' },
      { id: 7, name: 'Self Care', icon: <FontAwesome5 name="coins" size={24} color="white" />, color: '#7BB3F6', navigation: 'SelfCareScreen' },
      { id: 8, name: 'Entertainment', icon: <MaterialIcons name="movie-filter" size={24} color="white" />, color: '#7BB3F6', navigation: 'EntertainmentScreen' },
      { id: 9, name: 'More', icon: <Ionicons name="add" size={28} color="white" />, color: '#7BB3F6', navigation: 'MoreScreen', more: true },
   ]

   const handleCategoryPress = (category) => {
      if (category.navigation) {
         navigation.navigate('CategoriesNavigation', {
            name: category.name,
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