import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, TextInput, } from 'react-native';

export default function AOnBoarding({ navigation }) {
   const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animation
   const scaleAnim = useRef(new Animated.Value(1)).current; // Scale animation for button

   useEffect(() => {
      Animated.timing(fadeAnim, {
         toValue: 1,
         duration: 800,
         useNativeDriver: true,
      }).start();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.topSection}>
            <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
               <Text style={styles.title}>Welcome </Text>
            </Animated.View>
         </View>
         <View style={styles.bottomSection}>
            <View style={styles.inputeTextcontainer}>
               <Text>Username or Email</Text>
               <TextInput
                  style={styles.input}
                  placeholder="example@example.com"
                  placeholderTextColor="#A6DAB1" // Change color for better visibility
                  textAlign="center" // Center align placeholder text
               />
            </View>

         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: '#00D0A0' },
   topSection: { height: '30%', justifyContent: 'center', alignItems: 'center' },
   innerContainer: { width: '90%', alignSelf: 'center' },
   bottomSection: {
      flex: 1,
      backgroundColor: '#F5FFF5',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center'
   },
   image: {
      width: 250,
      height: 250,
      resizeMode: 'contain'
   },
   button: {
      marginTop: 20,
      backgroundColor: '#00D0A0',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 10
   },
   buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
   },
   dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginHorizontal: 5
   },
   activeDot: {
      backgroundColor: '#00D0A0'
   },
   inactiveDot: {
      borderWidth: 2,
      borderColor: '#003D3D',
      backgroundColor: 'transparent'
   },
   input: {
      backgroundColor: "#DFF7E2",
      borderRadius: 16,
      paddingHorizontal: 80,
      // paddingVertical: 30,
   },
   inputeTextcontainer: {

   }
});
