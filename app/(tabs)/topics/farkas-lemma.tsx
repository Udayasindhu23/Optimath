import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function FarkasLemmaExplanation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.push('/topics/linear')}
      >
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Farkas' Lemma</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to Farkas' Lemma</Text>
            <Text style={styles.paragraph}>
              Farkas' Lemma is a fundamental result in linear algebra and optimization, particularly in 
              linear programming and convex analysis. It provides a way to determine whether a system of 
              linear inequalities has a solution or not.
            </Text>
            
            <Text style={styles.paragraph}>This theorem is especially useful in:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Feasibility analysis</Text> – Determines whether a linear system is solvable.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Duality theory</Text> – Forms the foundation of Linear Programming Duality.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Optimization problems</Text> – Helps in Karush-Kuhn-Tucker (KKT) conditions in nonlinear programming.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Statement of Farkas' Lemma</Text>
            <Text style={styles.paragraph}>
              Farkas' Lemma states:
            </Text>
            
            <Text style={styles.paragraph}>
              Given a matrix A∈R^(m×n) and a vector b∈R^m, exactly one of the following holds:
            </Text>
            
            <Text style={styles.subheading}>Case 1:</Text>
            <Text style={styles.paragraph}>
              There exists a vector x≥0 such that:
            </Text>
            <Text style={styles.mathText}>
              Ax = b
            </Text>
            <Text style={styles.paragraph}>
              (i.e., the system has a non-negative solution).
            </Text>
            
            <Text style={styles.subheading}>Case 2:</Text>
            <Text style={styles.paragraph}>
              There exists a vector y∈R^m such that:
            </Text>
            <Text style={styles.mathText}>
              A^Ty ≤ 0 and b^Ty &gt; 0
            </Text>
            <Text style={styles.paragraph}>
              (i.e., there exists a "certificate" proving that b is not in the feasible region).
            </Text>
            
            <Text style={styles.paragraph}>This means:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If the system Ax = b, x ≥ 0 has no solution, then we can construct a vector y that proves its infeasibility.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Exactly one of the two cases holds—never both.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Interpretation of Farkas' Lemma</Text>
            
            <Text style={styles.subheading}>(i) Feasibility Test</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Farkas' Lemma provides a mathematical tool to check whether a system of inequalities has a solution.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                If the system has a feasible solution, then Case 1 holds.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                If no solution exists, then Case 2 provides a certificate of infeasibility.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Relationship with Duality in Linear Programming</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Farkas' Lemma is the basis of LP Duality Theorems (Weak and Strong Duality).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The existence of a solution to the Primal ensures that the Dual has a feasible solution.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iii) Geometric Interpretation</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If a point b is inside the convex cone formed by the columns of A, then there exists a non-negative combination of those columns that equals b.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Otherwise, there exists a separating hyperplane (a vector y) that separates b from this cone.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Application of Farkas' Lemma</Text>
            
            <Text style={styles.subheading}>(i) Optimization & Duality</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Helps in proving Linear Programming Duality.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Forms the basis of Strong Duality Theorem.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Karush-Kuhn-Tucker (KKT) Conditions</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Used in Non-Linear Programming (NLP) to determine Lagrange multipliers.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iii) Machine Learning & SVMs</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Used in Support Vector Machines (SVMs) for separating hyperplanes in classification problems.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iv) Feasibility Analysis</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Used in Operations Research to check if a system of constraints is solvable.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Conclusion</Text>
            <Text style={styles.paragraph}>
              Farkas' Lemma is a powerful theorem that helps in understanding feasibility, duality, and 
              optimization. It is widely used in linear programming, convex optimization, and machine 
              learning. By providing a way to prove infeasibility, it plays a crucial role in mathematical 
              programming.
            </Text>
          </View>

          <View style={styles.actionSection}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/calculator')}
            >
              <Text style={styles.actionButtonText}>Try LP Calculators</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  content: {
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f1f5f9',
  },
  backArrow: {
    fontSize: 18,
    marginRight: 8,
    color: '#1e293b',
  },
  backButtonText: {
    fontSize: 16,
    color: '#1e293b',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bulletDot: {
    fontSize: 15,
    color: '#0066FF',
    marginRight: 8,
    width: 16,
  },
  bulletText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
    flex: 1,
  },
  mathText: {
    fontSize: 15,
    fontFamily: 'monospace',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    color: '#334155',
  },
  bold: {
    fontWeight: 'bold',
  },
  actionSection: {
    marginTop: 24,
    marginBottom: 48,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 