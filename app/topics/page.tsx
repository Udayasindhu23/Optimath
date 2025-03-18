import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const allTopics = [
  {
    title: 'Linear Programming',
    topics: [
      { id: 'graphical-method', title: 'Graphical Method' },
      { id: 'simplex-method', title: 'Simplex Method' },
      { id: 'transportation-problem', title: 'Transportation Problem' },
      { id: 'duality-concept', title: 'Duality Concept' },
      { id: 'farkas-lemma', title: "Farkas' Lemma" },
      { id: 'karmarkars-algorithm', title: "Karmarkar's Algorithm" },
    ]
  },
  {
    title: 'Combinatorial Optimization',
    topics: [
      { id: 'branch-and-bound', title: 'Branch & Bound' },
      { id: 'knapsack-problem', title: 'Knapsack Problem' },
      { id: 'travelling-salesman-problem', title: 'Travelling Salesman Problem' },
    ]
  },
  {
    title: 'Non-Linear Programming',
    topics: [
      { id: 'quadratic-programming', title: 'Quadratic Programming' },
      { id: 'kkt-conditions', title: 'KKT Conditions' },
    ]
  },
  {
    title: 'Infinite Dimensional Optimization',
    topics: [
      { id: 'metaheuristics', title: 'Metaheuristics' },
      { id: 'genetic-algorithms', title: 'Genetic Algorithms' },
    ]
  }
];

export default function Topics() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            router.replace('/(tabs)');
          }}>
          <ArrowLeft size={24} color="#1e293b" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Topics</Text>
      </View>

      <ScrollView style={styles.content}>
        {allTopics.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.topics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                style={styles.topicItem}
                onPress={() => router.push({
                  pathname: '/topics/[id]',
                  params: { id: topic.id }
                })}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#ffffff',
  },
  topicTitle: {
    fontSize: 16,
    color: '#334155',
  },
  arrow: {
    fontSize: 18,
    color: '#64748b',
  },
}); 