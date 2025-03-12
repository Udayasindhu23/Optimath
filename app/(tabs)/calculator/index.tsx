import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Grape as Graph, GitBranch, Brain, Infinity, Network, GitFork, Package, Route } from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';

interface CalculatorItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  comingSoon?: boolean;
}

interface CalculatorSection {
  title: string;
  items: CalculatorItem[];
}

const calculatorSections: CalculatorSection[] = [
  {
    title: 'Linear Programming',
    items: [
      {
        id: 'graphical',
        title: 'Graphical Method',
        description: 'Solve 2D linear programming problems visually',
        icon: Graph,
        color: '#3b82f6',
      },
      {
        id: 'simplex',
        title: 'Simplex Method',
        description: 'Solve linear programming problems algebraically',
        icon: GitBranch,
        color: '#ec4899',
      },
      {
        id: 'transportation',
        title: 'Transportation',
        description: 'Optimize transportation and distribution problems',
        icon: Brain,
        color: '#10b981',
      },
      {
        id: 'duality',
        title: 'Duality',
        description: 'Analyze linear programming problems using duality theory',
        icon: Infinity,
        color: '#8b5cf6',
      },
    ]
  },
  {
    title: 'Combinatorial Optimization',
    items: [
      {
        id: 'branch-and-bound',
        title: 'Branch & Bound',
        description: 'Solve integer programming problems using the Branch & Bound algorithm with visual tree representation',
        icon: GitFork,
        color: '#f59e0b',
      },
      {
        id: 'knapsack',
        title: 'Knapsack Problem',
        description: 'Optimize value selection with weight constraints',
        icon: Package,
        color: '#14b8a6'
      },
      {
        id: 'traveling-salesman',
        title: 'Traveling Salesman',
        description: 'Find the shortest possible route visiting each city once',
        icon: Route,
        color: '#8b5cf6'
      },
    ]
  }
];

export default function Calculator() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {calculatorSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.grid}>
            {section.items.map((calculator) => (
              <TouchableOpacity
                key={calculator.id}
                style={[styles.card, calculator.comingSoon && styles.cardDisabled]}
                onPress={() => !calculator.comingSoon && router.push(`/(tabs)/calculator/${calculator.id}` as any)}
                disabled={calculator.comingSoon}
              >
                <View style={[styles.iconContainer, { backgroundColor: calculator.color }]}>
                  <calculator.icon size={24} color="#ffffff" />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{calculator.title}</Text>
                  <Text style={styles.cardDescription}>{calculator.description}</Text>
                  {calculator.comingSoon && (
                    <View style={styles.comingSoonBadge}>
                      <Text style={styles.comingSoonText}>Coming Soon</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
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
  cardDisabled: {
    opacity: 0.7,
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
  comingSoonBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  comingSoonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
});