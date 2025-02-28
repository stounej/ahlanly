import { Colors } from '@/constants/Colors';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import AuthModal from './loginModal';
import  supabase from '../supabaseClient'; // Assurez-vous d'avoir configuré Supabase
import { Session } from '@supabase/supabase-js';

const { width } = Dimensions.get('window');
type ChildRef = {
  handlePresentModalPress: () => void;
};
const LoginScreen = () => {

  // const { startOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });
  // const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { top } = useSafeAreaInsets();
  const childRef = useRef<ChildRef>(null);
  const handlePress = () => {
    if (childRef.current) {      
      childRef.current.handlePresentModalPress();
    }
  };

  const openLink = async () => {
    WebBrowser.openBrowserAsync('https://google.com');
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image 
        source={require('@/assets/images/login1.jpeg')} 
        style={styles.backgroundImage}
        blurRadius={1}
      />
      
      {/* Titre en haut */}
      <View style={styles.header}>
        <Text style={styles.title}>
          L'hospitalité simplifiée,{'\n'} 
          la gestion optimisée.
        </Text>
      </View>

      {/* Boutons et texte légal en bas */}
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.appleButton]}
          >
            <Ionicons name="logo-apple" size={20} color="white" />
            <Text style={[styles.buttonText, styles.whiteText]}>Continuer avec Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.googleButton]}
          >
            <Ionicons name="logo-google" size={20} color="white" />
            <Text style={[styles.buttonText, styles.whiteText]}>Continuer avec Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.emailButton]}
            onPress={() => handlePress()}
          >
            <Ionicons name="mail" size={20} color="white"  />
            <Text style={[styles.buttonText, styles.whiteText]}>Continuer avec Email</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.legalText}>
          En continuant, vous acceptez nos{' '}
          <Text style={styles.link} onPress={openLink}>
            Conditions
          </Text>{' '}
          et notre{' '}
          <Text style={styles.link} onPress={openLink}>
            Confidentialité
          </Text>
        </Text>

      </View>
      <AuthModal ref={childRef}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  header: {
    marginTop: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    lineHeight: 32,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 18,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: width * 0.8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 18
  },
  appleButton: {
    backgroundColor: '#000',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  emailButton: {
    backgroundColor: Colors.oceanBlue,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  whiteText: {
    color: 'white',
  },
  legalText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    paddingHorizontal: 30,
    lineHeight: 18,
  },
  link: {
    color: Colors.oceanBlue,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;