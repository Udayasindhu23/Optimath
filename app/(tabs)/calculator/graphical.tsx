import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Grape, Calculator } from 'lucide-react-native';

interface Constraint {
  x1: string;
  x2: string;
  sign: '<=' | '>=' | '=';
  rhs: string;
}

interface Point {
  x: number;
  y: number;
}

interface Solution {
  status: string;
  optimalPoint?: Point;
  optimalValue?: number;
  feasiblePoints?: Point[];
  constraints?: any[];
}

export default function GraphicalMethod() {
  const [objective, setObjective] = useState({
    type: 'max',
    x: '',
    y: '',
  });

  const [constraints, setConstraints] = useState<Constraint[]>([
    { x1: '', x2: '', sign: '<=', rhs: '' },
    { x1: '', x2: '', sign: '<=', rhs: '' },
  ]);

  const [solution, setSolution] = useState<Solution | null>(null);

  const solveLP = () => {
    // Convert inputs to numbers
    const obj = {
      x1: parseFloat(objective.x) || 0,
      x2: parseFloat(objective.y) || 0,
      type: objective.type
    };

    const convertedConstraints = constraints.map(c => ({
      x1: parseFloat(c.x1) || 0,
      x2: parseFloat(c.x2) || 0,
      sign: c.sign,
      rhs: parseFloat(c.rhs) || 0
    }));

    // Find intersection points of all constraints
    const points: Point[] = [];
    
    // Add points from x1 = 0 and x2 = 0 axes
    for (const c of convertedConstraints) {
      if (c.x2 !== 0) points.push({ x: 0, y: c.rhs / c.x2 });
      if (c.x1 !== 0) points.push({ x: c.rhs / c.x1, y: 0 });
    }

    // Find intersections between constraints
    for (let i = 0; i < convertedConstraints.length; i++) {
      for (let j = i + 1; j < convertedConstraints.length; j++) {
        const c1 = convertedConstraints[i];
        const c2 = convertedConstraints[j];
        
        // Calculate determinant
        const det = c1.x1 * c2.x2 - c2.x1 * c1.x2;
        
        if (Math.abs(det) > 0.000001) { // Not parallel
          const x = (c1.rhs * c2.x2 - c2.rhs * c1.x2) / det;
          const y = (c1.x1 * c2.rhs - c2.x1 * c1.rhs) / det;
          points.push({ x, y });
        }
      }
    }

    // Filter points that satisfy all constraints
    const feasiblePoints = points.filter(p => {
      if (p.x < -0.000001 || p.y < -0.000001) return false; // Non-negative constraints
      return convertedConstraints.every(c => {
        const lhs = c.x1 * p.x + c.x2 * p.y;
        const rhs = c.rhs;
        if (c.sign === '<=') return lhs <= rhs + 0.000001;
        if (c.sign === '>=') return lhs >= rhs - 0.000001;
        return Math.abs(lhs - rhs) < 0.000001;
      });
    });

    if (feasiblePoints.length === 0) {
      setSolution({ status: 'infeasible' });
      return;
    }

    // Evaluate objective function at each feasible point
    const evaluateObjective = (point: Point) => obj.x1 * point.x + obj.x2 * point.y;
    
    let optimalPoint = feasiblePoints[0];
    let optimalValue = evaluateObjective(optimalPoint);

    for (const point of feasiblePoints) {
      const value = evaluateObjective(point);
      if ((obj.type === 'max' && value > optimalValue) ||
          (obj.type === 'min' && value < optimalValue)) {
        optimalPoint = point;
        optimalValue = value;
      }
    }

    setSolution({
      status: 'optimal',
      feasiblePoints,
      optimalPoint,
      optimalValue,
      constraints: convertedConstraints
    });
  };

  const getChartData = () => {
    if (!solution?.feasiblePoints || solution.feasiblePoints.length === 0) {
      return {
        labels: ['0', '10', '20', '30', '40', '50'],
        datasets: [{
          data: [0],
          color: () => 'transparent',
          withDots: false
        }]
      };
    }

    // Calculate the max bounds with proper scaling
    const maxX = 50; // Fixed scale to match image
    const maxY = 50; // Fixed scale to match image

    // Generate grid lines
    const gridLines = {
      x: Array.from({ length: 6 }, (_, i) => i * 10),
      y: Array.from({ length: 6 }, (_, i) => i * 10)
    };

    // Generate labels
    const labels = gridLines.x.map(x => x.toString());

    const datasets = [];

    // Add grid lines
    datasets.push({
      data: gridLines.y,
      color: () => 'rgba(200, 200, 200, 0.5)',
      withDots: false,
      strokeWidth: 1
    });

    // Add constraint lines
    if (solution.constraints) {
      const colors = ['#0000FF', '#008000']; // Blue and Green for constraints
      solution.constraints.forEach((c, i) => {
        if (c.x2 !== 0) {
          const points = [];
          for (let x = 0; x <= maxX; x += maxX / 200) {
            const y = (c.rhs - c.x1 * x) / c.x2;
            if (y >= 0 && y <= maxY) {
              points.push(y);
            }
          }
          
          if (points.length > 0) {
            datasets.push({
              data: points,
              color: () => colors[i % colors.length],
              strokeWidth: 2,
              withDots: false
            });
          }
        }
      });
    }

    // Add feasible region shading
    if (solution.feasiblePoints && solution.feasiblePoints.length > 0) {
      // Sort points to create proper polygon
      const sortedPoints = [...solution.feasiblePoints].sort((a, b) => {
        const angleA = Math.atan2(a.y, a.x);
        const angleB = Math.atan2(b.y, b.x);
        return angleA - angleB;
      });

      // Create polygon path for shading
      datasets.push({
        data: sortedPoints.map(p => p.y),
        color: () => 'rgba(200, 200, 200, 0.3)',
        withDots: false,
        fillColor: 'rgba(200, 200, 200, 0.3)',
        strokeWidth: 0
      });
    }

    return {
      labels,
      datasets,
      gridMin: 0,
      gridMax: maxY,
      scaleX: {
        min: 0,
        max: maxX,
        ticks: gridLines.x
      },
      scaleY: {
        min: 0,
        max: maxY,
        ticks: gridLines.y
      }
    };
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Grape size={32} color="#0066FF" />
        </View>
        <Text style={styles.title}>Graphical Method</Text>
      </View>

      <Text style={styles.description}>
        Solve linear programming problems visually by plotting constraints and finding
        the optimal solution in the feasible region using a coordinate system.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objective Function</Text>
        <View style={styles.objectiveContainer}>
          <View style={styles.objectiveRow}>
            <TouchableOpacity
              style={[styles.typeButton, objective.type === 'max' && styles.typeButtonActive]}
              onPress={() => setObjective({ ...objective, type: 'max' })}
            >
              <Text style={[styles.typeButtonText, objective.type === 'max' && styles.typeButtonTextActive]}>
                Max
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, objective.type === 'min' && styles.typeButtonActive]}
              onPress={() => setObjective({ ...objective, type: 'min' })}
            >
              <Text style={[styles.typeButtonText, objective.type === 'min' && styles.typeButtonTextActive]}>
                Min
              </Text>
            </TouchableOpacity>
            <Text style={styles.equationText}>Z = </Text>
            <TextInput
              style={styles.input}
              value={objective.x}
              onChangeText={(text) => setObjective({ ...objective, x: text })}
              keyboardType="numeric"
              placeholder="x₁"
            />
            <Text style={styles.equationText}>x₁ + </Text>
            <TextInput
              style={styles.input}
              value={objective.y}
              onChangeText={(text) => setObjective({ ...objective, y: text })}
              keyboardType="numeric"
              placeholder="x₂"
            />
            <Text style={styles.equationText}>x₂</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Constraints</Text>
        {constraints.map((constraint, index) => (
          <View key={index} style={styles.constraintContainer}>
            <TextInput
              style={styles.input}
              value={constraint.x1}
              onChangeText={(text) =>
                setConstraints(constraints.map((c, i) =>
                  i === index ? { ...c, x1: text } : c
                ))
              }
              keyboardType="numeric"
            />
            <Text style={styles.equationText}>x + </Text>
            <TextInput
              style={styles.input}
              value={constraint.x2}
              onChangeText={(text) =>
                setConstraints(constraints.map((c, i) =>
                  i === index ? { ...c, x2: text } : c
                ))
              }
              keyboardType="numeric"
            />
            <Text style={styles.equationText}>y </Text>
            <TouchableOpacity
              style={styles.signButton}
              onPress={() => {
                const signs: Array<'<=' | '>=' | '='> = ['<=', '>=', '='];
                const currentIndex = signs.indexOf(constraint.sign);
                const nextSign = signs[(currentIndex + 1) % signs.length];
                setConstraints(constraints.map((c, i) =>
                  i === index ? { ...c, sign: nextSign } : c
                ));
              }}
            >
              <Text style={styles.signButtonText}>{constraint.sign}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={constraint.rhs}
              onChangeText={(text) =>
                setConstraints(constraints.map((c, i) =>
                  i === index ? { ...c, rhs: text } : c
                ))
              }
              keyboardType="numeric"
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            setConstraints([...constraints, { x1: '0', x2: '0', sign: '<=', rhs: '0' }])
          }
        >
          <Text style={styles.addButtonText}>Add Constraint</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.solveButton} onPress={solveLP}>
        <Text style={styles.solveButtonText}>Solve</Text>
      </TouchableOpacity>

      {solution && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solution</Text>
          <View style={styles.solutionContainer}>
            {solution.status === 'optimal' ? (
              <>
                <Text style={styles.solutionText}>
                  Optimal point: ({solution.optimalPoint?.x.toFixed(2)}, {solution.optimalPoint?.y.toFixed(2)})
                </Text>
                <Text style={styles.solutionText}>
                  Optimal value: {solution.optimalValue?.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text style={styles.solutionText}>No feasible solution found</Text>
            )}
          </View>

          {solution.status === 'optimal' && (
            <View style={styles.section}>
              <Text style={styles.graphTitle}>Graphical Solution of Linear Programming Problem</Text>
              <View style={styles.chartContainer}>
                <LineChart
                  data={getChartData()}
                  width={Dimensions.get('window').width - 32}
                  height={400}
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 0
                    },
                    propsForBackgroundLines: {
                      strokeWidth: 1,
                      stroke: 'rgba(200, 200, 200, 0.5)',
                      strokeDasharray: []
                    },
                    propsForLabels: {
                      fontSize: 12
                    }
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 0
                  }}
                  bezier={false}
                  withInnerLines={true}
                  withOuterLines={true}
                  withVerticalLines={true}
                  withHorizontalLines={true}
                  fromZero={true}
                  yAxisLabel=""
                  xAxisLabel=""
                />
                <View style={styles.legendContainer}>
                  {solution.constraints?.map((c, i) => (
                    <View key={`constraint-${i}`} style={styles.legendItem}>
                      <View style={[styles.legendColor, { 
                        backgroundColor: i === 0 ? '#0000FF' : '#008000',
                        width: 20,
                        height: 2
                      }]} />
                      <Text style={styles.legendText}>
                        {`${c.x1}x₁ + ${c.x2}x₂ = ${c.rhs}`}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { 
                      backgroundColor: 'rgba(200, 200, 200, 0.3)',
                      width: 20,
                      height: 20
                    }]} />
                    <Text style={styles.legendText}>Feasible Region</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
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
  objectiveContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  constraintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeButtonActive: {
    backgroundColor: '#08172E',
    borderColor: '#08172E',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
  typeButtonTextActive: {
    color: '#ffffff',
  },
  equationText: {
    fontSize: 14,
    color: '#08172E',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 6,
    width: 50,
    textAlign: 'center',
    fontSize: 14,
    color: '#08172E',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  signButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 45,
  },
  signButtonText: {
    fontSize: 14,
    color: '#08172E',
    fontWeight: '500',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  addButtonText: {
    fontSize: 14,
    color: '#08172E',
    fontWeight: '500',
    textAlign: 'center',
  },
  solveButton: {
    backgroundColor: '#0066FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
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
  solutionText: {
    fontSize: 14,
    color: '#08172E',
    marginBottom: 8,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 0,
    padding: 16,
    marginTop: 10,
  },
  legendContainer: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#000000',
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
    backgroundColor: '#E6F0FF',
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
});