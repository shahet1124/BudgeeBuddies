import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';

export default function BOnBoarding({ navigation }) {
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const dotAnim = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.timing(fadeAnim, {
         toValue: 1,
         duration: 800,
         useNativeDriver: true,
      }).start();

      Animated.timing(dotAnim, {
         toValue: 1,
         duration: 600,
         useNativeDriver: true,
      }).start();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.topSection}>
            <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
               <Text style={styles.title}>Are you ready to take control of your finances?</Text>
            </Animated.View>
         </View>
         <View style={styles.bottomSection}>
            <Animated.Image source={require('../../img/OnBoardingimg2.png')} style={[styles.image, { opacity: fadeAnim }]} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
               <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <View style={styles.row}>
               <Animated.View style={[styles.dot, styles.inactiveDot, { opacity: dotAnim }]} />
               <Animated.View style={[styles.dot, styles.activeDot, { opacity: dotAnim }]} />
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
      resizeMode: 'contain',
      alignSelf: 'center',
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
      fontWeight: 'bold'
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
