import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Package, Plus } from 'lucide-react-native';

interface KnapsackItem {
  weight: string;
  value: string;
}

interface KnapsackSolution {
  maxValue: number;
  selectedItems: number[];
  dpTable: number[][];
  items: { weight: number; value: number; }[];
}

export default function KnapsackProblem() {
  const [data, setData] = useState({
    capacity: '',
    items: [
      { weight: '', value: '' },
      { weight: '', value: '' }
    ]
  });

  const [solution, setSolution] = useState<KnapsackSolution | null>(null);

  const handleCapacityChange = (value: string) => {
    setData(prev => ({
      ...prev,
      capacity: value
    }));
  };

  const handleItemChange = (index: number, field: 'weight' | 'value', value: string) => {
    setData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { weight: '', value: '' }]
    }));
  };

  const solveKnapsack = () => {
    const capacity = parseInt(data.capacity);
    const items = data.items.map(item => ({
      weight: parseInt(item.weight) || 0,
      value: parseInt(item.value) || 0
    }));

    // Create DP table
    const n = items.length;
    const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
    const selected = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(false));

    // Fill DP table
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i-1].weight <= w) {
          const include = items[i-1].value + dp[i-1][w - items[i-1].weight];
          const exclude = dp[i-1][w];
          if (include > exclude) {
            dp[i][w] = include;
            selected[i][w] = true;
          } else {
            dp[i][w] = exclude;
            selected[i][w] = false;
          }
        } else {
          dp[i][w] = dp[i-1][w];
          selected[i][w] = false;
        }
      }
    }

    // Backtrack to find selected items
    const selectedItems = [];
    let i = n;
    let w = capacity;
    while (i > 0 && w > 0) {
      if (selected[i][w]) {
        selectedItems.push(i - 1);
        w -= items[i-1].weight;
      }
      i--;
    }

    setSolution({
      maxValue: dp[n][capacity],
      selectedItems,
      dpTable: dp,
      items
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Package size={32} color="#14b8a6" />
        </View>
        <Text style={styles.title}>Knapsack Problem</Text>
      </View>
      
      <Text style={styles.description}>
        The Knapsack Problem is a classic optimization challenge where you need to select items 
        with different values and weights to maximize total value while staying within a weight limit.
      </Text>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.capacityContainer}>
          <Text style={styles.inputLabel}>Knapsack Capacity:</Text>
          <TextInput
            style={styles.capacityInput}
            value={data.capacity}
            onChangeText={handleCapacityChange}
            keyboardType="numeric"
            placeholder="Enter capacity"
          />
        </View>

        <Text style={styles.inputLabel}>Items:</Text>
        {data.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <TextInput
              style={styles.itemInput}
              value={item.weight}
              onChangeText={(value) => handleItemChange(index, 'weight', value)}
              keyboardType="numeric"
              placeholder="Weight"
            />
            <TextInput
              style={styles.itemInput}
              value={item.value}
              onChangeText={(value) => handleItemChange(index, 'value', value)}
              keyboardType="numeric"
              placeholder="Value"
            />
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Plus size={20} color="#666" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.solveButton} onPress={solveKnapsack}>
          <Text style={styles.solveButtonText}>Solve</Text>
        </TouchableOpacity>
      </View>

      {/* Solution Section */}
      {solution && (
        <View style={styles.solutionSection}>
          <Text style={styles.solutionTitle}>Optimal Solution</Text>
          
          <View style={styles.solutionBox}>
            <Text style={styles.solutionLabel}>Maximum Value:</Text>
            <Text style={styles.solutionValue}>{solution.maxValue}</Text>
          </View>

          <Text style={styles.solutionSubtitle}>Selected Items:</Text>
          {solution.selectedItems.map((itemIndex) => (
            <View key={itemIndex} style={styles.selectedItemRow}>
              <Text style={styles.selectedItemText}>
                Item {itemIndex + 1}: Weight = {solution.items[itemIndex].weight}, 
                Value = {solution.items[itemIndex].value}
              </Text>
            </View>
          ))}

          <Text style={styles.solutionSubtitle}>Dynamic Programming Table:</Text>
          <ScrollView horizontal>
            <View style={styles.dpTable}>
              <View style={styles.dpRow}>
                <View style={styles.dpCell}>
                  <Text style={styles.dpText}>W/i</Text>
                </View>
                {Array(parseInt(data.capacity) + 1).fill(0).map((_, i) => (
                  <View key={i} style={styles.dpCell}>
                    <Text style={styles.dpText}>{i}</Text>
                  </View>
                ))}
              </View>
              {solution.dpTable.map((row, i) => (
                <View key={i} style={styles.dpRow}>
                  <View style={styles.dpCell}>
                    <Text style={styles.dpText}>{i}</Text>
                  </View>
                  {row.map((cell, j) => (
                    <View key={j} style={styles.dpCell}>
                      <Text style={styles.dpText}>{cell}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#ccfbf1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 32,
  },
  inputSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  capacityContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  capacityInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  itemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 12,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  solveButton: {
    backgroundColor: '#14b8a6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  solveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  solutionSection: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  solutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14b8a6',
    marginBottom: 16,
  },
  solutionBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  solutionLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  solutionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14b8a6',
  },
  solutionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 12,
  },
  selectedItemRow: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  selectedItemText: {
    fontSize: 14,
    color: '#1e293b',
  },
  dpTable: {
    marginTop: 12,
  },
  dpRow: {
    flexDirection: 'row',
  },
  dpCell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dpText: {
    fontSize: 12,
    color: '#1e293b',
  },
}); 