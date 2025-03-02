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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LoginScreen({ navigation }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [hidePassword, setHidePassword] = useState(true);
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');

   const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
         setEmailError('Email is required');
         return false;
      } else if (!emailRegex.test(email)) {
         setEmailError('Please enter a valid email address');
         return false;
      }
      setEmailError('');
      return true;
   };

   const validatePassword = (password) => {
      if (!password) {
         setPasswordError('Password is required');
         return false;
      } else if (password.length < 8) {
         setPasswordError('Password must be at least 8 characters');
         return false;
      }
      setPasswordError('');
      return true;
   };

   const handleLogin = () => {
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);

      if (isEmailValid && isPasswordValid) {
         // Proceed with login
         console.log('Login successful');
         navigation.navigate('Home')
         // Add your authentication logic here
      }
   };

   const togglePasswordVisibility = () => {
      setHidePassword(!hidePassword);
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
         >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={styles.innerContainer}>
                  <View style={styles.headerContainer}>
                     <Text style={styles.headerText}>Welcome</Text>
                  </View>

                  <View style={styles.formContainer}>
                     <View style={styles.textcontaineer}>


                        <View style={styles.inputContainer}>
                           <Text style={styles.inputLabel}>Username Or Email</Text>
                           <TextInput
                              style={[styles.input, emailError ? styles.inputError : null]}
                              placeholder="example@example.com"
                              placeholderTextColor="#A7A7A7"
                              value={email}
                              onChangeText={(text) => {
                                 setEmail(text);
                                 if (emailError) validateEmail(text);
                              }}
                              keyboardType="email-address"
                              autoCapitalize="none"
                           />
                           {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                        </View>

                        <View style={styles.inputContainer}>
                           <Text style={styles.inputLabel}>Password</Text>
                           <View style={[styles.passwordContainer, passwordError ? styles.inputError : null]}>
                              <TextInput
                                 style={styles.passwordInput}
                                 placeholder="••••••••"
                                 placeholderTextColor="#A7A7A7"
                                 value={password}
                                 onChangeText={(text) => {
                                    setPassword(text);
                                    if (passwordError) validatePassword(text);
                                 }}
                                 secureTextEntry={hidePassword}
                              />
                              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                                 <Ionicons
                                    name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={24}
                                    color="#A7A7A7"
                                 />
                              </TouchableOpacity>
                           </View>
                           {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                           <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.forgotPasswordContainer}>
                           <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.signUpButton}>
                           <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.fingerprintContainer}>
                           <Text style={styles.useText}>Use </Text>
                           <Text style={styles.fingerprintText}>Fingerprint</Text>
                           <Text style={styles.useText}> To Access</Text>
                        </View>

                        <View style={styles.socialContainer}>
                           <Text style={styles.orText}>or sign up with</Text>
                           <View style={styles.socialButtons}>
                              <TouchableOpacity style={styles.socialButton}>
                                 <Ionicons name="logo-facebook" size={24} color="black" />
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.socialButton}>
                                 <Ionicons name="logo-google" size={24} color="black" />
                              </TouchableOpacity>
                           </View>
                        </View>

                        <View style={styles.noAccountContainer}>
                           <Text style={styles.noAccountText}>Don't have an account? </Text>
                           <TouchableOpacity>
                              <Text style={styles.signUpText} onPress={() => navigation.navigate('CreateAccountA')}>Sign Up</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>
               </View>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      </SafeAreaView >
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
   innerContainer: {
      flex: 1,
   },
   headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
   },
   headerText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#212121',
      top: 30
   },
   formContainer: {
      // flex: 1,
      height: '100%',
      backgroundColor: '#F9F9F9',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      top: 40,
   },
   inputContainer: {
      marginBottom: 20,
   },
   inputLabel: {
      fontSize: 16,
      color: '#212121',
      marginBottom: 10,
      fontWeight: '500',
   },
   input: {
      backgroundColor: '#E8F5E9',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
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
      padding: 16,
      fontSize: 16,
      color: '#212121',
   },
   eyeIcon: {
      padding: 10,
   },
   inputError: {
      borderWidth: 1,
      borderColor: 'red',
   },
   errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
   },
   button: {
      backgroundColor: '#00D3A1',
      borderRadius: 30,
      padding: 18,
      alignItems: 'center',
      marginTop: 10,
   },
   buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
   },
   forgotPasswordContainer: {
      alignItems: 'center',
      marginTop: 15,
   },
   forgotPasswordText: {
      color: '#212121',
      fontSize: 14,
   },
   signUpButton: {
      backgroundColor: '#E8F5E9',
      borderRadius: 30,
      padding: 18,
      alignItems: 'center',
      marginTop: 15,
   },
   signUpButtonText: {
      color: '#212121',
      fontSize: 18,
      fontWeight: 'bold',
   },
   fingerprintContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
   },
   useText: {
      fontSize: 14,
      color: '#212121',
   },
   fingerprintText: {
      fontSize: 14,
      color: '#2196F3',
      fontWeight: '500',
   },
   socialContainer: {
      marginTop: 20,
      alignItems: 'center',
   },
   orText: {
      fontSize: 14,
      color: '#757575',
      marginBottom: 10,
   },
   socialButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
   },
   socialButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   noAccountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
   },
   noAccountText: {
      fontSize: 14,
      color: '#757575',
   },
   signUpText: {
      fontSize: 14,
      color: '#2196F3',
      fontWeight: '500',
   },
   textcontaineer: {
      top: 20
   }

});











