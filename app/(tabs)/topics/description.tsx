import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TopicDescription() {
  const { title, description } = useLocalSearchParams();
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    padding: 16,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#1e293b',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
}); 