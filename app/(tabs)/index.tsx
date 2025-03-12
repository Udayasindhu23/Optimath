import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Brain, Grape as Graph, Infinity, GitBranch, ArrowLeft } from 'lucide-react-native';

const topics = [
  {
    id: 'linear',
    title: 'Linear Programming',
    description: 'Graphical methods, Simplex, Transportation problems and more',
    icon: Graph,
    color: '#3b82f6',
  },
  {
    id: 'combinatorial',
    title: 'Combinatorial Optimization',
    description: 'Integer programming, Knapsack, TSP and more',
    icon: GitBranch,
    color: '#ec4899',
  },
  {
    id: 'nonlinear',
    title: 'Non-Linear Programming',
    description: 'Quadratic programming, KKT conditions and more',
    icon: Brain,
    color: '#10b981',
  },
  {
    id: 'infinite',
    title: 'Infinite Dimensional Optimization',
    description: 'Metaheuristics, Genetic algorithms and more',
    icon: Infinity,
    color: '#8b5cf6',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1e293b" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>OptiMath</Text>
        <Text style={styles.subtitle}>
          Mathematical Programming Learning & Solver Platform
        </Text>
      </View>

      <View style={styles.grid}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.card}
            onPress={() => router.push(`/topics/${topic.id}`)}>
            <View style={[styles.iconContainer, { backgroundColor: topic.color }]}>
              <topic.icon size={24} color="#ffffff" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{topic.title}</Text>
              <Text style={styles.cardDescription}>{topic.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>Created by Udaya Sindhu</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  footer: {
    marginTop: 32,
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
    padding: 8,
  },
  backButtonText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
});