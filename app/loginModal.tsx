import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import  supabase from '../supabaseClient'; // Assurez-vous d'avoir configuré Supabase

const AuthModal = forwardRef((props, ref) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; field?: 'email' | 'password' | 'confirmPassword' } | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  
  const shakeAnimation = useState(new Animated.Value(0))[0];

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    // Validation basique
    if (!email.includes('@')) {
      setError({ message: 'Veuillez entrer un email valide', field: 'email' });
      startShake();
      setLoading(false);
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError({ message: 'Les mots de passe ne correspondent pas', field: 'confirmPassword' });
      startShake();
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;
        
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
      }

      // Fermer le modal si succès
      bottomSheetModalRef.current?.dismiss();

    } catch (err: any) {
      const errorMessage = getFriendlyError(err.message);
      console.log(err.message);
      
      setError({ message: errorMessage, field: getErrorField(err.message) });
      startShake();
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyError = (error: string) => {
    const errors: { [key: string]: string } = {
      'Email rate limit exceeded': 'Trop de tentatives, veuillez réessayer plus tard',
      'Invalid login credentials': 'Identifiants incorrects',
      'Email not confirmed': 'Veuillez confirmer votre email',
      'Weak password': 'Le mot de passe doit contenir au moins 6 caractères',
      'auth/invalid-email': 'Email invalide',
      'auth/user-not-found': 'Aucun compte associé à cet email',
      'auth/wrong-password': 'Mot de passe incorrect',
    };
    return errors[error] || 'Une erreur est survenue';
  };

  const getErrorField = (error: string) => {
    if (error.includes('email')) return 'email';
    if (error.includes('password')) return 'password';
    return undefined;
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useImperativeHandle(ref, () => ({
    handlePresentModalPress,
  }));

  return (
    <BottomSheetModal
      snapPoints={['60%', '98%']}
      index={1}
      ref={bottomSheetModalRef}
      backgroundStyle={styles.sheetContainer}
    >
      <BottomSheetView style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => bottomSheetModalRef.current?.dismiss()}>
              <Ionicons name="close" size={24} color={Colors.midnightOcean} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>
            {isSignUp ? 'Créer un compte' : 'Connectez-vous'}
          </Text>

          <TouchableOpacity 
            onPress={() => setIsSignUp(!isSignUp)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {isSignUp 
                ? 'Déjà un compte ? Se connecter' 
                : 'Pas de compte ? Créer un compte'}
            </Text>
          </TouchableOpacity>

          <Animated.View style={{ transform: [{ translateX: shakeAnimation }], width: '100%' }}>
            <View style={styles.form}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[
                  styles.input,
                  error?.field === 'email' && styles.errorInput
                ]}
                placeholderTextColor="grey"
              />

              <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[
                  styles.input,
                  error?.field === 'password' && styles.errorInput
                ]}
                placeholderTextColor="grey"
              />

              {isSignUp && (
                <TextInput
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  style={[
                    styles.input,
                    error?.field === 'confirmPassword' && styles.errorInput
                  ]}
                  placeholderTextColor="grey"
                />
              )}

              {error && (
                <View style={styles.errorContainer}>
                  <Ionicons name="warning" size={16} color={Colors.coralRed} />
                  <Text style={styles.errorText}>{error.message}</Text>
                </View>
              )}

              <TouchableOpacity 
                onPress={handleAuth}
                style={[styles.button, loading && styles.disabledButton]}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading 
                    ? 'Chargement...' 
                    : isSignUp 
                      ? 'S\'inscrire' 
                      : 'Se connecter'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  sheetContainer: {
    backgroundColor: Colors.seagullGrey,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 24,
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.midnightOcean,
    marginBottom: 16,
    textAlign: 'center',
  },
  toggleButton: {
    marginBottom: 32,
    alignSelf: 'center',
  },
  toggleText: {
    color: Colors.oceanBlue,
    fontWeight: '500',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.foamWhite,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    width: '100%'
  },
  errorInput: {
    borderColor: Colors.coralRed,
    backgroundColor: '#FFF5F5'
  },
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.oceanBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '100%'
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
    marginTop: 8
  },
  errorText: {
    color: Colors.coralRed,
    fontSize: 14,
    fontWeight: '500'
  }
});

export default AuthModal;