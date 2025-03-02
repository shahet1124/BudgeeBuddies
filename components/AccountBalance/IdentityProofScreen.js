import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, ContentContainer, PrimaryButton } from './components';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const IdentityProofScreen = ({ navigation }) => {
   const [documents, setDocuments] = useState([
      { id: 1, title: 'Proof Of Identity', image: null },
      { id: 2, title: 'Proof Of Identity', image: null },
      { id: 3, title: 'Proof Of Identity', image: null }
   ]);

   const pickImage = async (id) => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
         alert('Permission to access camera roll is required!');
         return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!result.canceled) {
         const newDocuments = documents.map(doc =>
            doc.id === id ? { ...doc, image: result.assets[0].uri } : doc
         );
         setDocuments(newDocuments);
      }
   };

   const takePhoto = async (id) => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
         alert('Permission to access camera is required!');
         return;
      }

      const result = await ImagePicker.launchCameraAsync({
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!result.canceled) {
         const newDocuments = documents.map(doc =>
            doc.id === id ? { ...doc, image: result.assets[0].uri } : doc
         );
         setDocuments(newDocuments);
      }
   };

   const handleNext = () => {
      navigation.navigate('UpiWalletPin');
   };

   return (
      <SafeAreaView style={styles.container}>
         <Header navigation={navigation} />

         <ContentContainer>
            <View style={styles.content}>
               {documents.map((doc) => (
                  <View key={doc.id} style={styles.documentContainer}>
                     <Text style={styles.documentTitle}>{doc.title}</Text>

                     <View style={styles.uploadContainer}>
                        <View style={styles.uploadDropdown}>
                           <Text style={styles.uploadText}>Upload Document</Text>
                           <Text style={styles.dropdownIcon}>▼</Text>
                        </View>

                        <TouchableOpacity
                           style={styles.iconButton}
                           onPress={() => pickImage(doc.id)}
                        >
                           <Ionicons name="download-outline" size={24} color="#00C389" />
                        </TouchableOpacity>

                        {doc.id === 3 && (
                           <TouchableOpacity
                              style={styles.iconButton}
                              onPress={() => takePhoto(doc.id)}
                           >
                              <Ionicons name="camera-outline" size={24} color="#00C389" />
                           </TouchableOpacity>
                        )}
                     </View>

                     {doc.image && (
                        <Image
                           source={{ uri: doc.image }}
                           style={styles.previewImage}
                        />
                     )}
                  </View>
               ))}

               <View style={styles.buttonContainer}>
                  <PrimaryButton
                     title="Next"
                     onPress={handleNext}
                     style={styles.nextButton}
                  />
               </View>
            </View>
         </ContentContainer>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00C389',
   },
   content: {
      flex: 1,
      paddingTop: 20,
   },
   documentContainer: {
      marginBottom: 20,
   },
   documentTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
   },
   uploadContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   uploadDropdown: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   uploadText: {
      fontSize: 16,
      color: '#777',
   },
   dropdownIcon: {
      fontSize: 12,
      color: '#777',
   },
   iconButton: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
   },
   previewImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginTop: 10,
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

export default IdentityProofScreen;