import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AOnBoarding from './components/OnBoarding/1OnBoarding';
import BOnBoarding from './components/OnBoarding/2OnBoarding';
import LoginScreen from './components/Login_SignUp/LoginScreen';
import CreateAccountA from './components/Login_SignUp/CreateAccountA';
import CreateAccountB from './components/Login_SignUp/CreateAccountB';
import CreateAccountC from './components/Login_SignUp/CreateAccountC';
import Home from './components/HomePage/Home'
import AddIncome from './components/HomePage/AddIncome'
import AddExpenses from './components/HomePage/AddExpenses';
import TransactionsA from './components/Transactions/TransactionsA';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionsIncome from './components/Transactions/TransactionsIncome';
import TransactionsExpense from './components/Transactions/TransactionsExpense';
import CategoriesA from './components/Categories/CategoriesA';
import FoodScreen from './components/FoodScreen';
import CategoriesNavigation from './components/Categories/CategoriesNavigation'
import AddExpensesCategories from './components/Categories/AddExpensesCategories';
import MicroSavingsA from './components/MicroSavings/MicroSavingsA';
import AddGoal from './components/MicroSavings/AddGoal';
import MicroSavingsB from './components/MicroSavings/MicroSavingsB';
import ManageMicroSavings from './components/MicroSavings/ManageMicroSavings';
import WithdrawSavingsScreen from './components/MicroSavings/WithdarwSavings';
import UpiWalletPin from './components/MicroSavings/UpiWalletPin';
import SeeSavings from './components/MicroSavings/SeeSavings';
import WelcomeScreen from './components/AccountBalance/WelcomeScreen';
import MobileNumberScreen from './components/AccountBalance/MobileNumberScreen';
import OTPVerificationScreen from './components/AccountBalance/OTPVerificationScreen';
import PersonalDetailsScreen from './components/AccountBalance/PersonalDetailsScreen';
import WalletIDScreen from './components/AccountBalance/WalletIDScreen';
import IdentityProofScreen from './components/AccountBalance/IdentityProofScreen';
import WalletBalanceA from './components/WalletBalance/WalletBalanceA';
import UpiWalletPin2 from './components/AccountBalance/UpiWalletPin2';
import TopUpWallet from './components/WalletBalance/TopUpWallet';
import UpiWalletPin3 from './components/WalletBalance/UpiWalletPin3';
import WithdrawMoney from './components/WalletBalance/WithdrawMoney';
import UpiWalletPin4 from './components/WalletBalance/UpiWalletPin4';

// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >

        <Stack.Screen name="AOnBoarding" component={AOnBoarding} />
        <Stack.Screen name="BOnBoarding" component={BOnBoarding} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CreateAccountA" component={CreateAccountA} />
        <Stack.Screen name="CreateAccountB" component={CreateAccountB} />
        <Stack.Screen name="CreateAccountC" component={CreateAccountC} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='AddIncome' component={AddIncome} />
        <Stack.Screen name='AddExpenses' component={AddExpenses} />


        <Stack.Screen name='CategoriesA' component={CategoriesA} />
        <Stack.Screen name='CategoriesNavigation' component={CategoriesNavigation} />
        <Stack.Screen name="AddExpensesCategories" component={AddExpensesCategories} />


        <Stack.Screen name='MicroSavingsA' component={MicroSavingsA} />
        <Stack.Screen name='AddGoal' component={AddGoal} />
        <Stack.Screen name='MicroSavingsB' component={MicroSavingsB} />
        <Stack.Screen name='ManageMicroSavings' component={ManageMicroSavings} />
        <Stack.Screen name='WithdrawSavings' component={WithdrawSavingsScreen} />
        <Stack.Screen name='SeeSavings' component={SeeSavings} />

        <Stack.Screen name='UpiWalletPin' component={UpiWalletPin} />

        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
        <Stack.Screen name="WalletID" component={WalletIDScreen} />
        <Stack.Screen name="IdentityProof" component={IdentityProofScreen} />
        <Stack.Screen name="UpiWalletPin2" component={UpiWalletPin2} />

        <Stack.Screen name='TransactionsA' component={TransactionsA} />
        <Stack.Screen name='TransactionsIncome' component={TransactionsIncome} />
        <Stack.Screen name='TransactionsExpense' component={TransactionsExpense} />

        <Stack.Screen name="WalletBalanceA" component={WalletBalanceA} />
        <Stack.Screen name='TopUpWallet' component={TopUpWallet} />
        <Stack.Screen name='UpiWalletPin3' component={UpiWalletPin3} />
        <Stack.Screen name="WithdrawMoney" component={WithdrawMoney} />
        <Stack.Screen name='UpiWalletPin4' component={UpiWalletPin4} />



      </Stack.Navigator>
    </NavigationContainer >

  );
}
