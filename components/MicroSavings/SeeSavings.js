import React, { useMemo } from 'react';
import {
   StyleSheet,
   View,
   Text,
   SafeAreaView,
   TouchableOpacity,
   StatusBar,
   ScrollView,
   Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Extracted components for better organization and reusability
const ProgressCircle = ({ progress, size, strokeWidth }) => {
   const radius = (size - strokeWidth) / 2;
   const circumference = radius * 2 * Math.PI;
   const progressValue = circumference - (progress / 100) * circumference;

   return (
      <Svg width={size} height={size}>
         <Circle
            stroke="#E0E0E0"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
         />
         <Circle
            stroke="#147efb"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={progressValue}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
         />
      </Svg>
   );
};

const TransactionItem = ({ transaction }) => (
   <View style={styles.transactionItem}>
      <View style={styles.transactionIconContainer}>
         <View
            style={[
               styles.transactionIconBackground,
               { backgroundColor: transaction.iconBackground },
            ]}
         >
            <FontAwesome5
               name={transaction.icon}
               size={20}
               color={transaction.iconColor}
            />
         </View>
      </View>

      <View style={styles.transactionDetails}>
         <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>{transaction.type}</Text>
            <Text
               style={[
                  styles.transactionAmount,
                  transaction.amount >= 0
                     ? styles.positiveAmount
                     : styles.negativeAmount,
               ]}
            >
               {transaction.amount >= 0 ? '' : '- '}₹
               {Math.abs(transaction.amount).toFixed(2)}
            </Text>
         </View>
         <View style={styles.transactionSubHeader}>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
            <Text style={styles.transactionCategory}>{transaction.category}</Text>
         </View>
      </View>
   </View>
);

const SeeSavings = ({ navigation }) => {
   // Memoized data to prevent unnecessary re-renders
   const barData = useMemo(() => ({
      labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
      datasets: [
         {
            data: [800, 1500, 5200, 2000],
            colors: [
               (opacity = 1) => '#147efb',
               (opacity = 1) => '#147efb',
               (opacity = 1) => '#147efb',
               (opacity = 1) => '#00c89c',
            ],
         },
      ],
   }), []);

   // Memoized transactions data
   const transactions = useMemo(() => [
      {
         id: 1,
         type: 'Salary',
         date: '18:27 - April 30',
         category: 'Monthly',
         amount: 4000.0,
         icon: 'money-bill-wave',
         iconColor: '#5295e3',
         iconBackground: '#a7c8f7',
      },
      {
         id: 2,
         type: 'Groceries',
         date: '17:00 - April 24',
         category: 'Pantry',
         amount: -100.0,
         icon: 'shopping-basket',
         iconColor: '#5295e3',
         iconBackground: '#a7c8f7',
      },
      {
         id: 3,
         type: 'Rent',
         date: '8:30 - April 15',
         category: 'Rent',
         amount: -674.4,
         icon: 'key',
         iconColor: '#5295e3',
         iconBackground: '#a7c8f7',
      },
   ], []);

   // Memoized chart config to prevent recreation on each render
   const chartConfig = useMemo(() => ({
      backgroundColor: '#f7fafc',
      backgroundGradientFrom: '#f7fafc',
      backgroundGradientTo: '#f7fafc',
      decimalPlaces: 0,
      color: (opacity = 1, index) => {
         return index < 3 ? '#147efb' : '#00c89c';
      },
      labelColor: () => '#a0aec0',
      style: {
         borderRadius: 16,
      },
      propsForBackgroundLines: {
         strokeDasharray: '5, 5',
         stroke: '#e2e8f0',
      },
      propsForLabels: {
         fontSize: 10,
      },
   }), []);

   // Handlers
   const handleBackPress = () => navigation.goBack();

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#00c89c" barStyle="light-content" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Savings</Text>
         </View>

         <ScrollView showsVerticalScrollIndicator={false}>
            {/* Summary Section */}
            <View style={styles.summaryContainer}>
               {/* Progress Circle */}
               <View style={styles.progressContainer}>
                  <View style={styles.progressCircleContainer}>
                     <ProgressCircle progress={35} size={120} strokeWidth={10} />
                     <View style={styles.carIconContainer}>
                        <Ionicons name="car-outline" size={40} color="#000" />
                     </View>
                  </View>
                  <Text style={styles.savingsLabel}>Savings</Text>
                  <Text style={styles.goalsLabel}>On Goals</Text>
               </View>

               {/* Summary Cards */}
               <View style={styles.summaryCardsContainer}>
                  {/* Revenue Card */}
                  <View style={styles.summaryCard}>
                     <View style={styles.cardIconContainer}>
                        <MaterialCommunityIcons name="stack-exchange" size={24} color="#000" />
                     </View>
                     <Text style={styles.cardLabel}>Revenue Last Week</Text>
                     <Text style={styles.positiveAmount}>₹4000.00</Text>
                  </View>

                  <View style={styles.divider} />

                  {/* Food Card */}
                  <View style={styles.summaryCard}>
                     <View style={styles.cardIconContainer}>
                        <Ionicons name="restaurant-outline" size={24} color="#000" />
                     </View>
                     <Text style={styles.cardLabel}>Food Last Week</Text>
                     <Text style={styles.negativeAmount}>- ₹100.00</Text>
                  </View>
               </View>
            </View>

            {/* Chart Section */}
            <View style={styles.chartContainer}>
               <Text style={styles.chartTitle}>April Expenses</Text>
               <BarChart
                  data={barData}
                  width={width - 40}
                  height={200}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={chartConfig}
                  showBarTops={false}
                  showValuesOnTopOfBars={false}
                  withInnerLines={true}
                  fromZero={true}
                  style={styles.chart}
               />
            </View>

            {/* Transactions List */}
            <View style={styles.transactionsContainer}>
               {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
               ))}
            </View>
         </ScrollView>

         {/* Bottom Navigation */}
         <View style={styles.bottomNavigation}>
            <TouchableOpacity style={styles.navItem}>
               <Ionicons name="home-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
               <Ionicons name="wallet-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
               <Ionicons name="stats-chart" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
               <Ionicons name="person-outline" size={24} color="#666" />
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
};

