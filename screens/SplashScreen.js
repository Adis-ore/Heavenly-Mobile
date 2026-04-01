import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="cross"
            size={64}
            color={THEME.colors.gold}
          />
        </View>
        <Text style={styles.appName}>HeavenlyComfort</Text>
        <Text style={styles.tagline}>Bring your burden. Find your peace.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  appName: {
    fontFamily: THEME.fonts.display,
    fontSize: 34,
    color: THEME.colors.gold,
    letterSpacing: 0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: THEME.fonts.body, fontStyle: 'italic',
    fontSize: 16,
    color: THEME.colors.textPrimary,
    textAlign: 'center',
    opacity: 0.85,
  },
});
