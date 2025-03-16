import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TravellingSalesmanProblemExplanation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.push('/topics/combinatorial')}
      >
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Travelling Salesman Problem (TSP)</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to TSP</Text>
            <Text style={styles.paragraph}>
              The Travelling Salesman Problem (TSP) is a combinatorial optimization problem that asks:
            </Text>
            <Text style={styles.paragraph}>
              "Given a set of cities and the distances between them, what is the shortest possible route that 
              visits each city exactly once and returns to the starting city?"
            </Text>
            <Text style={styles.paragraph}>
              TSP is a NP-hard problem, meaning there is no known efficient algorithm to solve it exactly for 
              large inputs.
            </Text>
            <Text style={styles.paragraph}>Applications of TSP:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Logistics & Supply Chain</Text> – Optimizing delivery routes.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Manufacturing</Text> – Circuit board design, robotic movement.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>AI & Robotics</Text> – Route planning for autonomous systems.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Genomics</Text> – DNA sequencing optimization.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Networking</Text> – Data packet routing in telecommunications.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Problem Statement</Text>
            <Text style={styles.paragraph}>
              Given:
            </Text>
            <Text style={styles.mathText}>
              A set of n cities.
            </Text>
            <Text style={styles.mathText}>
              A distance matrix D where D(i, j) is the cost (distance/time) to travel from city i to city j.
            </Text>
            <Text style={styles.paragraph}>
              Find: A tour that minimizes the total travel distance while visiting each city exactly once and 
              returning to the starting point.
            </Text>
            <Text style={styles.paragraph}>
              Mathematical Formulation:
            </Text>
            <Text style={styles.mathText}>
              Minimize Z = ∑ᵢ=1ⁿ ∑ⱼ=1ⁿ D(i,j)X(i,j)
            </Text>
            <Text style={styles.paragraph}>Subject to:</Text>
            <Text style={styles.mathText}>
              Each city is visited exactly once.
            </Text>
            <Text style={styles.mathText}>
              The tour starts and ends at the same city.
            </Text>
            <Text style={styles.mathText}>
              No city is visited twice before completing the cycle.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Types of TSP</Text>
            
            <Text style={styles.subheading}>(i) Symmetric TSP (STSP)</Text>
            <Text style={styles.paragraph}>
              The distance between two cities is the same in both directions: D(i,j) = D(j,i)
              Example: Road travel between cities (if roads are bidirectional).
            </Text>
            
            <Text style={styles.subheading}>(ii) Asymmetric TSP (ATSP)</Text>
            <Text style={styles.paragraph}>
              The distance from one city to another may not be the same: D(i,j) ≠ D(j,i)
              Example: Airfare pricing (flights may have different costs in different directions).
            </Text>
            
            <Text style={styles.subheading}>(iii) Metric TSP</Text>
            <Text style={styles.paragraph}>
              The distance satisfies the triangle inequality: D(i,j) + D(j,k) ≥ D(i,k)
              Example: Shortest-path-based routing in networks.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Methods to Solve TSP</Text>
            
            <Text style={styles.subheading}>(i) Brute Force / Exhaustive Search – O(n!)</Text>
            <Text style={styles.paragraph}>
              Generates all n! possible tours and selects the shortest one.
              Impractical for large inputs due to factorial time complexity.
            </Text>
            
            <Text style={styles.subheading}>(ii) Dynamic Programming – Held-Karp Algorithm – O(n²2ⁿ)</Text>
            <Text style={styles.paragraph}>
              Uses a state-space representation to store results for smaller subproblems.
              Faster than brute force, but still exponential in complexity.
            </Text>
            
            <Text style={styles.subheading}>(iii) Branch and Bound (B&B) – O(n!) (Faster than brute force)</Text>
            <Text style={styles.paragraph}>
              Uses bounding techniques to eliminate unnecessary paths.
              Works better for small to medium-sized problems.
            </Text>
            
            <Text style={styles.subheading}>(iv) Approximation Algorithms</Text>
            <Text style={styles.paragraph}>
              For large-scale problems, we use heuristics:
            </Text>
            <Text style={styles.paragraph}>
              Nearest Neighbor (Greedy) – O(n²)
              Start at a city and greedily visit the nearest unvisited city.
              Fast but not optimal (can give 25% longer paths).
            </Text>
            <Text style={styles.paragraph}>
              Minimum Spanning Tree (MST) Approximation – O(nlogn)
              Builds an MST and converts it into a tour.
              Guarantees a 2x approximation of the optimal solution.
            </Text>
            <Text style={styles.paragraph}>
              Christofides Algorithm – O(n³)
              Uses MST, perfect matching, and Eulerian cycles.
              Guarantees a 1.5x approximation for metric TSP.
            </Text>
            
            <Text style={styles.subheading}>(v) Metaheuristics (AI-based Optimization)</Text>
            <Text style={styles.paragraph}>
              For real-world large-scale TSP, we use AI-based methods:
            </Text>
            <Text style={styles.paragraph}>
              Genetic Algorithm (GA) – Uses natural selection to evolve better tours.
            </Text>
            <Text style={styles.paragraph}>
              Ant Colony Optimization (ACO) – Simulates how ants find the shortest paths.
            </Text>
            <Text style={styles.paragraph}>
              Simulated Annealing (SA) – Uses probability-based exploration.
            </Text>
            <Text style={styles.paragraph}>
              Particle Swarm Optimization (PSO) – Inspired by bird flocking behavior.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Steps in Solving TSP Using Dynamic Programming (Held-Karp Algorithm)</Text>
            
            <Text style={styles.subheading}>Step 1: Define the DP State</Text>
            <Text style={styles.paragraph}>
              Let dp[subset][i] be the minimum cost to visit all cities in 'subset' and end at city i.
            </Text>
            
            <Text style={styles.subheading}>Step 2: Define the Recurrence Relation</Text>
            <Text style={styles.paragraph}>
              For each subset S and city j,
            </Text>
            <Text style={styles.mathText}>
              {"dp[S][j] = minᵢ∈S,i≠j (dp[S-{j}][i] + D(i,j))"}
            </Text>
            <Text style={styles.paragraph}>
              {"where S-{j} is the subset excluding city j."}
            </Text>
            
            <Text style={styles.subheading}>Step 3: Base Case</Text>
            <Text style={styles.mathText}>
              {"dp[{0}][0] = 0"}
            </Text>
            <Text style={styles.paragraph}>
              Starting from city 0.
            </Text>
            
            <Text style={styles.subheading}>Step 4: Compute DP Table Bottom-Up</Text>
            <Text style={styles.paragraph}>
              Iterate through all subsets and cities, filling the table.
            </Text>
            
            <Text style={styles.subheading}>Step 5: Extract the Optimal Tour</Text>
            <Text style={styles.mathText}>
              {"minⱼ (dp[{1,2,...,n}][j] + D(j,0))"}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Advantages of TSP Optimization</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Reduces Travel Costs</Text> – Saves fuel, time, and resources.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Improves Decision-Making</Text> – Used in AI-based logistics planning.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Scalable with Heuristics</Text> – Can solve problems with thousands of cities.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Real-World Applications of TSP</Text>
            
            <Text style={styles.subheading}>(i) Logistics & Delivery Services</Text>
            <Text style={styles.paragraph}>
              Amazon, UPS, FedEx use TSP algorithms to find the best delivery routes.
            </Text>
            
            <Text style={styles.subheading}>(ii) Manufacturing & Robotics</Text>
            <Text style={styles.paragraph}>
              Optimizing robotic arm movement in assembling car parts.
            </Text>
            
            <Text style={styles.subheading}>(iii) AI & Machine Learning</Text>
            <Text style={styles.paragraph}>
              Used in genetic sequencing and data clustering.
            </Text>
            
            <Text style={styles.subheading}>(iv) Network Optimization</Text>
            <Text style={styles.paragraph}>
              Routing data packets efficiently over the internet.
            </Text>
            
            <Text style={styles.subheading}>(v) Space Exploration</Text>
            <Text style={styles.paragraph}>
              NASA uses TSP for path planning of Mars rovers.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Conclusion</Text>
            <Text style={styles.paragraph}>
              The Travelling Salesman Problem (TSP) is one of the most fundamental problems in combinatorial 
              optimization. While exact solutions are computationally expensive, heuristics and AI-based 
              approaches provide fast and near-optimal solutions for real-world applications.
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