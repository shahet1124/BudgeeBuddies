import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function AnalysisScreen() {
   const [timeFrame, setTimeFrame] = useState('Daily');

   // Chart data
   const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
         {
            data: [7, 2, 5, 4, 10, 1, 5.5],
            color: (opacity = 1) => rgba(0, 204, 153, `${opacity}`),
            strokeWidth: 2
         },
         {
            data: [1, 0, 0.5, 0, 0.5, 0.5, 0],
            color: (opacity = 1) => rgba(66, 133, 244, `${opacity}`),
            strokeWidth: 2
         }
      ],
   };

   const chartConfig = {
      backgroundGradientFrom: '#f0f9f4',
      backgroundGradientTo: '#f0f9f4',
      decimalPlaces: 0,
      color: (opacity = 1) => rgba(0, 0, 0, `${opacity}`),
      labelColor: (opacity = 1) => rgba(128, 128, 128, `${opacity}`),
      style: {
         borderRadius: 16,
      },
      barPercentage: 0.5,
   };

   return (
      <View style={styles.container}>
         <StatusBar style="light" backgroundColor="#00CC99" />

         {/* Header */}
         <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton}>
               <Ionicons name="menu-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Analysis</Text>
            <View style={{ width: 24 }} /> {/* Empty view for alignment */}
         </View>

         {/* Balance and Expense Section */}
         <View style={styles.balanceSection}>
            <View style={styles.balanceRow}>
               <View style={styles.balanceItem}>
                  <View style={styles.balanceLabel}>
                     <Ionicons name="checkbox-outline" size={16} color="black" />
                     <Text style={styles.balanceLabelText}>Total Balance</Text>
                  </View>
                  <Text style={styles.balanceValue}>₹7,783.00</Text>
               </View>

               <View style={styles.divider} />

               <View style={styles.balanceItem}>
                  <View style={styles.balanceLabel}>
                     <Ionicons name="checkbox-outline" size={16} color="black" />
                     <Text style={styles.balanceLabelText}>Total Expense</Text>
                  </View>
                  <Text style={[styles.balanceValue, styles.expenseText]}>-₹1,187.40</Text>
               </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
               <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
               </View>
               <Text style={styles.progressText}>₹20,000.00</Text>
            </View>
            <View style={styles.progressLabelContainer}>
               <Ionicons name="checkbox-outline" size={16} color="black" />
               <Text style={styles.progressLabelText}>30% Of Your Expenses, Looks Good.</Text>
            </View>
         </View>

         <ScrollView style={styles.content}>
            {/* Time Frame Selector */}
            <View style={styles.timeFrameContainer}>
               {['Daily', 'Weekly', 'Monthly', 'Year'].map((item) => (
                  <TouchableOpacity
                     key={item}
                     style={[
                        styles.timeFrameButton,
                        timeFrame === item && styles.timeFrameButtonActive
                     ]}
                     onPress={() => setTimeFrame(item)}
                  >
                     <Text
                        style={[
                           styles.timeFrameText,
                           timeFrame === item && styles.timeFrameTextActive
                        ]}
                     >
                        {item}
                     </Text>
                  </TouchableOpacity>
               ))}
            </View>

            {/* Income & Expenses Chart */}
            <View style={styles.chartContainer}>
               <View style={styles.chartHeader}>
                  <Text style={styles.chartTitle}>Income & Expenses</Text>
                  <View style={styles.chartIcons}>
                     <TouchableOpacity style={styles.iconButton}>
                        <AntDesign name="calendar" size={20} color="black" />
                     </TouchableOpacity>
                  </View>
               </View>

               <View style={styles.chartLegend}>
                  <Text style={styles.legendText}>15k</Text>
                  <Text style={styles.legendText}>10k</Text>
                  <Text style={styles.legendText}>5k</Text>
                  <Text style={styles.legendText}>1k</Text>
               </View>

               <BarChart
                  data={data}
                  width={screenWidth - 40}
                  height={170}
                  chartConfig={chartConfig}
                  style={styles.chart}
                  showBarTops={false}
                  fromZero
                  withInnerLines={false}
                  showValuesOnTopOfBars={false}
               />
            </View>

            {/* Income and Expense Summary */}
            <View style={styles.summaryContainer}>
               <View style={styles.summaryItem}>
                  <View style={styles.summaryIconContainer}>
                     <AntDesign name="arrowup" size={20} color="#00CC99" />
                  </View>
                  <Text style={styles.summaryLabel}>Income</Text>
                  <Text style={styles.summaryValue}>₹4,120.00</Text>
               </View>

               <View style={styles.summaryItem}>
                  <View style={[styles.summaryIconContainer, styles.expenseIcon]}>
                     <AntDesign name="arrowdown" size={20} color="#4285F4" />
                  </View>
                  <Text style={styles.summaryLabel}>Expense</Text>
                  <Text style={[styles.summaryValue, styles.expenseText]}>₹1,187.40</Text>
               </View>
            </View>
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00CC99',
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 20,
   },
   menuButton: {
      padding: 4,
   },
   headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
   },
   balanceSection: {
      paddingHorizontal: 16,
      paddingBottom: 20,
   },
   balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
   },
   balanceItem: {
      flex: 1,
   },
   balanceLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
   },
   balanceLabelText: {
      marginLeft: 6,
      fontSize: 14,
      color: 'black',
   },
   balanceValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
   },
   expenseText: {
      color: '#4285F4',
   },
   divider: {
      width: 1,
      height: 40,
      backgroundColor: 'rgba(0,0,0,0.1)',
      marginHorizontal: 15,
   },
   progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
   },
   progressBar: {
      flex: 1,
      height: 20,
      backgroundColor: '#E0E0E0',
      borderRadius: 10,
      overflow: 'hidden',
      marginRight: 10,
   },
   progressFill: {
      width: '30%',
      height: '100%',
      backgroundColor: 'black',
      borderRadius: 10,
   },
   progressText: {
      fontSize: 14,
      fontWeight: 'bold',
   },
   progressLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   progressLabelText: {
      marginLeft: 6,
      fontSize: 14,
      color: 'black',
   },
   content: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
   },
   timeFrameContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
      backgroundColor: '#f0f9f4',
      borderRadius: 30,
      padding: 5,
   },
   timeFrameButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 25,
   },
   timeFrameButtonActive: {
      backgroundColor: '#00CC99',
   },
   timeFrameText: {
      fontSize: 14,
      color: 'gray',
   },
   timeFrameTextActive: {
      color: 'black',
      fontWeight: 'bold',
   },
   chartContainer: {
      marginHorizontal: 20,
      marginTop: 20,
      padding: 16,
      borderRadius: 24,
      backgroundColor: '#f0f9f4',
   },
   chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
   },
   chartTitle: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   chartIcons: {
      flexDirection: 'row',
   },
   iconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00CC99',
      marginLeft: 8,
   },
   chartLegend: {
      position: 'absolute',
      left: 16,
      top: 50,
      height: 150,
      justifyContent: 'space-between',
      zIndex: 1,
   },
   legendText: {
      fontSize: 12,
      color: 'gray',
   },
   chart: {
      marginLeft: 30,
      borderRadius: 16,
   },
   summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginVertical: 20,
   },
   summaryItem: {
      flex: 1,
      alignItems: 'center',
   },
   summaryIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 204, 153, 0.15)',
      marginBottom: 5,
   },
   expenseIcon: {
      backgroundColor: 'rgba(66, 133, 244, 0.15)',
   },
   summaryLabel: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 5,
   },
   summaryValue: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   targetsContainer: {
      marginHorizontal: 20,
      marginBottom: 30,
      padding: 16,
      borderRadius: 24,
      backgroundColor: '#f0f9f4',
   },
   targetsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 16,
   },
   targetIcons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   targetIcon: {
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 28,
      backgroundColor: 'white',
   },
});