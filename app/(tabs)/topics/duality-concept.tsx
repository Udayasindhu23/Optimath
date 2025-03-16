import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function DualityConceptExplanation() {
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
          <Text style={styles.title}>Duality in Linear Programming</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to Duality</Text>
            <Text style={styles.paragraph}>
              In Linear Programming (LP), every problem, called the Primal Problem, has a corresponding 
              problem known as the Dual Problem. Duality provides a different perspective on the same 
              optimization problem, helping in better understanding, solving efficiently, and deriving 
              valuable economic interpretations.
            </Text>
            
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If the Primal is a minimization problem, the Dual is a maximization problem, and vice versa.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The Optimal Solution of the Primal and Dual problems is closely related.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The concept of Strong Duality states that if a feasible solution exists, the optimal values of both problems are equal.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Why is Duality Important?</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Verifies optimality</Text> – If the solution satisfies both primal and dual constraints, it is optimal.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Sensitivity Analysis</Text> – Helps in understanding how changes in constraints affect the solution.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Economic Interpretation</Text> – Provides insights into resource values and opportunity costs.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Simplifies Large Problems</Text> – Sometimes, solving the Dual is computationally easier than solving the Primal.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Constructing the Dual Problem</Text>
            <Text style={styles.paragraph}>
              For any Primal Linear Program, we can systematically construct its Dual using the following rules:
            </Text>
            
            <Text style={styles.subheading}>Primal (Original) Problem:</Text>
            <Text style={styles.mathText}>
              Minimize Z = ∑cᵢxᵢ
            </Text>
            <Text style={styles.paragraph}>Subject to constraints:</Text>
            <Text style={styles.mathText}>
              ∑aᵢⱼxᵢ ≥ bⱼ, ∀j{"\n"}
              xᵢ ≥ 0, ∀i
            </Text>
            
            <Text style={styles.subheading}>Dual Problem:</Text>
            <Text style={styles.mathText}>
              Maximize W = ∑bⱼyⱼ
            </Text>
            <Text style={styles.paragraph}>Subject to constraints:</Text>
            <Text style={styles.mathText}>
              ∑aᵢⱼyⱼ ≤ cᵢ, ∀i{"\n"}
              yⱼ ≥ 0, ∀j
            </Text>
            
            <Text style={styles.subheading}>Key Observations in Dual Formation:</Text>
            <Text style={styles.paragraph}>Objective Function Conversion:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If Primal is Minimization → Dual is Maximization.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If Primal is Maximization → Dual is Minimization.
              </Text>
            </View>
            
            <Text style={styles.paragraph}>Constraints Interchange:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The number of constraints in the Primal becomes the number of variables in the Dual.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The number of variables in the Primal becomes the number of constraints in the Dual.
              </Text>
            </View>
            
            <Text style={styles.paragraph}>Inequality Direction Reversal:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                A ≥ constraint in the Primal corresponds to a ≤ constraint in the Dual, and vice versa.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Properties of Duality</Text>
            
            <Text style={styles.subheading}>(i) Weak Duality Theorem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                For any feasible solution, the value of the objective function in the Dual is always ≤ the value in the Primal (for minimization problems).
              </Text>
            </View>
            <Text style={styles.paragraph}>Mathematically:</Text>
            <Text style={styles.mathText}>W* ≤ Z*</Text>
            <Text style={styles.paragraph}>
              where W* is the optimal value of the Dual, and Z* is the optimal value of the Primal.
            </Text>
            
            <Text style={styles.subheading}>(ii) Strong Duality Theorem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If an optimal solution exists for the Primal, then both problems have the same optimal value:
              </Text>
            </View>
            <Text style={styles.mathText}>W* = Z*</Text>
            
            <Text style={styles.subheading}>(iii) Complementary Slackness Theorem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If a constraint in the Primal is not binding (i.e., has slack), then the corresponding Dual variable is zero, and vice versa.
              </Text>
            </View>
            <Text style={styles.paragraph}>Mathematically:</Text>
            <Text style={styles.mathText}>
              xᵢ × (∑aᵢⱼyⱼ - cᵢ) = 0, ∀i{"\n"}
              yⱼ × (∑aᵢⱼxᵢ - bⱼ) = 0, ∀j
            </Text>
            <Text style={styles.paragraph}>
              This property is useful in finding optimal solutions efficiently.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Types of Dual Problems</Text>
            
            <Text style={styles.subheading}>(i) Standard Form Dual</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                When the Primal problem follows the standard LP format, we derive its Dual using the general rules mentioned earlier.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Dual of a Maximization Problem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If the Primal is a maximization problem, the Dual will be a minimization problem.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iii) Dual of an Equality Constraint Problem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If the Primal has an equality constraint, the corresponding Dual variable is unrestricted (i.e., it can be positive, negative, or zero).
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Special Cases in Duality</Text>
            
            <Text style={styles.subheading}>(i) Infeasibility</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If the Primal problem is infeasible, the Dual problem is either infeasible or unbounded.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If the Dual is infeasible, the Primal is either infeasible or unbounded.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Unbounded Solutions</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If the Primal problem is unbounded, the Dual problem is infeasible, and vice versa.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Applications of Duality</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Network Flow Optimization</Text> – Used in transportation, communication, and supply chain problems.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Game Theory</Text> – Duality is used in solving zero-sum games.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Economics & Finance</Text> – Helps in pricing models and resource allocation.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Machine Learning</Text> – Used in Support Vector Machines (SVMs) and optimization models.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Operations Research</Text> – Helps in sensitivity analysis and decision making.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Conclusion</Text>
            <Text style={styles.paragraph}>
              Duality in Linear Programming is a powerful concept that helps in solving problems efficiently 
              and provides deep economic interpretations. The Dual problem is always related to the Primal 
              problem, and its solution can be used to verify optimality. The Strong Duality Theorem guarantees 
              that both Primal and Dual have the same optimal value, making Duality a fundamental tool in 
              optimization and decision-making.
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