// import React, { useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, TextInput, } from 'react-native';

// export default function AOnBoarding({ navigation }) {
//    const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animation
//    const scaleAnim = useRef(new Animated.Value(1)).current; // Scale animation for button

//    useEffect(() => {
//       Animated.timing(fadeAnim, {
//          toValue: 1,
//          duration: 800,
//          useNativeDriver: true,
//       }).start();
//    }, []);

//    return (
//       <View style={styles.container}>
//          <View style={styles.topSection}>
//             <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
//                <Text style={styles.title}>Welcome </Text>
//             </Animated.View>
//          </View>
//          <View style={styles.bottomSection}>
//             <View style={styles.inputeTextcontainer}>
//                <View style={styles.inputText}>
//                   <Text>Username or Email</Text>
//                   <TextInput
//                      style={styles.input}
//                      placeholder="example@example.com"
//                      placeholderTextColor="#A6DAB1" // Change color for better visibility
//                      textAlign="center" // Center align placeholder text
//                   />
//                </View>
//                <View style={styles.inputText}>
//                   <Text>Username or Email</Text>
//                   <TextInput
//                      style={styles.input}
//                      placeholder="example@example.com"
//                      placeholderTextColor="#A6DAB1" // Change color for better visibility
//                      textAlign="center" // Center align placeholder text
//                   />
//                </View>
//             </View>

//          </View>
//       </View>
//    );
// }

// const styles = StyleSheet.create({
//    container: { flex: 1, backgroundColor: '#00D0A0' },
//    topSection: { height: '30%', justifyContent: 'center', alignItems: 'center' },
//    innerContainer: { width: '90%', alignSelf: 'center' },
//    bottomSection: {
//       flex: 1,
//       backgroundColor: '#F5FFF5',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       marginTop: -30,
//       justifyContent: 'center',
//       alignItems: 'center',
//    },
//    title: {
//       fontSize: 30,
//       fontWeight: 'bold',
//       color: 'black',
//       textAlign: 'center'
//    },
//    image: {
//       width: 250,
//       height: 250,
//       resizeMode: 'contain'
//    },
//    button: {
//       marginTop: 20,
//       backgroundColor: '#00D0A0',
//       paddingVertical: 12,
//       paddingHorizontal: 40,
//       borderRadius: 10
//    },
//    buttonText: {
//       color: 'white',
//       fontSize: 18,
//       fontWeight: 'bold',
//    },
//    row: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginTop: 20
//    },
//    dot: {
//       width: 12,
//       height: 12,
//       borderRadius: 6,
//       marginHorizontal: 5
//    },
//    activeDot: {
//       backgroundColor: '#00D0A0'
//    },
//    inactiveDot: {
//       borderWidth: 2,
//       borderColor: '#003D3D',
//       backgroundColor: 'transparent'
//    },
//    input: {
//       backgroundColor: "#DFF7E2",
//       borderRadius: 16,
//       paddingHorizontal: 80,
//       // paddingVertical: 30,
//    },
//    inputeTextcontainer: {
//       justifyContent: 'flex-start'
//    },
//    inputText: {
//       marginTop: 20
//    }
// });
