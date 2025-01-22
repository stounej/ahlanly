import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking'

const LoginScreen = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { top } = useSafeAreaInsets();

  const handleAppleLogin =  React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow(
        { redirectUrl: 
          Linking.createURL('/(authenticated)/(tabs)/dashboard', 
            { scheme: 'com.oeddahri.ahlanly' }),}
      );

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  const handleGoogleLogin = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await googleAuth(
        { redirectUrl: 
          Linking.createURL('/(authenticated)/(tabs)/dashboard', 
            { scheme: 'com.oeddahri.ahlanly' }),}
      );

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  const openLink = async () => {
    WebBrowser.openBrowserAsync('https://google.com');
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image source={require('@/assets/images/icn.jpeg')} style={styles.loginImage} />
      <Image source={require('@/assets/images/login1.jpeg')} style={styles.banner} />
      <Text style={styles.title}>L'hospitalité simplifiée, la gestion optimisée.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn]} onPress={handleAppleLogin}>
          <Ionicons name="logo-apple" size={24} />
          <Text style={[styles.btnText]}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={24} />
          <Text style={[styles.btnText]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={handleAppleLogin}>
          <Ionicons name="logo-apple" size={24} />
          <Text style={[styles.btnText]}>Continue with Email</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          By continuing you agree to Todoist's{' '}
          <Text style={styles.link} onPress={openLink}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={openLink}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 40,
    flex: 1, // Assurez-vous que le conteneur prend toute la hauteur de l'écran
    position: 'relative',

  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    zIndex: 1
  },
  banner: {
    position: 'absolute', // Positionné derrière tout le contenu
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%', // L'image de fond occupe tout l'espace
    resizeMode: 'cover', // 
  },
  title: {
    marginHorizontal: 50,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    top: '45%',
    gap: 20,
    marginHorizontal: 40,
  },
  btn: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 6,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.midnightOcean,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.sandBeige
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.midnightOcean,
  },
  link: {
    color: Colors.oceanBlue,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;