import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AOnBoarding from './components/OnBoarding/1OnBoarding';
import BOnBoarding from './components/OnBoarding/2OnBoarding';
import LoginScreen from './components/Login_SignUp/LoginScreen';
import CreateAccountA from './components/Login_SignUp/CreateAccountA';
import CreateAccountB from './components/Login_SignUp/CreateAccountB';
import CreateAccountC from './components/Login_SignUp/CreateAccountC';
import Home from './components/HomePage/Home'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Hide Status Bar (Top Notch Area) */}
      {/* <StatusBar /> */}

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Smooth slide animation
        }}
      >
        {/* <Stack.Screen name="AOnBoarding" component={AOnBoarding} />
        <Stack.Screen name="BOnBoarding" component={BOnBoarding} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CreateAccountA" component={CreateAccountA} />
        <Stack.Screen name="CreateAccountB" component={CreateAccountB} />
        <Stack.Screen name='CreateAccountC' component={CreateAccountC} /> */}
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
