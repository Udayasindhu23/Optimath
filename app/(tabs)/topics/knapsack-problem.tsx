import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function KnapsackProblemExplanation() {
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
          <Text style={styles.title}>Knapsack Problem</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to the Knapsack Problem</Text>
            <Text style={styles.paragraph}>
              The Knapsack Problem is a combinatorial optimization problem where we have a set of items, each 
              with a weight and value, and we need to maximize the total value while ensuring the total weight 
              does not exceed a given capacity.
            </Text>
            <Text style={styles.paragraph}>This problem has applications in:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Resource Allocation</Text> (Budgeting, Bandwidth Allocation)
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Cryptography</Text> (Subset Sum Problems)
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Artificial Intelligence</Text> (Decision-Making, Game Theory)
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Logistics and Supply Chain Optimization</Text>
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Problem Statement</Text>
            <Text style={styles.paragraph}>
              Given:
            </Text>
            <Text style={styles.mathText}>
              n items, each with weight wᵢ and value vᵢ.
            </Text>
            <Text style={styles.mathText}>
              A knapsack with capacity W.
            </Text>
            <Text style={styles.paragraph}>
              Find: A subset of items maximizing the total value while ensuring the total weight does not exceed W.
            </Text>
            <Text style={styles.paragraph}>
              Mathematically, the optimization problem is:
            </Text>
            <Text style={styles.mathText}>
              Maximize Z = ∑ᵢ=1ⁿ vᵢxᵢ
            </Text>
            <Text style={styles.paragraph}>Subject to:</Text>
            <Text style={styles.mathText}>
              ∑ᵢ=1ⁿ wᵢxᵢ ≤ W, xᵢ ∈ {'{0,1}'}
            </Text>
            <Text style={styles.paragraph}>
              where xᵢ = 1 if the item is selected, otherwise xᵢ = 0.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Types of Knapsack Problems</Text>
            
            <Text style={styles.subheading}>(i) 0/1 Knapsack Problem</Text>
            <Text style={styles.paragraph}>
              Each item can either be taken or not (no fractional choices).
              Example: Packing a bag for travel where you either take an item or leave it.
            </Text>
            
            <Text style={styles.subheading}>(ii) Fractional Knapsack Problem</Text>
            <Text style={styles.paragraph}>
              Items can be divided (partial items allowed).
              Example: Carrying a mixture of gold, silver, and water in a spaceship.
              Solved efficiently using Greedy Algorithms.
            </Text>
            
            <Text style={styles.subheading}>(iii) Bounded Knapsack Problem</Text>
            <Text style={styles.paragraph}>
              Each item has a limited quantity (e.g., we can take at most 3 of an item).
            </Text>
            
            <Text style={styles.subheading}>(iv) Unbounded Knapsack Problem</Text>
            <Text style={styles.paragraph}>
              Unlimited supply of each item (e.g., infinite coins for making change).
              Solved using Dynamic Programming (DP).
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Methods to Solve the Knapsack Problem</Text>
            
            <Text style={styles.subheading}>(i) Brute Force (Exponential Search) – O(2ⁿ)</Text>
            <Text style={styles.paragraph}>
              Tries all possible subsets to find the optimal solution.
              Time complexity is exponential, so it's impractical for large n.
            </Text>
            
            <Text style={styles.subheading}>(ii) Dynamic Programming (DP) – O(nW)</Text>
            <Text style={styles.paragraph}>
              Uses tabulation to break the problem into smaller subproblems.
              Builds a DP table where:
            </Text>
            <Text style={styles.mathText}>
              DP[i][w] = maximum value for first i items and capacity w.
            </Text>
            <Text style={styles.paragraph}>
              Efficient for large problems, but requires memory.
            </Text>
            
            <Text style={styles.subheading}>(iii) Greedy Approach (For Fractional Knapsack) – O(nlogn)</Text>
            <Text style={styles.paragraph}>
              Sorts items by value-to-weight ratio vᵢ/wᵢ.
              Takes as much of the highest ratio item as possible.
              Optimal for fractional knapsack, but not for 0/1 knapsack.
            </Text>
            
            <Text style={styles.subheading}>(iv) Branch and Bound – O(n!) (Faster than Brute Force)</Text>
            <Text style={styles.paragraph}>
              Uses bounding functions to eliminate suboptimal solutions.
              Works well for large-scale problems with integer constraints.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Steps in Solving 0/1 Knapsack Using Dynamic Programming</Text>
            
            <Text style={styles.subheading}>Step 1: Define the DP State</Text>
            <Text style={styles.paragraph}>
              Let DP[i][w] represent the maximum value using the first i items with a weight limit w.
            </Text>
            
            <Text style={styles.subheading}>Step 2: Define the Recurrence Relation</Text>
            <Text style={styles.paragraph}>
              For each item i, we have two choices:
            </Text>
            <Text style={styles.paragraph}>
              Exclude the item → Use previous solution:
            </Text>
            <Text style={styles.mathText}>
              DP[i][w] = DP[i−1][w]
            </Text>
            <Text style={styles.paragraph}>
              Include the item (if weight allows) → Add item's value and reduce capacity:
            </Text>
            <Text style={styles.mathText}>
              DP[i][w] = max(DP[i−1][w], DP[i−1][w−wᵢ] + vᵢ)
            </Text>
            
            <Text style={styles.subheading}>Step 3: Initialize Base Cases</Text>
            <Text style={styles.mathText}>
              DP[0][w] = 0 ∀w
            </Text>
            <Text style={styles.paragraph}>
              (If no items are chosen, max value is 0).
            </Text>
            
            <Text style={styles.subheading}>Step 4: Compute DP Table</Text>
            <Text style={styles.paragraph}>
              Iterate over all items and capacities, filling the table bottom-up.
            </Text>
            
            <Text style={styles.subheading}>Step 5: Extract the Optimal Solution</Text>
            <Text style={styles.paragraph}>
              The final answer is DP[n][W], which gives the maximum possible value.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Advantages of Knapsack Algorithms</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Optimizes Resource Allocation</Text> – Used in scheduling, finance, and AI.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Efficient Solving Techniques</Text> – DP and Greedy approaches make it solvable in practical time.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Real-World Applicability</Text> – Used in logistics, budgeting, cryptography, and decision-making.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Applications of the Knapsack Problem</Text>
            
            <Text style={styles.subheading}>(i) Financial Portfolio Optimization</Text>
            <Text style={styles.paragraph}>
              Selecting investments with maximum returns under a budget constraint.
            </Text>
            
            <Text style={styles.subheading}>(ii) Supply Chain and Logistics</Text>
            <Text style={styles.paragraph}>
              Optimizing cargo shipment to maximize profit while respecting weight limits.
            </Text>
            
            <Text style={styles.subheading}>(iii) Cryptography (Subset Sum Problem)</Text>
            <Text style={styles.paragraph}>
              Public-key encryption uses variants of the knapsack problem for security.
            </Text>
            
            <Text style={styles.subheading}>(iv) AI & Machine Learning (Feature Selection)</Text>
            <Text style={styles.paragraph}>
              Choosing optimal features for ML models based on computational budget.
            </Text>
            
            <Text style={styles.subheading}>(v) Cloud Computing & Scheduling</Text>
            <Text style={styles.paragraph}>
              Assigning tasks to limited resources efficiently.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Conclusion</Text>
            <Text style={styles.paragraph}>
              The Knapsack Problem is a fundamental combinatorial optimization problem with diverse real-world 
              applications. It can be solved using Dynamic Programming, Greedy Algorithms, and Branch & Bound, 
              making it a powerful tool in AI, finance, logistics, and decision-making.
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