import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, User } from "@firebase/auth";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WelcomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/(drawerNav)/(tabs)/(posts)");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="fitness" size={40} color="black" />
          </View>
          <Text style={styles.mainTitle}>Healthify</Text>
          <Text style={styles.subTitle}>Your Journey to Wellness</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text style={styles.featureText}>Track Progress</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text style={styles.featureText}>Join Community</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="trophy-outline" size={24} color="black" />
            <Text style={styles.featureText}>Set Goals</Text>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.welcomeText}>Transform Your Life</Text>
          <Text style={styles.descriptionText}>
            Join thousands of others on their path to better health and wellness
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => router.replace("/(login)")}
        >
          <Text style={styles.signInText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: 'black',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: 'black',
    marginTop: 8,
    opacity: 0.6,
    letterSpacing: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginTop: 40,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    width: width * 0.28,
  },
  featureText: {
    fontSize: 12,
    color: 'black',
    marginTop: 8,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 24,
    borderRadius: 20,
    width: width * 0.9,
    marginVertical: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: 'black',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.7,
  },
  signInButton: {
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  }
});

export default WelcomePage;