import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function BranchAndBoundExplanation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Branch and Bound</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to Branch and Bound</Text>
            <Text style={styles.paragraph}>
              Branch and Bound (B&B) is a systematic search algorithm used to solve combinatorial optimization 
              problems. It is widely used in:
            </Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Integer Programming</Text> (e.g., Traveling Salesman Problem, Knapsack Problem)
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Combinatorial Optimization</Text> (e.g., Graph Coloring, Job Scheduling)
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Nonlinear Optimization</Text>
              </Text>
            </View>
            <Text style={styles.paragraph}>
              This algorithm efficiently finds optimal solutions by systematically dividing (branching) the 
              solution space and eliminating (bounding) unpromising regions to reduce computation time.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Basic Idea of Branch and Bound</Text>
            <Text style={styles.paragraph}>
              The method explores all possible solutions but uses bounding techniques to prune suboptimal 
              branches, avoiding unnecessary calculations.
            </Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>🔹</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Branching</Text> → Divides the problem into smaller subproblems.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>🔹</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Bounding</Text> → Computes an upper/lower bound to eliminate unpromising solutions.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>🔹</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Pruning</Text> → Discards branches that cannot contain the optimal solution.
              </Text>
            </View>
            <Text style={styles.paragraph}>
              Unlike Brute Force (Exponential Search), B&B avoids searching unnecessary paths, making it much faster.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Steps in Branch and Bound Algorithm</Text>
            
            <Text style={styles.subheading}>Step 1: Define the Objective Function</Text>
            <Text style={styles.paragraph}>
              Formulate the problem as:
            </Text>
            <Text style={styles.mathText}>
              Maximize or Minimize Z = f(x₁, x₂, ..., xₙ)
            </Text>
            <Text style={styles.paragraph}>Subject to constraints:</Text>
            <Text style={styles.mathText}>
              gᵢ(x₁, x₂, ..., xₙ) ≤ bᵢ, xⱼ ∈ Z⁺ (for integer programming)
            </Text>
            
            <Text style={styles.subheading}>Step 2: Compute an Initial Upper/Lower Bound</Text>
            <Text style={styles.paragraph}>
              Solve a relaxed version of the problem (ignoring integer constraints). This provides an initial 
              bound to compare new solutions.
            </Text>
            
            <Text style={styles.subheading}>Step 3: Branching (Divide into Subproblems)</Text>
            <Text style={styles.paragraph}>
              Choose a decision variable and create two new subproblems by fixing it to different values.
            </Text>
            <Text style={styles.paragraph}>
              Example: If x₁ must be integer but is 3.7, create:
            </Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Branch 1: Solve with x₁ ≤ 3.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Branch 2: Solve with x₁ ≥ 4.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 4: Bounding (Compute Upper/Lower Bound for Each Branch)</Text>
            <Text style={styles.paragraph}>
              Solve each subproblem's relaxed version to get a bound. If a subproblem's bound is worse than 
              the best-known solution, prune it.
            </Text>
            
            <Text style={styles.subheading}>Step 5: Pruning (Eliminate Unpromising Branches)</Text>
            <Text style={styles.paragraph}>
              If a subproblem cannot improve the best solution found so far, discard it. This significantly 
              reduces the search space.
            </Text>
            
            <Text style={styles.subheading}>Step 6: Continue Until All Subproblems Are Processed</Text>
            <Text style={styles.paragraph}>
              The best feasible solution found is the optimal solution.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Types of Branch and Bound</Text>
            
            <Text style={styles.subheading}>(i) FIFO (Breadth-First) Branch and Bound</Text>
            <Text style={styles.paragraph}>
              Expands nodes in a FIFO queue order. Ensures an optimal solution is found early, but requires more memory.
            </Text>
            
            <Text style={styles.subheading}>(ii) LIFO (Depth-First) Branch and Bound</Text>
            <Text style={styles.paragraph}>
              Expands nodes in a stack order (DFS-like). Uses less memory but may take longer to reach an optimal solution.
            </Text>
            
            <Text style={styles.subheading}>(iii) Best-First Branch and Bound (A Strategy)</Text>
            <Text style={styles.paragraph}>
              Expands the node with the best bound first, reducing search space efficiently. Used in problems like TSP, Knapsack, and Scheduling.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Advantages of Branch and Bound</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Always Finds Optimal Solutions</Text> – Unlike heuristics, B&B guarantees optimality.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Prunes Unnecessary Computation</Text> – Reduces time complexity significantly.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Works for Integer and Combinatorial Optimization</Text> – Used in Integer Programming, Scheduling, and Routing problems.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Applications of Branch and Bound</Text>
            
            <Text style={styles.subheading}>(i) Integer Linear Programming (ILP)</Text>
            <Text style={styles.paragraph}>
              Used to solve Mixed-Integer Linear Programs (MILP) in logistics and resource allocation.
            </Text>
            
            <Text style={styles.subheading}>(ii) Traveling Salesman Problem (TSP)</Text>
            <Text style={styles.paragraph}>
              Finds the shortest tour visiting all cities exactly once.
            </Text>
            
            <Text style={styles.subheading}>(iii) Knapsack Problem</Text>
            <Text style={styles.paragraph}>
              Maximizes total value while respecting a weight constraint.
            </Text>
            
            <Text style={styles.subheading}>(iv) Job Scheduling</Text>
            <Text style={styles.paragraph}>
              Assigns jobs to machines optimally, minimizing makespan.
            </Text>
            
            <Text style={styles.subheading}>(v) Graph Coloring</Text>
            <Text style={styles.paragraph}>
              Minimizes colors required to color a graph with no adjacent nodes sharing the same color.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Conclusion</Text>
            <Text style={styles.paragraph}>
              Branch and Bound is a powerful, systematic method for solving combinatorial and integer optimization 
              problems. It finds the optimal solution efficiently by eliminating unnecessary calculations using 
              bounding and pruning techniques.
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