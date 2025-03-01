import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   SafeAreaView,
   KeyboardAvoidingView,
   Platform,
   TouchableWithoutFeedback,
   Keyboard,
   ScrollView,
   Dimensions,
   Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const { width, height } = Dimensions.get('window');

export default function CreateAccountA() {
   const navigation = useNavigation();
   // Form state
   const [fullName, setFullName] = useState('');
   const [mobileNumber, setMobileNumber] = useState();
   const [dateOfBirth, setDateOfBirth] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [pincode, setPincode] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   // UI state
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [hidePassword, setHidePassword] = useState(true);
   const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
   const [showCityDropdown, setShowCityDropdown] = useState(false);

   // Validation state
   const [errors, setErrors] = useState({
      fullName: '',
      mobileNumber: '',
      dateOfBirth: '',
      address: '',
      city: '',
      pincode: '',
      password: '',
      confirmPassword: '',
   });

   // City options for dropdown
   const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];

   const validateFullName = (name) => {
      if (!name.trim()) {
         return 'Full name is required';
      } else if (name.trim().length < 3) {
         return 'Name must be at least 3 characters';
      }
      return '';
   };

   const validateMobileNumber = (number) => {
      // Basic validation for Indian mobile numbers
      const mobileRegex = /^\+\s?91\s?[6-9]\d{9}$/;
      const cleanedNumber = number.replace(/\s+/g, '');

      if (number === '+ 91 XXXXX XXXXX' || !number.trim()) {
         return 'Mobile number is required';
      } else if (!mobileRegex.test(cleanedNumber)) {
         return 'Please enter a valid 10-digit mobile number';
      }
      return '';
   };

   const validateDateOfBirth = (dob) => {
      if (!dob) {
         return 'Date of birth is required';
      }

      // Check if user is at least 18 years old
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }

      if (age < 18) {
         return 'You must be at least 18 years old';
      }

      return '';
   };

   const validateAddress = (address) => {
      if (!address.trim()) {
         return 'Address is required';
      } else if (address.trim().length < 10) {
         return 'Please enter a complete address';
      }
      return '';
   };

   const validateCity = (city) => {
      if (!city.trim()) {
         return 'City is required';
      }
      return '';
   };

   const validatePincode = (pincode) => {
      // Validate Indian PIN code format (6 digits)
      const pincodeRegex = /^\d{6}$/;

      if (!pincode.trim()) {
         return 'PIN code is required';
      } else if (!pincodeRegex.test(pincode)) {
         return 'Please enter a valid 6-digit PIN code';
      }
      return '';
   };

   const validatePassword = (password) => {
      if (!password) {
         return 'Password is required';
      } else if (password.length < 8) {
         return 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(password)) {
         return 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(password)) {
         return 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(password)) {
         return 'Password must contain at least one number';
      } else if (!/[!@#$%^&*]/.test(password)) {
         return 'Password must contain at least one special character';
      }
      return '';
   };

   const validateConfirmPassword = (confirmPassword) => {
      if (!confirmPassword) {
         return 'Please confirm your password';
      } else if (confirmPassword !== password) {
         return 'Passwords do not match';
      }
      return '';
   };

   const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
         setDateOfBirth(selectedDate.toISOString().split('T')[0]);
         validateField('dateOfBirth', selectedDate.toISOString().split('T')[0]);
      }
   };

   const openDatePicker = () => {
      Keyboard.dismiss();
      setShowDatePicker(true);
   };

   const handleCitySelect = (cityName) => {
      setCity(cityName);
      setShowCityDropdown(false);
      validateField('city', cityName);
   };

   const validateField = (field, value) => {
      let errorMessage = '';

      switch (field) {
         case 'fullName':
            errorMessage = validateFullName(value);
            break;
         case 'mobileNumber':
            errorMessage = validateMobileNumber(value);
            break;
         case 'dateOfBirth':
            errorMessage = validateDateOfBirth(value);
            break;
         case 'address':
            errorMessage = validateAddress(value);
            break;
         case 'city':
            errorMessage = validateCity(value);
            break;
         case 'pincode':
            errorMessage = validatePincode(value);
            break;
         case 'password':
            errorMessage = validatePassword(value);
            break;
         case 'confirmPassword':
            errorMessage = validateConfirmPassword(value);
            break;
         default:
            break;
      }

      setErrors(prev => ({
         ...prev,
         [field]: errorMessage
      }));

      return errorMessage === '';
   };

   const validateForm = () => {
      const nameValid = validateField('fullName', fullName);
      const mobileValid = validateField('mobileNumber', mobileNumber);
      const dobValid = validateField('dateOfBirth', dateOfBirth);
      const addressValid = validateField('address', address);
      const cityValid = validateField('city', city);
      const pincodeValid = validateField('pincode', pincode);
      const passwordValid = validateField('password', password);
      const confirmPasswordValid = validateField('confirmPassword', confirmPassword);

      return nameValid && mobileValid && dobValid && addressValid &&
         cityValid && pincodeValid && passwordValid && confirmPasswordValid;
   };

   const handleGetOTP = () => {
      const mobileValid = validateField('mobileNumber', mobileNumber);
      if (mobileValid) {
         Alert.alert("OTP Sent", "A verification code has been sent to your mobile number.");
         // Here you would implement actual OTP sending functionality
      }
   };

   const handleNext = async () => {
      if (validateForm()) {
         // Form is valid, proceed to API call
         const userData = {
            fullName,
            mobileNumber,
            dateOfBirth,
            address,
            city,
            pincode,
            password
         };
         console.log(userData);
         try {
            const response = await axios.post('http://192.168.178.65:3000/api/users/register', userData, {
               headers: {
                  'Content-Type': 'application/json'
               }
            });

            if (response.status === 201) {
               Alert.alert("Success", "Account created successfully!");
               console.log("Server Response:", response.data);

               // Navigate to the next screen
               navigation.navigate('CreateAccountB');
            } else {
               Alert.alert("Error", "Something went wrong. Please try again.");
            }
         } catch (error) {
            console.error("API Error:", error);
            Alert.alert("Error", "Failed to create an account. Please check your internet connection.");
         }
      } else {
         // Show error message
         Alert.alert("Validation Error", "Please check the form for errors.");
      }
   };

   const formatDate = (dateString) => {
      if (!dateString) return 'DD / MM / YYY';
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day} / ${month} / ${year}`;
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
         >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <View style={styles.headerContainer}>
                     <Text style={styles.headerText}>Create Account</Text>
                  </View>

                  <View style={styles.formContainer}>
                     {/* Full Name Input */}
                     <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput
                           style={[styles.input, errors.fullName ? styles.inputError : null]}
                           placeholder="Example"
                           placeholderTextColor="#A7A7A7"
                           value={fullName}
                           onChangeText={(text) => {
                              setFullName(text);
                              if (errors.fullName) validateField('fullName', text);
                           }}
                           onBlur={() => validateField('fullName', fullName)}
                        />
                        {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
                     </View>

                     {/* Mobile Number Input */}
                     <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Mobile Number</Text>
                        <View style={[styles.phoneInputContainer, errors.mobileNumber ? styles.inputError : null]}>
                           <TextInput
                              style={styles.phoneInput}
                              placeholder="+ 91 XXXXX XXXXX"
                              placeholderTextColor="#A7A7A7"
                              value={mobileNumber}
                              onChangeText={(text) => {
                                 setMobileNumber(text);
                                 if (errors.mobileNumber) validateField('mobileNumber', text);
                              }}
                              keyboardType="phone-pad"
                              onBlur={() => validateField('mobileNumber', mobileNumber)}
                           />
                           <TouchableOpacity style={styles.otpButton} onPress={handleGetOTP}>
                              <Text style={styles.otpButtonText}>Get OTP</Text>
                           </TouchableOpacity>
                        </View>
                        {errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}
                     </View>

                     {/* Date of Birth Input */}
                     <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Date Of Birth</Text>
                        <TouchableOpacity
                           style={[styles.input, errors.dateOfBirth ? styles.inputError : null]}
                           onPress={openDatePicker}
                        >
                           <Text style={[styles.dateText, dateOfBirth ? styles.activeInputText : null]}>
                              {formatDate(dateOfBirth)}
                           </Text>
                        </TouchableOpacity>
                        {errors.dateOfBirth ? <Text style={styles.errorText}>{errors.dateOfBirth}</Text> : null}
                     </View>

                     {/* Address Input */}
                     <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Address</Text>
                        <TextInput
                           style={[styles.input, styles.addressInput, errors.address ? styles.inputError : null]}
                           placeholder="Address"
                           placeholderTextColor="#A7A7A7"
                           value={address}
                           onChangeText={(text) => {
                              setAddress(text);
                              if (errors.address) validateField('address', text);
                           }}
                           multiline={true}
                           onBlur={() => validateField('address', address)}
                        />
                        {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
                     </View>

                     {/* City and Pincode Row */}
                     <View style={styles.rowContainer}>
                        <View style={[styles.inputContainer, styles.halfWidth]}>
                           <Text style={styles.inputLabel}>City</Text>
                           <TouchableOpacity
                              style={[styles.dropdownContainer, errors.city ? styles.inputError : null]}
                              onPress={() => setShowCityDropdown(!showCityDropdown)}
                           >
                              <Text style={[styles.dropdownText, city ? styles.activeInputText : null]}>
                                 {city || 'City'}
                              </Text>
                              <Ionicons name="chevron-down" size={24} color="#A7A7A7" style={styles.dropdownIcon} />
                           </TouchableOpacity>
                           {showCityDropdown && (
                              <View style={styles.dropdownOptions}>
                                 {cityOptions.map((option) => (
                                    <TouchableOpacity
                                       key={option}
                                       style={styles.dropdownOption}
                                       onPress={() => handleCitySelect(option)}
                                    >
                                       <Text style={styles.dropdownOptionText}>{option}</Text>
                                    </TouchableOpacity>
                                 ))}
                              </View>
                           )}
                           {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
                        </View>

                        <View style={[styles.inputContainer, styles.halfWidth]}>
                           <Text style={styles.inputLabel}>Pincode</Text>
                           <TextInput
                              style={[styles.input, errors.pincode ? styles.inputError : null]}
                              placeholder="Code"
                              placeholderTextColor="#A7A7A7"
                              value={pincode}
                              onChangeText={(text) => {
                                 setPincode(text);
                                 if (errors.pincode) validateField('pincode', text);
                              }}
                              keyboardType="numeric"
                              maxLength={6}
                              onBlur={() => validateField('pincode', pincode)}
                           />
                           {errors.pincode ? <Text style={styles.errorText}>{errors.pincode}</Text> : null}
                        </View>
                     </View>

                     {/* Password Input */}
                     <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
                           <TextInput
                              style={styles.passwordInput}
                              placeholder="•••••••••"
                              placeholderTextColor="#A7A7A7"
                              value={password}
                              onChangeText={(text) => {
                                 setPassword(text);
                                 if (errors.password) validateField('password', text);
                              }}
                              secureTextEntry={hidePassword}
                              onBlur={() => validateField('password', password)}
                           />
                           <TouchableOpacity
                              style={styles.eyeIcon}
                              onPress={() => setHidePassword(!hidePassword)}
                           >
                              <Ionicons
                                 name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                                 size={24}
                                 color="#A7A7A7"
                              />
                           </TouchableOpacity>
                        </View>
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                     </View>

                     {/* Confirm Password Input */}
                     <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Confirm Password</Text>
                        <View style={[styles.passwordContainer, errors.confirmPassword ? styles.inputError : null]}>
                           <TextInput
                              style={styles.passwordInput}
                              placeholder="•••••••••"
                              placeholderTextColor="#A7A7A7"
                              value={confirmPassword}
                              onChangeText={(text) => {
                                 setConfirmPassword(text);
                                 if (errors.confirmPassword) validateField('confirmPassword', text);
                              }}
                              secureTextEntry={hideConfirmPassword}
                              onBlur={() => validateField('confirmPassword', confirmPassword)}
                           />
                           <TouchableOpacity
                              style={styles.eyeIcon}
                              onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                           >
                              <Ionicons
                                 name={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                 size={24}
                                 color="#A7A7A7"
                              />
                           </TouchableOpacity>
                        </View>
                        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                     </View>

                     <View style={styles.termsContainer}>
                        <Text style={styles.termsText}>
                           By continuing, you agree to{' '}
                           <Text style={styles.termsLink}>Terms of Use</Text> and{' '}
                           <Text style={styles.termsLink}>Privacy Policy</Text>.
                        </Text>
                     </View>

                     <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>Next</Text>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

         {showDatePicker && (
            <DateTimePicker
               value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
               mode="date"
               display="default"
               onChange={handleDateChange}
               maximumDate={new Date()}
            />
         )}
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00D3A1',
   },
   keyboardAvoidingView: {
      flex: 1,
   },
   scrollContainer: {
      flexGrow: 1,
   },
   headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: height * 0.04,
   },
   headerText: {
      fontSize: width * 0.07,
      fontWeight: 'bold',
      color: '#212121',
   },
   formContainer: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: width * 0.05,
      paddingTop: height * 0.03,
   },
   inputContainer: {
      marginBottom: height * 0.02,
   },
   inputLabel: {
      fontSize: width * 0.038,
      color: '#212121',
      marginBottom: height * 0.01,
      fontWeight: '500',
   },
   input: {
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      padding: height * 0.018,
      fontSize: width * 0.038,
      color: '#212121',
   },
   addressInput: {
      height: height * 0.1,
      textAlignVertical: 'top',
   },
   phoneInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      overflow: 'hidden',
   },
   phoneInput: {
      flex: 1,
      padding: height * 0.018,
      fontSize: width * 0.038,
      color: '#212121',
   },
   otpButton: {
      backgroundColor: '#E8F5E9',
      padding: height * 0.018,
      marginRight: 5,
   },
   otpButtonText: {
      color: '#00D3A1',
      fontWeight: 'bold',
      fontSize: width * 0.035,
   },
   dateText: {
      fontSize: width * 0.038,
      color: '#A7A7A7',
   },
   activeInputText: {
      color: '#212121',
   },
   rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   halfWidth: {
      width: '47%',
   },
   dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      overflow: 'hidden',
      height: height * 0.06,
   },
   dropdownText: {
      flex: 1,
      padding: height * 0.018,
      fontSize: width * 0.038,
      color: '#A7A7A7',
   },
   dropdownIcon: {
      position: 'absolute',
      right: width * 0.03,
   },
   dropdownOptions: {
      position: 'absolute',
      top: height * 0.09,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      zIndex: 1000,
      elevation: 3,
   },
   dropdownOption: {
      padding: height * 0.015,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
   },
   dropdownOptionText: {
      fontSize: width * 0.038,
      color: '#212121',
   },
   passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      overflow: 'hidden',
   },
   passwordInput: {
      flex: 1,
      padding: height * 0.018,
      fontSize: width * 0.038,
      color: '#212121',
   },
   eyeIcon: {
      padding: height * 0.015,
      marginRight: 5,
   },
   inputError: {
      borderWidth: 1,
      borderColor: 'red',
   },
   errorText: {
      color: 'red',
      fontSize: width * 0.03,
      marginTop: 5,
   },
   termsContainer: {
      marginTop: height * 0.01,
      alignItems: 'center',
   },
   termsText: {
      fontSize: width * 0.032,
      color: '#757575',
      textAlign: 'center',
   },
   termsLink: {
      color: '#00D3A1',
      fontWeight: '500',
   },
   nextButton: {
      backgroundColor: '#00D3A1',
      borderRadius: 30,
      padding: height * 0.018,
      alignItems: 'center',
      marginTop: height * 0.02,
      marginBottom: height * 0.02,
   },
   nextButtonText: {
      color: '#fff',
      fontSize: width * 0.04,
      fontWeight: 'bold',
   },
});