import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';

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

   const handlePressIn = () => {
      Animated.spring(scaleAnim, {
         toValue: 0.9,
         useNativeDriver: true,
      }).start();
   };

   const handlePressOut = () => {
      Animated.spring(scaleAnim, {
         toValue: 1,
         useNativeDriver: true,
      }).start(() => {
         navigation.navigate('BOnBoarding');
      });
   };

   return (
      <View style={styles.container}>
         <View style={styles.topSection}>
            <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
               <Text style={styles.title}>Welcome To Expense Manager</Text>
            </Animated.View>
         </View>
         <View style={styles.bottomSection}>
            <Animated.Image
               source={require('../../img/OnBoardingimg1.png')}
               style={[styles.image, { opacity: fadeAnim }]}
            />
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
               <TouchableOpacity
                  style={styles.button}
                  onPressOut={handlePressOut}
                  onPressIn={handlePressIn}
               >
                  <Text style={styles.buttonText}>Next</Text>
               </TouchableOpacity>
            </Animated.View>
            <View style={styles.row}>
               <View style={[styles.dot, styles.activeDot]} />
               <View style={[styles.dot, styles.inactiveDot]} />
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
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      top: 30,
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
});