// Styles moved outside component and optimized
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f7fafc',
   },
   header: {
      backgroundColor: '#00c89c',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 15,
   },
   backButton: {
      marginRight: 10,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
   },
   summaryContainer: {
      backgroundColor: '#00c89c',
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   progressContainer: {
      alignItems: 'center',
      width: '35%',
   },
   progressCircleContainer: {
      position: 'relative',
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
   },
   carIconContainer: {
      position: 'absolute',
   },
   savingsLabel: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 10,
   },
   goalsLabel: {
      color: 'white',
      fontSize: 14,
   },
   summaryCardsContainer: {
      flex: 1,
      marginLeft: 20,
      justifyContent: 'center',
   },
   summaryCard: {
      marginBottom: 10,
   },
   cardIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   cardLabel: {
      color: 'white',
      fontSize: 14,
      marginTop: 5,
   },
   positiveAmount: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
   },
   negativeAmount: {
      color: '#ff6666',
      fontWeight: 'bold',
      fontSize: 18,
   },
   divider: {
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.3)',
      marginVertical: 10,
   },
   chartContainer: {
      backgroundColor: '#f7fafc',
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
   },
   chart: {
      marginVertical: 8,
      borderRadius: 16,
   },
   chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   transactionsContainer: {
      marginHorizontal: 20,
      marginVertical: 15,
   },
   transactionItem: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
   },
   transactionIconContainer: {
      marginRight: 15,
   },
   transactionIconBackground: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      justifyContent: 'center',
      alignItems: 'center',
   },
   transactionDetails: {
      flex: 1,
   },
   transactionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
   },
   transactionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   transactionSubHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   transactionDate: {
      fontSize: 12,
      color: '#a0aec0',
   },
   transactionCategory: {
      fontSize: 12,
      color: '#a0aec0',
   },
   bottomNavigation: {
      flexDirection: 'row',
      backgroundColor: '#f0f4f9',
      paddingVertical: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 5,
   },
   navItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
   },
   activeNavItem: {
      backgroundColor: '#00c89c',
      borderRadius: 25,
      marginHorizontal: 10,
      marginTop: -15,
      width: 50,
      height: 50,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
   },
});

export default SeeSavings;