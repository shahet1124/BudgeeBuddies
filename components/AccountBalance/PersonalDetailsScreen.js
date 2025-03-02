import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, ContentContainer, PrimaryButton } from './components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import axios from 'axios';

const PersonalDetailsScreen = ({ navigation }) => {
   const [fullName, setName] = useState('');
   const [gender, setGender] = useState('');
   const [dateOfBirth, setDate] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [pincode, setPincode] = useState('');
   const [isDatePickerVisible, setDatePickerVisible] = useState(false);

   const showDatePicker = () => {
      setDatePickerVisible(true);
   };

   const hideDatePicker = () => {
      setDatePickerVisible(false);
   };

   const handleConfirm = (selectedDate) => {
      setDate(format(selectedDate, 'dd / MM / yyyy'));
      hideDatePicker();
   };

   const handleNext = () => {
      navigation.navigate('WalletID');
   };

   return (

      <SafeAreaView style={styles.container}>
         <Header navigation={navigation} />

         <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <ContentContainer style={styles.contentContainer}>
               <View style={styles.content}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Example"
                     placeholderTextColor="#999"
                     value={fullName}
                     onChangeText={setName}
                  />

                  <Text style={styles.label}>Gender</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Gender"
                     placeholderTextColor="#999"
                     value={gender}
                     onChangeText={setGender}
                  />

                  <Text style={styles.label}>Date Of Birth</Text>
                  <TouchableOpacity onPress={showDatePicker}>
                     <TextInput
                        style={styles.input}
                        placeholder="DD / MM / YYYY"
                        placeholderTextColor="#999"
                        value={dateOfBirth}
                        editable={false}
                     />
                  </TouchableOpacity>

                  <DateTimePickerModal
                     isVisible={isDatePickerVisible}
                     mode="date"
                     onConfirm={handleConfirm}
                     onCancel={hideDatePicker}
                  />

                  <Text style={styles.label}>Address</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Address"
                     placeholderTextColor="#999"
                     value={address}
                     onChangeText={setAddress}
                  />

                  <View style={styles.rowContainer}>
                     <View style={styles.cityContainer}>
                        <Text style={styles.label}>City</Text>
                        <View style={styles.dropdown}>
                           <TextInput
                              style={styles.dropdownInput}
                              placeholder="City"
                              placeholderTextColor="#999"
                              value={city}
                              onChangeText={setCity}
                           />
                           <Text style={styles.dropdownIcon}>▼</Text>
                        </View>
                     </View>

                     <View style={styles.pincodeContainer}>
                        <Text style={styles.label}>Pincode</Text>
                        <TextInput
                           style={styles.input}
                           placeholder="Code"
                           placeholderTextColor="#999"
                           keyboardType="number-pad"
                           value={pincode}
                           onChangeText={setPincode}
                           maxLength={6}
                        />
                     </View>
                  </View>

                  <View style={styles.buttonContainer}>
                     <PrimaryButton title="Next" onPress={handleNext} style={styles.nextButton} />
                  </View>
               </View>
            </ContentContainer>
         </ScrollView>
      </SafeAreaView>

   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00C389',
   },
   contentContainer: {
      padding: 15,
   },
   scrollViewContent: {
      flexGrow: 1,
      paddingBottom: 0, // Adds extra space at the bottom to prevent cut-off
   },
   content: {
      flex: 1,
   },
   label: {
      fontSize: 14,
      marginBottom: 5,
      color: '#555',
      fontWeight: '500',
   },
   input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: '#f5f5f5',
      fontSize: 16,
      marginBottom: 15,
   },
   rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   cityContainer: {
      flex: 1,
      marginRight: 10,
   },
   pincodeContainer: {
      flex: 1,
      marginLeft: 10,
   },
   dropdown: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
   },
   dropdownInput: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 15,
      fontSize: 16,
   },
   dropdownIcon: {
      paddingRight: 15,
      color: '#777',
      fontSize: 12,
   },
   buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 20,
   },
   nextButton: {
      width: '35%',
      alignSelf: 'center',
   },
});

export default PersonalDetailsScreen;