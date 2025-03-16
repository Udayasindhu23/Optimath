import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function GraphicalMethodExplanation() {
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
          <Text style={styles.title}>Graphical Method</Text>
        </View>

        <View style={styles.content}>
          

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Understanding Graphical Method – </Text>
            <Text style={styles.paragraph}>
            The Graphical Method is a visual approach to solving Linear Programming Problems (LPP) involving two decision variables. It provides an intuitive way to determine the optimal solution (maximization or minimization) by representing constraints and objective functions graphically.
            The Graphical Method works only when there are two variables because the feasible region can be represented on a 2D plane
            </Text>
           </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Steps in the Graphical Method</Text>
            
            <Text style={styles.subheading}>Step 1: Define the Problem</Text>
            <Text style={styles.paragraph}>
              Express the objective function and constraints in mathematical form:
            </Text>
            <Text style={styles.mathText}>
              Maximize or Minimize Z = ax + by
            </Text>
            <Text style={styles.paragraph}>
              Subject to constraints:
            </Text>
            <Text style={styles.mathText}>
              c₁x + d₁y ≤ k₁{"\n"}
              c₂x + d₂y ≤ k₂{"\n"}
              x, y ≥ 0
            </Text>
            
            <Text style={styles.subheading}>Step 2: Plot the Constraints</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Convert each constraint into an equation (replace inequality with '=').
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Find two points for each equation by setting:
              </Text>
            </View>
            <Text style={styles.indentedText}>
              x = 0 to find y{"\n"}
              y = 0 to find x
            </Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Plot these points on a graph and draw the corresponding lines.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 3: Identify the Feasible Region</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The feasible region is the common area satisfying all constraints (including x≥0, y≥0).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Shaded towards origin (≤) or away (≥) based on constraint type.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                If constraints form a closed polygon, the solution exists; otherwise, it might be unbounded.
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 4: Find the Corner Points</Text>
            <Text style={styles.paragraph}>
              The optimal solution always lies at one of the corner points (vertices) of the feasible region.
            </Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Identify the vertices where constraint lines intersect.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Solve for intersection points algebraically (solve equations simultaneously).
              </Text>
            </View>
            
            <Text style={styles.subheading}>Step 5: Evaluate the Objective Function</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                Compute the objective function (Z = ax + by) for each corner point.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                The maximum or minimum value gives the optimal solution.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Special Cases</Text>
            
            <Text style={styles.subheading}>(i) Unbounded Solution</Text>
            <Text style={styles.paragraph}>
              If the feasible region extends infinitely, there may be no finite optimal solution.
            </Text>
            
            <Text style={styles.subheading}>(ii) No Feasible Solution</Text>
            <Text style={styles.paragraph}>
              If the constraints contradict, no solution exists.
            </Text>
            
            <Text style={styles.subheading}>(iii) Multiple Optimal Solutions</Text>
            <Text style={styles.paragraph}>
              If the objective function is parallel to a constraint, all points along that edge are optimal.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Advantages & Limitations</Text>
            
            <Text style={styles.subheading}>✅ Advantages</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                Simple and intuitive for two-variable problems.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                Provides a visual representation of feasible regions.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>✔️</Text>
              <Text style={styles.bulletText}>
                Helps understand intersections and optimal points easily.
              </Text>
            </View>
            
            <Text style={styles.subheading}>❌ Limitations</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>❌</Text>
              <Text style={styles.bulletText}>
                Only works for two variables (not scalable for large problems).
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>❌</Text>
              <Text style={styles.bulletText}>
                Becomes complex if many constraints exist.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>❌</Text>
              <Text style={styles.bulletText}>
                Cannot handle integer constraints directly.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Conclusion</Text>
            <Text style={styles.paragraph}>
              The Graphical Method is an essential tool for solving LP problems with two variables. 
              It provides a clear, visual way to determine the optimal solution by plotting constraints 
              and evaluating the objective function at feasible corner points. However, for higher 
              dimensions, techniques like Simplex Method or Integer Programming are preferred.
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
  mainDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
    marginBottom: 24,
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
  indentedText: {
    marginLeft: 24,
    fontSize: 15,
    fontFamily: 'monospace',
    color: '#475569',
    marginBottom: 8,
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