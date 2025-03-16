import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TransportationProblemExplanation() {
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
          <Text style={styles.title}>Transportation Problem</Text>
        </View>

        <View style={styles.content}>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction to the Transportation Problem</Text>
            <Text style={styles.paragraph}>
            <Text style={styles.paragraph}>
              The Transportation Problem is a special type of Linear Programming Problem (LPP) that deals 
              with optimizing the transportation of goods from multiple sources (supply points) to multiple 
              destinations (demand points) while minimizing cost. It is widely used in logistics, supply 
              chain management, and operations research.
            </Text>
              The goal of the transportation problem is to determine the optimal transportation plan that 
              satisfies supply and demand constraints at minimum cost.
            </Text>
            
            <Text style={styles.subheading}>Key Components</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Supply Points (Sources)</Text> – Locations where goods are produced (e.g., factories, warehouses).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Demand Points (Destinations)</Text> – Locations where goods are required (e.g., stores, customers).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Transportation Cost Matrix</Text> – A matrix that represents the cost of transporting goods from each source to each destination.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Decision Variables</Text> – The number of goods to be transported from each source to each destination.
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Mathematical Formulation</Text>
            <Text style={styles.paragraph}>Let:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                m = Number of supply points
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                n = Number of demand points
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Sᵢ = Supply available at source i
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Dⱼ = Demand required at destination j
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Cᵢⱼ = Cost of transporting one unit from source i to destination j
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Xᵢⱼ = Number of units transported from source i to destination j
              </Text>
            </View>
            
            <Text style={styles.paragraph}>The objective function (to minimize total transportation cost) is:</Text>
            <Text style={styles.mathText}>
              min Z = ∑ᵢ₌₁ᵐ ∑ⱼ₌₁ⁿ Cᵢⱼ × Xᵢⱼ
            </Text>
            
            <Text style={styles.paragraph}>Subject to supply constraints:</Text>
            <Text style={styles.mathText}>
              ∑ⱼ₌₁ⁿ Xᵢⱼ ≤ Sᵢ, ∀i=1,2,...,m
            </Text>
            
            <Text style={styles.paragraph}>And demand constraints:</Text>
            <Text style={styles.mathText}>
              ∑ᵢ₌₁ᵐ Xᵢⱼ ≥ Dⱼ, ∀j=1,2,...,n
            </Text>
            
            <Text style={styles.paragraph}>And non-negativity constraint:</Text>
            <Text style={styles.mathText}>
              Xᵢⱼ ≥ 0
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Types of Transportation Problems</Text>
            
            <Text style={styles.subheading}>(i) Balanced Transportation Problem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The total supply equals total demand: ∑Sᵢ = ∑Dⱼ
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                No dummy variables needed.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Unbalanced Transportation Problem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                When total supply ≠ total demand, we introduce a dummy source or dummy destination to balance the problem.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Solution Methods</Text>
            <Text style={styles.paragraph}>
              There are two main phases in solving a transportation problem:
            </Text>
            
            <Text style={styles.subheading}>Phase 1: Finding an Initial Feasible Solution (IFS)</Text>
            <Text style={styles.paragraph}>
              Before applying optimization, we need an initial feasible solution using one of the following methods:
            </Text>
            
            <Text style={styles.subheading}>1️⃣ North-West Corner Method (NWCM)</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Starts at the top-left (north-west) cell and assigns as many units as possible.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Moves right or downward until all supply and demand are satisfied.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Simple but does not guarantee the optimal solution.
              </Text>
            </View>
            
            <Text style={styles.subheading}>2️⃣ Least Cost Method (LCM)</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Selects the cell with the least transportation cost and allocates as many units as possible.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Repeats until all supply and demand are met.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                More efficient than NWCM.
              </Text>
            </View>
            
            <Text style={styles.subheading}>3️⃣ Vogel's Approximation Method (VAM)</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Considers the penalty cost (difference between the two smallest costs in a row/column).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Selects the cell with the lowest cost in the row/column with the highest penalty.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Produces a better initial solution than NWCM and LCM.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Phase 2: Optimizing the Solution</Text>
            <Text style={styles.paragraph}>
              Once an initial solution is found, we optimize it using:
            </Text>
            
            <Text style={styles.subheading}>1️⃣ MODI Method (Modified Distribution Method)</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Computes opportunity cost for each unallocated cell.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If all opportunity costs are non-negative, the solution is optimal.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Otherwise, loop formation is used to adjust allocations.
              </Text>
            </View>
            
            <Text style={styles.subheading}>2️⃣ Stepping Stone Method</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Finds unused routes and evaluates their impact on the total cost.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If any stepping stone path reduces cost, reallocation is done.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Repeats until an optimal solution is found.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Special Cases</Text>
            
            <Text style={styles.subheading}>(i) Degeneracy in Transportation Problem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Occurs when the number of allocated cells is less than m+n−1.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Solved by introducing dummy allocations (small epsilon value, ϵ).
              </Text>
            </View>
            
            <Text style={styles.subheading}>(ii) Multiple Optimal Solutions</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If more than one transportation plan gives the same cost, we have multiple optimal solutions.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iii) Prohibited Routes</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Some routes might be restricted (e.g., road closures, regulations).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Such cells are assigned infinity (∞) cost.
              </Text>
            </View>
            
            <Text style={styles.subheading}>(iv) Maximization Transportation Problem</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Instead of minimizing cost, some problems maximize profit or efficiency.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Convert to a minimization problem by subtracting all costs from a large constant.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Applications</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Supply Chain & Logistics</Text> – Optimizing warehouse-to-store deliveries.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Manufacturing</Text> – Allocating raw materials to different factories.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Healthcare</Text> – Efficient distribution of vaccines and medical supplies.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Agriculture</Text> – Transporting perishable goods to markets at minimum cost.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                <Text style={styles.bold}>Energy & Resources</Text> – Optimizing fuel and power distribution.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Conclusion</Text>
            <Text style={styles.paragraph}>
              The Transportation Problem is one of the most important applications of Linear Programming 
              in real-world logistics and supply chain management. It ensures cost-efficient resource 
              distribution while maintaining supply and demand balance. The MODI Method and Stepping Stone 
              Method help in achieving an optimal solution, while Vogel's Approximation Method (VAM) is the 
              best choice for an initial feasible solution.
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