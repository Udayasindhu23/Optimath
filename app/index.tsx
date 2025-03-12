import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 15,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(titleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(titleAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  return (
    <View style={styles.background}>
      {/* Floating Mathematical Symbols */}
      {['∑', '∫', '∞', 'π', 'Σ', 'θ'].map((symbol, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.mathSymbol,
            {
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 90}%`,
              opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.5] }),
              transform: [{ rotate: `${Math.random() * 360}deg` }],
            },
          ]}
        >
          {symbol}
        </Animated.Text>
      ))}

      {/* Glowing Graph Grid */}
      <View style={styles.graphLine1} />
      <View style={styles.graphLine2} />

      {/* Main Content */}
      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoContainer}>
          <Animated.Text
            style={[
              styles.logo,
              {
                transform: [
                  {
                    scale: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05], // Reduced glow effect
                    }),
                  },
                ],
              },
            ]}
          >
            OptiMath
          </Animated.Text>
          <View style={styles.underline} />
        </View>

        <Text style={styles.title}>Where Numbers Meet Innovation</Text>

        <Link href="/(tabs)" asChild>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>START EXPLORING</Text>
            </View>
          </TouchableOpacity>
        </Link>

        {/* Features Section - Now Clearly Visible Below the Button */}
        <View style={styles.featuresContainer}>
          {['Advanced Algorithms', 'Smart Solutions', 'Precise Results'].map((text, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.dot} />
              <Text style={styles.featureText}>{text}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#020617', // Deep futuristic black-blue
    overflow: 'hidden',
  },
  mathSymbol: {
    position: 'absolute',
    fontSize: 50,
    color: '#38BDF8', // Neon blue
    textShadowColor: '#38BDF8',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    opacity: 0.3,
  },
  graphLine1: {
    position: 'absolute',
    width: '200%',
    height: 2,
    backgroundColor: '#818CF8', // Soft neon indigo
    top: '30%',
    opacity: 0.12,
    transform: [{ rotate: '45deg' }],
  },
  graphLine2: {
    position: 'absolute',
    width: '200%',
    height: 2,
    backgroundColor: '#34D399', // Neon green
    bottom: '30%',
    opacity: 0.12,
    transform: [{ rotate: '-45deg' }],
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    fontSize: 60, // Slightly reduced
    fontWeight: '900',
    color: '#38BDF8',
    textShadowColor: '#38BDF8',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8, // Reduced glow effect
    letterSpacing: 4,
  },
  underline: {
    height: 3,
    width: 120,
    backgroundColor: '#38BDF8',
    marginTop: 10,
    borderRadius: 2,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6, // Reduced glow effect
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F1F5F9',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  button: {
    marginBottom: 15,
    width: 260,
  },
  buttonInner: {
    backgroundColor: '#38BDF8',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, // Reduced glow
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  buttonText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 2.5,
  },
  featuresContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30, // Increased spacing
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
    marginRight: 12,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, // Reduced glow effect
    shadowRadius: 6,
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.3,
  },
});
