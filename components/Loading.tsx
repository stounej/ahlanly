import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withDelay,
  withSequence,
} from 'react-native-reanimated';

interface LoadingOverlayProps {
  loading: boolean;
  text?: string;
}

const Loading = ({ loading, text = "Chargement..." }: LoadingOverlayProps) => {
  if (!loading) return null;

  // Valeurs partagées pour les animations des points
  const point1Scale = useSharedValue(0);
  const point2Scale = useSharedValue(0);
  const point3Scale = useSharedValue(0);

  // Styles animés pour chaque point
  const point1Style = useAnimatedStyle(() => ({
    opacity: point1Scale.value,
    transform: [{ scale: point1Scale.value }],
  }));

  const point2Style = useAnimatedStyle(() => ({
    opacity: point2Scale.value,
    transform: [{ scale: point2Scale.value }],
  }));

  const point3Style = useAnimatedStyle(() => ({
    opacity: point3Scale.value,
    transform: [{ scale: point3Scale.value }],
  }));

  useEffect(() => {
    if (loading) {
      // Démarrer le premier point immédiatement
      point1Scale.value = withRepeat(
        withTiming(1, { duration: 700, easing: Easing.linear }),
        -1,
        true
      );
  
      // Démarrer le deuxième point avec un délai
      setTimeout(() => {
        point2Scale.value = withRepeat(
          withTiming(1, { duration: 700, easing: Easing.linear }),
          -1,
          true
        );
      }, 400);
  
      // Démarrer le troisième point avec un délai
      setTimeout(() => {
        point3Scale.value = withRepeat(
          withTiming(1, { duration: 700, easing: Easing.linear }),
          -1,
          true
        );
      }, 800);
    } else {
      // Réinitialiser les valeurs quand l'animation est stoppée
      point1Scale.value = 0;
      point2Scale.value = 0;
      point3Scale.value = 0;
    }
  }, [loading]);
  return (
    <View style={styles.overlay}>
        {/* Points animés */}
        <View style={styles.pointsContainer}>
          <Animated.View style={[styles.point, point1Style]} />
          <Animated.View style={[styles.point, point2Style]} />
          <Animated.View style={[styles.point, point3Style]} />
        </View>

        {/* Texte de chargement */}
        <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 250, 1)', // Fond semi-transparent
    zIndex: 9999,
  },
  content: {
    backgroundColor: '#fff', // Fond blanc
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Ombre légère pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  point: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: 'grey', // Couleur des points
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});

export default Loading;