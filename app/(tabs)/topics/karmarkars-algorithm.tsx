import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function KarmarkarsAlgorithmExplanation() {
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
          <Text style={styles.title}>Karmarkar's Algorithm</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to Karmarkar's Algorithm</Text>
            <Text style={styles.paragraph}>
              Karmarkar's Algorithm, introduced in 1984 by Narendra Karmarkar, is a polynomial-time algorithm 
              for solving Linear Programming (LP) problems. It is the first Interior-Point Method (IPM) that 
              is more efficient than the Simplex Method, making it a breakthrough in optimization.
            </Text>
            
            <Text style={styles.paragraph}>Why is Karmarkar's Algorithm Important?</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Faster than the Simplex Method</Text> – Runs in polynomial time O(n<sup>3.5</sup>L) compared to Simplex's worst-case exponential time.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Interior-Point Approach</Text> – Instead of moving along the boundary (like Simplex), it moves inside the feasible region towards the optimal solution.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Used in Large-Scale Optimization Problems</Text> – Foundational for modern convex optimization, machine learning, and network optimization.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Understanding the Problem Formulation</Text>
            <Text style={styles.paragraph}>
              A standard Linear Programming Problem (LPP) is:
            </Text>
            <Text style={styles.mathText}>
              Minimize Z = c<sup>T</sup>x
            </Text>
            <Text style={styles.paragraph}>Subject to constraints:</Text>
            <Text style={styles.mathText}>
              Ax = b, x ≥ 0
            </Text>
            <Text style={styles.paragraph}>where:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                x is the vector of decision variables
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                A is the constraint matrix
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                b is the resource availability vector
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                c is the cost vector
              </Text>
            </View>
            <Text style={styles.paragraph}>
              Karmarkar's algorithm transforms the LP into a different space where it applies projective 
              transformations and gradient descent to move towards the optimal solution.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Key Concepts in Karmarkar's Algorithm</Text>
            
            <Text style={styles.subheading}>(i) Interior-Point Method</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Unlike Simplex (which moves along the edges of the feasible polytope), Karmarkar's method takes steps inside the feasible region, ensuring a faster convergence.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Projective Transformation</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                A special transformation is applied to center the feasible region, making the search direction more efficient.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iii) Affine Scaling & Gradient Descent</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                A scaling operation is applied to normalize constraints, and then a gradient-based step moves toward the optimal solution.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Steps in Karmarkar's Algorithm</Text>
            
            <Text style={styles.subheading}>Step 1: Convert the Problem into Homogeneous Form</Text>
            <Text style={styles.paragraph}>
              The problem is reformulated to have a homogeneous feasible region, making transformations easier.
            </Text>
            
            <Text style={styles.subheading}>Step 2: Normalize the Constraint Matrix</Text>
            <Text style={styles.paragraph}>
              To ensure numerical stability, the constraint matrix A is scaled appropriately.
            </Text>
            
            <Text style={styles.subheading}>Step 3: Choose an Interior Starting Point</Text>
            <Text style={styles.paragraph}>
              Instead of starting at a vertex (corner point) like Simplex, Karmarkar's method begins at an interior feasible point.
            </Text>
            
            <Text style={styles.subheading}>Step 4: Compute the Search Direction</Text>
            <Text style={styles.paragraph}>
              A projective transformation is applied to map the feasible region into a normalized space, followed by a descent step in that space.
            </Text>
            
            <Text style={styles.subheading}>Step 5: Move in the Search Direction</Text>
            <Text style={styles.paragraph}>
              Instead of moving in the raw gradient direction, a carefully scaled step is taken, ensuring the new solution remains inside the feasible region.
            </Text>
            
            <Text style={styles.subheading}>Step 6: Repeat Until Convergence</Text>
            <Text style={styles.paragraph}>
              These steps are iteratively applied until the optimal solution is reached.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Advantages of Karmarkar's Algorithm</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Polynomial-time Complexity</Text> – Runs in O(n<sup>3.5</sup>L), making it faster than Simplex in large-scale problems.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>More Efficient for Large Problems</Text> – Ideal for high-dimensional LP problems.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Foundation for Modern Interior-Point Methods</Text> – Inspired algorithms used in convex and nonlinear programming.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Applications of Karmarkar's Algorithm</Text>
            
            <Text style={styles.subheading}>(i) Operations Research & Supply Chain</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Network Flow Optimization
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Logistics and Transportation Planning
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Machine Learning & AI</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Support Vector Machines (SVMs) for large-scale classification
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Convex Optimization Problems in AI
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iii) Financial Optimization</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Portfolio Optimization
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Risk Management
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iv) Telecommunications & Scheduling</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Call Routing in Networks
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Job Scheduling in Cloud Computing
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Conclusion</Text>
            <Text style={styles.paragraph}>
              Karmarkar's Algorithm revolutionized Linear Programming by introducing Interior-Point Methods, 
              which are faster and more scalable than the Simplex Method. It is widely used in large-scale 
              optimization problems, AI, and modern convex programming techniques.
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