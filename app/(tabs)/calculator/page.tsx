import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Calculator() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Linear Programming Calculator</Text>
        <Text style={styles.description}>
          Choose a method to solve your linear programming problem:
        </Text>

        <View style={styles.methodsGrid}>
          <Link href="/calculator/graphical" asChild>
            <TouchableOpacity style={styles.methodCard}>
              <Text style={styles.methodTitle}>Graphical Method</Text>
              <Text style={styles.methodDescription}>
                Solve 2-variable linear programming problems visually using a graph.
                Best for understanding the geometric interpretation of LP problems.
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/calculator/simplex" asChild>
            <TouchableOpacity style={styles.methodCard}>
              <Text style={styles.methodTitle}>Simplex Method</Text>
              <Text style={styles.methodDescription}>
                Solve linear programming problems using the Simplex algorithm.
                Handles problems with multiple variables and constraints.
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/calculator/transportation" asChild>
            <TouchableOpacity style={styles.methodCard}>
              <Text style={styles.methodTitle}>Transportation Method</Text>
              <Text style={styles.methodDescription}>
                Solve transportation problems to minimize total shipping costs
                between sources and destinations.
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/calculator/duality" asChild>
            <TouchableOpacity style={styles.methodCard}>
              <Text style={styles.methodTitle}>Duality Method</Text>
              <Text style={styles.methodDescription}>
                Analyze linear programming problems using duality theory.
                Understand the relationship between primal and dual problems.
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  methodsGrid: {
    gap: 16,
  },
  methodCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 8,
  },
  methodDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
}); 