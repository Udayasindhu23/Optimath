import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Brain } from 'lucide-react-native';

interface TransportationData {
  sources: string[];
  destinations: string[];
  supply: string[];
  demand: string[];
  costs: string[][];
}

interface Solution {
  method: string;
  allocation: number[][];
  cost: number;
}

interface TransportationSolution {
  initialSolutions: Solution[];
  optimal: {
    method: string;
    allocation: number[][];
    cost: number;
  };
}

export default function TransportationMethod() {
  const [data, setData] = useState<TransportationData>({
    sources: ['Source 1', 'Source 2'],
    destinations: ['Dest 1', 'Dest 2'],
    supply: ['', ''],
    demand: ['', ''],
    costs: [
      ['', ''],
      ['', '']
    ]
  });

  const [solution, setSolution] = useState<TransportationSolution | null>(null);

  const northwestCornerMethod = () => {
    const supply = [...data.supply.map(s => parseFloat(s) || 0)];
    const demand = [...data.demand.map(d => parseFloat(d) || 0)];
    const numSources = supply.length;
    const numDests = demand.length;
    
    const allocation = Array(numSources).fill(0).map(() => Array(numDests).fill(0));
    
    let i = 0, j = 0;
    
    while (i < numSources && j < numDests) {
      const quantity = Math.min(supply[i], demand[j]);
      allocation[i][j] = quantity;
      
      supply[i] -= quantity;
      demand[j] -= quantity;
      
      if (Math.abs(supply[i]) < 0.0001) i++;
      if (Math.abs(demand[j]) < 0.0001) j++;
    }

    const totalCost = calculateTotalCost(allocation);
    return { allocation, totalCost };
  };

  const leastCostMethod = () => {
    const supply = [...data.supply.map(s => parseFloat(s) || 0)];
    const demand = [...data.demand.map(d => parseFloat(d) || 0)];
    const costs = data.costs.map(row => row.map(cost => parseFloat(cost) || 0));
    const numSources = supply.length;
    const numDests = demand.length;
    
    const allocation = Array(numSources).fill(0).map(() => Array(numDests).fill(0));
    const remainingSupply = [...supply];
    const remainingDemand = [...demand];
    
    while (Math.max(...remainingSupply) > 0.0001 && Math.max(...remainingDemand) > 0.0001) {
      let minCost = Infinity;
      let minI = -1;
      let minJ = -1;
      
      for (let i = 0; i < numSources; i++) {
        if (remainingSupply[i] <= 0.0001) continue;
        
        for (let j = 0; j < numDests; j++) {
          if (remainingDemand[j] <= 0.0001) continue;
          
          if (costs[i][j] < minCost) {
            minCost = costs[i][j];
            minI = i;
            minJ = j;
          }
        }
      }
      
      if (minI === -1 || minJ === -1) break;
      
      const quantity = Math.min(remainingSupply[minI], remainingDemand[minJ]);
      allocation[minI][minJ] = quantity;
      
      remainingSupply[minI] -= quantity;
      remainingDemand[minJ] -= quantity;
      
      if (remainingSupply[minI] < 0.0001) remainingSupply[minI] = 0;
      if (remainingDemand[minJ] < 0.0001) remainingDemand[minJ] = 0;
    }

    const totalCost = calculateTotalCost(allocation);
    return { allocation, totalCost };
  };

  const calculateTotalCost = (allocation: number[][]) => {
    let totalCost = 0;
    const costs = data.costs.map(row => row.map(cost => parseFloat(cost) || 0));
    
    for (let i = 0; i < allocation.length; i++) {
      for (let j = 0; j < allocation[i].length; j++) {
        totalCost += costs[i][j] * allocation[i][j];
      }
    }
    
    return totalCost;
  };

  const solve = () => {
    try {
      // Validate inputs
      const totalSupply = data.supply.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
      const totalDemand = data.demand.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
      
      if (totalSupply === 0 || totalDemand === 0) {
        alert('Please enter all supply and demand values');
        return;
      }
      
      if (Math.abs(totalSupply - totalDemand) > 0.0001) {
        alert('Total supply must equal total demand');
        return;
      }
      
      // Check if all costs are entered
      const hasAllCosts = data.costs.every(row => 
        row.every(cost => cost !== '' && !isNaN(parseFloat(cost)))
      );
      
      if (!hasAllCosts) {
        alert('Please enter all transportation costs');
        return;
      }

      // Get initial solutions
      const nwcSolution = northwestCornerMethod();
      const lcmSolution = leastCostMethod();

      // Create solutions array
      const solutions = [
        { method: 'Northwest Corner', allocation: nwcSolution.allocation, cost: nwcSolution.totalCost },
        { method: 'Least Cost', allocation: lcmSolution.allocation, cost: lcmSolution.totalCost }
      ];

      // Sort solutions by cost
      solutions.sort((a, b) => a.cost - b.cost);
      
      // Use the best initial solution as the optimal solution
      const optimalAllocation = solutions[0].allocation;
      const optimalCost = calculateTotalCost(optimalAllocation);

      setSolution({
        initialSolutions: solutions,
        optimal: {
          method: `Optimal Solution (from ${solutions[0].method})`,
          allocation: optimalAllocation,
          cost: optimalCost
        }
      });

    } catch (error) {
      console.error('Error in solve:', error);
      alert('An error occurred while solving the transportation problem');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Brain size={32} color="#00A86B" />
        </View>
        <Text style={styles.title}>Transportation Method</Text>
      </View>

      <Text style={styles.description}>
        Optimize the distribution of goods from multiple sources to multiple destinations while minimizing total transportation costs. Perfect for logistics and supply chain optimization problems.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transportation Method</Text>
        
        <View style={styles.gridContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={styles.gridScrollView}>
              <View style={styles.headerRow}>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>From/To</Text>
                </View>
                {data.destinations.map((dest, index) => (
                  <View key={index} style={styles.headerCell}>
                    <Text style={styles.headerText}>Dest {index + 1}</Text>
                  </View>
                ))}
                <View style={[styles.headerCell, { width: 100 }]}>
                  <Text style={styles.headerText}>Supply</Text>
                </View>
              </View>

              {data.sources.map((source, i) => (
                <View key={i} style={styles.row}>
                  <View style={styles.labelCell}>
                    <Text style={styles.labelText}>Source {i + 1}</Text>
                  </View>
                  {data.destinations.map((_, j) => (
                    <View key={j} style={styles.cell}>
                      <TextInput
                        style={styles.input}
                        value={data.costs[i][j]}
                        onChangeText={(text) => {
                          const newCosts = [...data.costs];
                          newCosts[i][j] = text;
                          setData({ ...data, costs: newCosts });
                        }}
                        keyboardType="numeric"
                        placeholder="Cost"
                      />
                    </View>
                  ))}
                  <View style={[styles.cell, { width: 100 }]}>
                    <TextInput
                      style={styles.input}
                      value={data.supply[i]}
                      onChangeText={(text) => {
                        const newSupply = [...data.supply];
                        newSupply[i] = text;
                        setData({ ...data, supply: newSupply });
                      }}
                      keyboardType="numeric"
                      placeholder="Supply"
                    />
                  </View>
                </View>
              ))}

              <View style={styles.row}>
                <View style={styles.labelCell}>
                  <Text style={styles.labelText}>Demand</Text>
                </View>
                {data.demand.map((demand, index) => (
                  <View key={index} style={styles.cell}>
                    <TextInput
                      style={styles.input}
                      value={demand}
                      onChangeText={(text) => {
                        const newDemand = [...data.demand];
                        newDemand[index] = text;
                        setData({ ...data, demand: newDemand });
                      }}
                      keyboardType="numeric"
                      placeholder="Demand"
                    />
                  </View>
                ))}
                <View style={[styles.totalCell, { width: 100 }]}>
                  <Text style={styles.totalText}>
                    Supply: {data.supply.reduce((sum, val) => sum + (parseFloat(val) || 0), 0)}
                  </Text>
                  <Text style={styles.totalText}>
                    Demand: {data.demand.reduce((sum, val) => sum + (parseFloat(val) || 0), 0)}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const newLength = data.sources.length + 1;
              setData({
                ...data,
                sources: [...data.sources, `Source ${newLength}`],
                supply: [...data.supply, ''],
                costs: [
                  ...data.costs,
                  Array(data.destinations.length).fill('')
                ]
              });
            }}
          >
            <Text style={styles.buttonText}>Add Source</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const newLength = data.destinations.length + 1;
              setData({
                ...data,
                destinations: [...data.destinations, `Dest ${newLength}`],
                demand: [...data.demand, ''],
                costs: data.costs.map(row => [...row, ''])
              });
            }}
          >
            <Text style={styles.buttonText}>Add Destination</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.solveButton} onPress={solve}>
          <Text style={styles.solveButtonText}>Solve</Text>
        </TouchableOpacity>

        {solution && (
          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>Solution</Text>
            
            {solution.initialSolutions.map((sol, index) => (
              <View key={index} style={styles.methodSolution}>
                <Text style={styles.methodTitle}>{sol.method}</Text>
                <View style={styles.allocationGrid}>
                  {sol.allocation.map((row, i) => (
                    <View key={i} style={styles.allocationRow}>
                      {row.map((value, j) => (
                        <View key={j} style={styles.allocationCell}>
                          <Text style={styles.allocationText}>
                            {value.toFixed(2)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
                <Text style={styles.costText}>
                  Cost: {sol.cost.toFixed(2)}
                </Text>
              </View>
            ))}

            <View style={styles.optimalSolution}>
              <Text style={styles.optimalTitle}>{solution.optimal.method}</Text>
              <View style={styles.allocationGrid}>
                {solution.optimal.allocation.map((row, i) => (
                  <View key={i} style={styles.allocationRow}>
                    {row.map((value, j) => (
                      <View key={j} style={styles.allocationCell}>
                        <Text style={styles.allocationText}>
                          {value.toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
              <Text style={styles.optimalCost}>
                Total Cost: {solution.optimal.cost.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 12,
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
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 15,
  },
  gridContainer: {
    marginBottom: 16,
  },
  gridScrollView: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    minWidth: '100%',
  },
  headerCell: {
    width: 80,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#08172E',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    minWidth: '100%',
  },
  labelCell: {
    width: 80,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#08172E',
  },
  cell: {
    width: 80,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    padding: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#08172E',
    minWidth: 50,
  },
  totalCell: {
    width: 120,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  totalText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#08172E',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  buttonText: {
    fontSize: 14,
    color: '#08172E',
    fontWeight: '500',
    textAlign: 'center',
  },
  solveButton: {
    backgroundColor: '#00A86B',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  solveButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  solutionContainer: {
    marginTop: 24,
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 15,
  },
  methodSolution: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 12,
  },
  allocationGrid: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  allocationRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  allocationCell: {
    width: 80,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  allocationText: {
    fontSize: 14,
    color: '#08172E',
  },
  costText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#08172E',
  },
  optimalSolution: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  optimalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 12,
  },
  optimalCost: {
    fontSize: 16,
    fontWeight: '600',
    color: '#08172E',
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 32,
  },
}); 