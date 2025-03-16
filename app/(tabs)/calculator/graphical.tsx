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
    if (!solution?.constraints || solution.constraints.length === 0) {
      return { labels: ['0'], datasets: [{ data: [0] }] };
    }

    // Simple calculation of chart bounds
    const points = solution.feasiblePoints || [];
    let maxX = Math.max(...points.map(p => p.x), 10) * 1.2;
    let maxY = Math.max(...points.map(p => p.y), 10) * 1.2;
    
    maxX = Math.ceil(maxX / 10) * 10;
    maxY = Math.ceil(maxY / 10) * 10;
    
    // Simple grid lines
    const gridLines = {
      x: [0, maxX/4, maxX/2, 3*maxX/4, maxX],
      y: [0, maxY/4, maxY/2, 3*maxY/4, maxY]
    };

    const labels = gridLines.x.map(x => Math.round(x).toString());
    const datasets = [];

    // Basic initialization
    datasets.push({
      data: [0],
      color: () => 'transparent',
      withDots: false
    });

    // Draw constraint lines
    const colors = ['#d62828', '#219ebc', '#4a7c59', '#774936', '#52796f'];
    if (solution.constraints) {
      solution.constraints.forEach((c, i) => {
        if (c.x2 !== 0) {
          const linePoints = [];
          const xValues = [];
          
          // Calculate line points
          for (let x = 0; x <= maxX; x += maxX/100) {
            const y = (c.rhs - c.x1 * x) / c.x2;
            if (y >= 0 && y <= maxY) {
              linePoints.push(y);
              xValues.push(x);
            }
          }
          
          if (linePoints.length > 0) {
            datasets.push({
              data: linePoints,
              xValues,
              color: () => colors[i % colors.length],
              strokeWidth: 2,
              withDots: false
            });
          }
        } else if (c.x1 !== 0) {
          const x = c.rhs / c.x1;
          if (x >= 0 && x <= maxX) {
            datasets.push({
              data: [0, maxY],
              xValues: [x, x],
              color: () => colors[i % colors.length],
              strokeWidth: 2,
              withDots: false
            });
          }
        }
      });
    }

    // Calculate ALL intersection points between constraints
    const allIntersections = [];
    
    // Add axis intersections
    for (const c of solution.constraints) {
      if (c.x2 !== 0) allIntersections.push({ x: 0, y: c.rhs / c.x2 });
      if (c.x1 !== 0) allIntersections.push({ x: c.rhs / c.x1, y: 0 });
    }
    
    // Find intersections between constraints
    for (let i = 0; i < solution.constraints.length; i++) {
      for (let j = i + 1; j < solution.constraints.length; j++) {
        const c1 = solution.constraints[i];
        const c2 = solution.constraints[j];
        
        // Calculate determinant
        const det = c1.x1 * c2.x2 - c2.x1 * c1.x2;
        
        if (Math.abs(det) > 0.000001) { // Not parallel
          const x = (c1.rhs * c2.x2 - c2.rhs * c1.x2) / det;
          const y = (c1.x1 * c2.rhs - c2.x1 * c1.rhs) / det;
          
          // Only add points in the first quadrant
          if (x >= 0 && y >= 0 && x <= maxX && y <= maxY) {
            allIntersections.push({ x, y });
          }
        }
      }
    }
    
    // Add all intersection points with a distinct style
    allIntersections.forEach(point => {
      datasets.push({
        data: [point.y],
        xValues: [point.x],
        color: () => 'rgba(44, 62, 80, 0.15)',
        strokeWidth: 0,
        withDots: true,
        dotColor: 'rgba(44, 62, 80, 0.15)',
        dotSize: 12
      });
      
      datasets.push({
        data: [point.y],
        xValues: [point.x],
        color: () => '#2c3e50',
        strokeWidth: 0,
        withDots: true,
        dotColor: '#2c3e50',
        dotSize: 7
      });
    });

    // Make the optimal point very prominent
    if (solution.optimalPoint) {
      // First outer glow for emphasis
      datasets.push({
        data: [solution.optimalPoint.y],
        xValues: [solution.optimalPoint.x],
        color: () => 'rgba(231, 76, 60, 0.3)',
        strokeWidth: 0,
        withDots: true,
        dotColor: 'rgba(231, 76, 60, 0.3)',
        dotSize: 30
      });
      
      // Second glow layer
      datasets.push({
        data: [solution.optimalPoint.y],
        xValues: [solution.optimalPoint.x],
        color: () => 'rgba(231, 76, 60, 0.1)',
        strokeWidth: 0,
        withDots: true,
        dotColor: 'rgba(231, 76, 60, 0.1)',
        dotSize: 60
      });
      
      // Main dot
      datasets.push({
        data: [solution.optimalPoint.y],
        xValues: [solution.optimalPoint.x],
        color: () => '#e74c3c',
        strokeWidth: 0,
        withDots: true,
        dotColor: '#e74c3c',
        dotSize: 12
      });
      
      // Center highlight
      datasets.push({
        data: [solution.optimalPoint.y],
        xValues: [solution.optimalPoint.x],
        color: () => '#ffffff',
        strokeWidth: 0,
        withDots: true,
        dotColor: '#ffffff',
        dotSize: 5
      });

      // Add an annotation/label for the optimal point
      datasets.push({
        data: [solution.optimalPoint.y + maxY * 0.05],  // Position slightly above the point
        xValues: [solution.optimalPoint.x],
        withDots: false,
        color: () => 'transparent',
        // This requires chart-kit decoration or custom rendering
        customDataPoint: () => (
          <Text style={{color: '#e74c3c', fontWeight: 'bold', fontSize: 12}}>
            Optimal
          </Text>
        )
      });
    }

    return {
      labels,
      datasets
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
              onChangeText={(text) => {
                const newConstraints = [...constraints];
                newConstraints[index] = { ...constraint, x1: text };
                setConstraints(newConstraints);
              }}
              keyboardType="numeric"
              placeholder="x₁"
            />
            <Text style={styles.equationText}>x₁ + </Text>
            <TextInput
              style={styles.input}
              value={constraint.x2}
              onChangeText={(text) => {
                const newConstraints = [...constraints];
                newConstraints[index] = { ...constraint, x2: text };
                setConstraints(newConstraints);
              }}
              keyboardType="numeric"
              placeholder="x₂"
            />
            <Text style={styles.equationText}>x₂</Text>
            <TouchableOpacity
              style={styles.signButton}
              onPress={() => {
                const signs: Array<'<=' | '>=' | '='> = ['<=', '>=', '='];
                const currentIndex = signs.indexOf(constraint.sign);
                const newConstraints = [...constraints];
                newConstraints[index] = {
                  ...constraint,
                  sign: signs[(currentIndex + 1) % signs.length]
                };
                setConstraints(newConstraints);
              }}
            >
              <Text style={styles.signButtonText}>{constraint.sign}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={constraint.rhs}
              onChangeText={(text) => {
                const newConstraints = [...constraints];
                newConstraints[index] = { ...constraint, rhs: text };
                setConstraints(newConstraints);
              }}
              keyboardType="numeric"
              placeholder="RHS"
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            setConstraints([...constraints, { x1: '', x2: '', sign: '<=', rhs: '' }])
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
                <Text style={styles.solutionHeader}>Optimal Solution</Text>
                <View style={styles.optimalPointContainer}>
                  <View style={styles.optimalDot} />
                  <Text style={styles.optimalPointText}>
                    Optimal Point: ({solution.optimalPoint?.x.toFixed(2)}, {solution.optimalPoint?.y.toFixed(2)})
                  </Text>
                </View>
                <Text style={styles.optimalValueText}>
                  Optimal Value: {solution.optimalValue?.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text style={styles.solutionText}>No feasible solution found</Text>
            )}
          </View>

          {solution.status === 'optimal' && (
            <View style={styles.section}>
              <Text style={styles.graphTitle}>Graphical Solution of Linear Programming Problem</Text>
              <View style={[styles.chartContainer, {
                backgroundColor: '#ffffff',
                shadowColor: 'transparent',
                shadowOpacity: 0,
                elevation: 0
              }]}>
                <LineChart
                  data={getChartData()}
                  width={Dimensions.get('window').width - 32}
                  height={300}
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForBackgroundLines: {
                      strokeWidth: 1,
                      stroke: '#e0e0e0'
                    },
                    propsForLabels: {
                      fontSize: 10
                    }
                  }}
                  style={{
                    marginVertical: 8
                  }}
                  bezier={false}
                  withInnerLines={true}
                  withOuterLines={true}
                  fromZero={true}
                />
                <View style={styles.legendContainer}>
                  {solution.constraints?.map((c, i) => (
                    <View key={`constraint-${i}`} style={styles.legendItem}>
                      <View style={[styles.legendColor, { 
                        backgroundColor: ['#d62828', '#219ebc', '#4a7c59', '#774936', '#52796f'][i % 5],
                        width: 16,
                        height: 3
                      }]} />
                      <Text style={styles.legendText}>
                        {`${c.x1}x₁ + ${c.x2}x₂ ${c.sign} ${c.rhs}`}
                      </Text>
                    </View>
                  ))}
                  
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { 
                      backgroundColor: '#2c3e50',
                      width: 8,
                      height: 8,
                      borderRadius: 4
                    }]} />
                    <Text style={styles.legendText}>Intersection Points</Text>
                  </View>
                  
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { 
                      backgroundColor: '#e74c3c',
                      width: 10,
                      height: 10,
                      borderRadius: 5
                    }]} />
                    <Text style={styles.legendText}>Optimal Solution</Text>
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
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  solutionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  optimalPointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optimalDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e74c3c',
    marginRight: 8,
  },
  optimalPointText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  optimalValueText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
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
    paddingHorizontal: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
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
  solutionText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    textAlign: 'center',
  },
});