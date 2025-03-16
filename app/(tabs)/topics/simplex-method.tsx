import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SimplexMethodExplanation() {
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
          <Text style={styles.title}>Simplex Method</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to Simplex Method</Text>
            <Text style={styles.paragraph}>
              The Simplex Method is an iterative algebraic approach for solving Linear Programming 
              Problems (LPPs) involving two or more decision variables. Unlike the Graphical Method, 
              which is limited to two variables, the Simplex Method efficiently handles large-scale 
              optimization problems.
            </Text>
            <Text style={styles.paragraph}>
              The Simplex Method was developed by George Dantzig in 1947 and is widely used in operations 
              research, logistics, and optimization. It follows a systematic approach to move from one 
              feasible solution to another until the optimal solution is reached.
            </Text>
            
            <Text style={styles.subheading}>Key Concepts in Simplex Method</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Basic Feasible Solution (BFS)</Text> – A solution satisfying all constraints and having non-negative values for decision variables.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Pivot Element</Text> – The element used to perform row operations to improve the solution.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Objective Function</Text> – The function to be maximized or minimized (e.g., Z = c₁x₁ + c₂x₂ + ⋯ + cₙxₙ).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Slack, Surplus, and Artificial Variables</Text> – Additional variables introduced to convert inequalities into equations.
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Steps in the Simplex Method</Text>
            
            <Text style={styles.subheading}>Step 1: Convert the Problem into Standard Form</Text>
            <Text style={styles.paragraph}>Express the objective function as:</Text>
            <Text style={styles.mathText}>Z = c₁x₁ + c₂x₂ + ⋯ + cₙxₙ</Text>
            <Text style={styles.paragraph}>Convert all constraints into equalities by adding:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Slack Variables (for ≤ constraints)
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Surplus Variables (for ≥ constraints) along with Artificial Variables
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 2: Construct the Initial Simplex Table</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Set up a tableau representing the objective function, constraints, and variables.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Include coefficients of all variables in the table.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Identify the Basic Variables (BVs) (initially, slack or artificial variables).
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 3: Identify the Entering Variable</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Look at the bottom row (Objective Function row) in the tableau.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Choose the most negative coefficient (for maximization problems) as the entering variable.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                This variable will increase the objective function value.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 4: Identify the Leaving Variable (Minimum Ratio Test)</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Divide the right-hand side (RHS) values by their corresponding pivot column values (only for positive entries).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The smallest positive ratio determines the leaving variable.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 5: Perform Row Operations (Pivoting)</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Identify the pivot element (intersection of the entering and leaving variable row).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Transform the pivot row so that the pivot element becomes 1 and all other elements in the column become 0.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Use Gauss-Jordan elimination to update the entire tableau.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 6: Check for Optimality</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If all coefficients in the objective row are non-negative, the solution is optimal.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If there are negative coefficients, repeat steps 3 to 5 with the updated tableau.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 7: Interpret the Final Tableau</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The values of basic variables in the final tableau give the optimal solution.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The objective function value (Z) is found in the RHS of the bottom row.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Special Cases in Simplex Method</Text>
            
            <Text style={styles.subheading}>(i) Unbounded Solution</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Occurs when there is no upper bound on the objective function value.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Identified when a pivot column has no positive elements in the constraint rows.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Degeneracy</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Occurs when the minimum ratio test leads to a tie (two or more rows have the same ratio).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                This can cause cycling, requiring perturbation techniques to resolve.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iii) Infeasible Solution</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Happens when artificial variables remain in the basis after optimization, meaning there is no feasible solution.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iv) Alternative Optimal Solutions</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Occurs when multiple solutions give the same optimal Z value.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Happens when a non-basic variable has a zero coefficient in the objective row.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Advantages & Limitations</Text>
            
            <Text style={styles.subheading}>✅ Advantages</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                Works for large-scale problems with multiple variables.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                Always finds an optimal solution if one exists.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                Systematic, step-by-step approach ensures correctness.
              </Text>
            </View>
            
            <Text style={styles.subheading}>❌ Limitations</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>❌</Text>
              <Text style={styles.bulletText}>
                Computationally expensive for very large problems.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>❌</Text>
              <Text style={styles.bulletText}>
                Cannot handle integer constraints (requires Integer Programming).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>❌</Text>
              <Text style={styles.bulletText}>
                May lead to cycling in rare cases.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Conclusion</Text>
            <Text style={styles.paragraph}>
              The Simplex Method is a powerful technique for solving linear programming problems with 
              more than two variables. It systematically moves from one solution to another, improving 
              at each step until an optimal solution is found. While computationally intensive, it 
              remains the foundation for solving LP problems in real-world applications like logistics, 
              finance, and manufacturing.
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