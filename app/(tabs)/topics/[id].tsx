import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const topics = {
  linear: {
    title: 'Linear Programming',
    subtopics: [
      {
        title: 'Graphical Method',
        description: 'Solve linear programming problems using geometric visualization of constraints and objective function.',
      },
      {
        title: 'Simplex Method',
        description: 'An algebraic procedure for solving linear programming problems by moving from one vertex to another.',
      },
      {
        title: 'Transportation Problem',
        description: 'Special class of linear programming for transporting goods from sources to destinations.',
      },
      {
        title: 'Duality Concept',
        description: 'Every linear programming problem has an associated dual problem with intimate connections to the original.',
      },
      {
        title: "Farkas' Lemma",
        description: 'Fundamental result about systems of linear inequalities, crucial for optimization theory.',
      },
      {
        title: "Karmarkar's Algorithm",
        description: 'Interior point method for solving linear programming problems with polynomial time complexity.',
      },
    ],
  },
  combinatorial: {
    title: 'Combinatorial Optimization',
    subtopics: [
      {
        title: 'Integer Programming',
        description: 'Optimization problems where some or all variables must take integer values.',
      },
      {
        title: 'Branch & Bound',
        description: 'Systematic method for solving optimization problems by breaking them into smaller subproblems.',
      },
      {
        title: 'Knapsack Problem',
        description: 'Classic optimization problem of selecting items with maximum value while respecting weight constraints.',
      },
      {
        title: 'Travelling Salesman Problem',
        description: 'Finding the shortest possible route that visits each city exactly once and returns to the origin.',
      },
    ],
  },
  nonlinear: {
    title: 'Non-Linear Programming',
    subtopics: [
      {
        title: 'Quadratic Programming',
        description: 'Optimization problems with quadratic objective function and linear constraints.',
      },
      {
        title: "Beale's Method",
        description: 'Solving nonlinear programming problems through successive linear approximations.',
      },
      {
        title: 'Wolfe Method',
        description: 'Algorithm for solving quadratic programming problems with linear constraints.',
      },
      {
        title: 'KKT Conditions',
        description: 'Necessary conditions for optimal solutions in nonlinear programming.',
      },
      {
        title: 'Geometric Programming',
        description: 'Optimization problems where objective and constraints are posynomials.',
      },
    ],
  },
  infinite: {
    title: 'Infinite Dimensional Optimization',
    subtopics: [
      {
        title: 'Metaheuristics',
        description: 'High-level problem-independent algorithmic frameworks for optimization.',
      },
      {
        title: 'Genetic Algorithm',
        description: 'Optimization technique inspired by natural evolution process.',
      },
      {
        title: 'Ant Colony Optimization',
        description: 'Probabilistic technique for solving computational problems based on ant behavior.',
      },
      {
        title: 'Particle Swarm',
        description: 'Population-based optimization technique inspired by social behavior of birds.',
      },
      {
        title: 'Simulated Annealing',
        description: 'Probabilistic technique for approximating global optimum inspired by annealing in metallurgy.',
      },
    ],
  },
};

export default function TopicDetail() {
  const { id } = useLocalSearchParams();
  const topic = topics[id as keyof typeof topics];
  const router = useRouter();

  const navigateToDescription = (title: string, description: string) => {
    router.push({
      pathname: '/(tabs)/topics/description',
      params: { title, description }
    } as any);
  };

  if (!topic) {
    return (
      <View style={styles.container}>
        <Text>Topic not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{topic.title}</Text>
      </View>

      <View style={styles.content}>
        {topic.subtopics.map((subtopic, index) => (
          subtopic.title === 'Graphical Method' ? (
            <TouchableOpacity 
              key={index} 
              style={styles.subtopic}
              onPress={() => navigateToDescription(subtopic.title, subtopic.description)}
            >
              <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
              <Text style={styles.subtopicDescription}>{subtopic.description}</Text>
            </TouchableOpacity>
          ) : (
            <View key={index} style={styles.subtopic}>
              <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
              <Text style={styles.subtopicDescription}>{subtopic.description}</Text>
            </View>
          )
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
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
  subtopic: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  subtopicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtopicDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});