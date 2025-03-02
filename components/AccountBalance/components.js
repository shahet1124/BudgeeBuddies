import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Common Header Component
export const Header = ({ navigation }) => {
   return (
      <View style={styles.header}>
         <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
         >
            <Ionicons name="arrow-back" size={24} color="black" />
         </TouchableOpacity>
      </View>
   );
};

// Primary Button Component
export const PrimaryButton = ({ title, onPress, style }) => {
   return (
      <TouchableOpacity
         style={[styles.primaryButton, style]}
         onPress={onPress}
      >
         <Text style={styles.primaryButtonText}>{title}</Text>
      </TouchableOpacity>
   );
};

// Common Content Container
export const ContentContainer = ({ children, style }) => {
   return (
      <View style={[styles.contentContainer, style]}>
         {children}
      </View>
   );
};

const styles = StyleSheet.create({
   header: {
      padding: 16,
   },
   backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
   },
   contentContainer: {
      flex: 1,
      backgroundColor: '#f9f9f7',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
   },
   primaryButton: {
      backgroundColor: '#00C389',
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
   },
   primaryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
   },
});