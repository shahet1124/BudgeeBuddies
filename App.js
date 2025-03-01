import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AOnBoarding from './components/OnBoarding/1OnBoarding';
import BOnBoarding from './components/OnBoarding/2OnBoarding';
import LoginScreen from './components/Login_SignUp/LoginScreen';
import LinearGradient from "react-native-linear-gradient";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Hide Status Bar (Top Notch Area) */}
      <StatusBar />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Smooth slide animation
        }}
      >
        <Stack.Screen name="AOnBoarding" component={AOnBoarding} />
        <Stack.Screen name="BOnBoarding" component={BOnBoarding} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
