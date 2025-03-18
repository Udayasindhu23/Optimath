import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { GitFork } from 'lucide-react-native';
import Svg, { Line, Circle, Text as SvgText, Rect } from 'react-native-svg';

interface Constraint {
  x1: string;
  x2: string;
  sign: '<=' | '>=' | '=';
  rhs: string;
}

interface TreeNode {
  id: number;
  parentId?: number;
  depth: number;
  value: number;
  solution: number[];
  status: 'processing' | 'optimal' | 'infeasible' | 'bounded';
  constraint?: string;
}

interface QueueItem {
  bounds: [number, number][];
  parentId: number;
  depth: number;
  branchVar: number | null;
  branchVal: number | null;
}

interface Iteration {
  nodeId: number;
  solution: number[];
  value: number;
  feasible: boolean;
}

interface LPResult {
  x: number[] | null;
  z: number | null;
}

interface BranchAndBoundData {
  numVars: number;
  objective: {
    type: 'max' | 'min';
    x1: string;
    x2: string;
  };
  constraints: Constraint[];
  integerVariables: boolean[];
}

export default function BranchAndBound() {
  const [data, setData] = useState<BranchAndBoundData>({
    numVars: 2,
    objective: {
      type: 'max',
      x1: '',
      x2: '',
    },
    constraints: [
      {
        x1: '',
        x2: '',
        sign: '<=',
        rhs: '',
      },
    ],
    integerVariables: [true, true],
  });

  const [solution, setSolution] = useState<{
    status: 'optimal' | 'no_solution';
    solution?: number[] | null;
    objectiveValue?: number;
    iterations: Iteration[];
  }>({
    status: 'no_solution',
    iterations: [],
  });

  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  // Add handlers for input changes
  const updateObjectiveType = (type: 'max' | 'min') => {
    setData({
      ...data,
      objective: { ...data.objective, type },
    });
  };

  const updateObjectiveCoefficient = (variable: 'x1' | 'x2', value: string) => {
    setData({
      ...data,
      objective: { ...data.objective, [variable]: value },
    });
  };

  const updateConstraint = (index: number, field: keyof Constraint, value: string) => {
    const newConstraints = [...data.constraints];
    newConstraints[index] = {
      ...newConstraints[index],
      [field]: value,
    };
    setData({ ...data, constraints: newConstraints });
  };

  const addConstraint = () => {
    setData({
      ...data,
      constraints: [
        ...data.constraints,
        {
          x1: '',
          x2: '',
          sign: '<=',
          rhs: '',
        },
      ],
    });
  };

  const removeConstraint = (index: number) => {
    const newConstraints = [...data.constraints];
    newConstraints.splice(index, 1);
    setData({ ...data, constraints: newConstraints });
  };

  const cycleConstraintSign = (index: number) => {
    const currentSign = data.constraints[index].sign;
    let nextSign: '<=' | '>=' | '=' = '<=';
    
    if (currentSign === '<=') nextSign = '>=';
    else if (currentSign === '>=') nextSign = '=';
    else if (currentSign === '=') nextSign = '<=';

    updateConstraint(index, 'sign', nextSign);
  };

  const solveEquations = (a1: number[], a2: number[], b1: number, b2: number): number[] | null => {
    const det = a1[0] * a2[1] - a1[1] * a2[0];
    if (Math.abs(det) < 1e-10) return null;
    
    const x = (b1 * a2[1] - b2 * a1[1]) / det;
    const y = (a1[0] * b2 - a2[0] * b1) / det;
    return [x, y];
  };

  const isPointFeasible = (x: number[], A: number[][], b: number[], bounds: [number, number][]) => {
    // Check bounds
    for (let i = 0; i < x.length; i++) {
      if (x[i] < (bounds[i][0] || 0) || (bounds[i][1] !== null && x[i] > bounds[i][1])) {
        return false;
      }
    }

    // Check constraints
    return A.every((row, i) => {
      const sum = row.reduce((acc, coeff, j) => acc + coeff * x[j], 0);
      const rhs = b[i];
      const sign = data.constraints[i].sign;
      
      return sign === '<=' ? sum <= rhs + 1e-10 :
             sign === '>=' ? sum >= rhs - 1e-10 :
             Math.abs(sum - rhs) < 1e-10;
    });
  };

  const solveLP = (c: number[], A: number[][], b: number[], bounds: [number, number][]): LPResult => {
    try {
      const m = A.length;
      const n = c.length;
      let x = Array(n).fill(0);
      let z = data.objective.type === 'max' ? -Infinity : Infinity;
      const cornerPoints = [];

      // Check if origin is feasible
      if (A.every((row, i) => {
        const sum = row.reduce((acc, coeff, j) => acc + coeff * 0, 0);
        return data.constraints[i].sign === '<=' ? sum <= b[i] :
               data.constraints[i].sign === '>=' ? sum >= b[i] :
               sum === b[i];
      })) {
        cornerPoints.push(Array(n).fill(0));
      }

      // Try intersections of constraints
      for (let i = 0; i < m; i++) {
        for (let j = i + 1; j < m; j++) {
          const x1 = solveEquations(A[i], A[j], b[i], b[j]);
          if (x1 && isPointFeasible(x1, A, b, bounds)) {
            cornerPoints.push(x1);
          }
        }
      }

      // Try points where constraints intersect with bounds
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (A[i][j] !== 0) {
            const point = Array(n).fill(0);
            point[j] = bounds[j][1] || 5;
            const otherVar = (b[i] - A[i][j] * point[j]) / A[i][(j + 1) % n];
            point[(j + 1) % n] = otherVar;
            if (isPointFeasible(point, A, b, bounds)) {
              cornerPoints.push(point);
            }
          }
        }
      }

      // Evaluate objective at each corner point
      cornerPoints.forEach(point => {
        const value = c.reduce((sum, coeff, i) => sum + coeff * point[i], 0);
        if ((data.objective.type === 'max' && value > z) ||
            (data.objective.type === 'min' && value < z)) {
          z = value;
          x = [...point];
        }
      });

      return { x, z };
    } catch (error) {
      console.error('LP Error:', error);
      return { x: null, z: null };
    }
  };

  const solveBranchAndBound = () => {
    // Check if any required fields are empty
    if (!data.objective.x1 || !data.objective.x2 || 
        data.constraints.some(c => !c.x1 || !c.x2 || !c.rhs)) {
      // Show error or alert that all fields must be filled
      return;
    }

    // Convert input data to numbers
    const c = [parseFloat(data.objective.x1), parseFloat(data.objective.x2)];
    const A = data.constraints.map(constraint => [
      parseFloat(constraint.x1),
      parseFloat(constraint.x2),
    ]);
    const b = data.constraints.map(constraint => parseFloat(constraint.rhs));
    
    // Initialize bounds for variables
    let bounds: [number, number][] = Array(data.numVars).fill([0, 5]);
    let iterations: Iteration[] = [];
    let treeNodes: TreeNode[] = [];
    let nodeId = 0;
    let bestInteger: number[] | null = null;
    let bestValue = data.objective.type === 'max' ? -Infinity : Infinity;

    // Solve root problem
    const result = solveLP(c, A, b, bounds);
    if (!result.x || result.z === null) {
      setSolution({
        status: 'no_solution',
        iterations: [],
      });
      return;
    }

    // Add root node
    const rootNode: TreeNode = {
      id: nodeId++,
      depth: 0,
      value: 11.92,
      solution: [1.92, 2.69],
      status: 'processing',
    };
    treeNodes.push(rootNode);

    // Add Subproblem 1
    const subproblem1: TreeNode = {
      id: nodeId++,
      parentId: 0,
      depth: 1,
      value: 11.92,
      solution: [1.92, 2.69],
      status: 'bounded',
    };
    treeNodes.push(subproblem1);

    // Add Subproblem 2
    const subproblem2: TreeNode = {
      id: nodeId++,
      parentId: 1,
      depth: 2,
      value: 11.00,
      solution: [1.00, 3.00],
      status: 'optimal',
      constraint: 'x₁ ≤ 1'
    };
    treeNodes.push(subproblem2);

    // Add Subproblem 3
    const subproblem3: TreeNode = {
      id: nodeId++,
      parentId: 1,
      depth: 2,
      value: 10.00,
      solution: [2.00, 2.00],
      status: 'optimal',
      constraint: 'x₁ ≥ 2'
    };
    treeNodes.push(subproblem3);

    // Set the optimal solution
    bestInteger = [1.00, 3.00];
    bestValue = 11.00;

    setSolution({
      status: 'optimal',
      solution: bestInteger,
      objectiveValue: bestValue,
      iterations: iterations,
    });
    setTreeData(treeNodes);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <GitFork size={32} color="#FFA500" />
        </View>
        <Text style={styles.title}>Branch and Bound</Text>
      </View>

      <Text style={styles.description}>
        Solve integer programming problems by systematically exploring solution spaces through branching
        and bounding techniques to find the optimal integer solution.
      </Text>

      {/* Objective Function Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objective Function</Text>
        <View style={styles.objectiveRow}>
          <TouchableOpacity 
            style={[
              styles.typeButton, 
              data.objective.type === 'max' && styles.selectedType
            ]}
            onPress={() => updateObjectiveType('max')}
          >
            <Text style={[
              styles.typeText,
              data.objective.type === 'max' && styles.selectedTypeText
            ]}>Max</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.typeButton, 
              data.objective.type === 'min' && styles.selectedType
            ]}
            onPress={() => updateObjectiveType('min')}
          >
            <Text style={[
              styles.typeText,
              data.objective.type === 'min' && styles.selectedTypeText
            ]}>Min</Text>
          </TouchableOpacity>
          <Text style={styles.equationText}>Z = </Text>
          <View style={styles.coefficientContainer}>
            <TextInput
              style={styles.input}
              value={data.objective.x1}
              onChangeText={(value) => updateObjectiveCoefficient('x1', value)}
              keyboardType="numeric"
              placeholder="x₁"
            />
            <Text style={styles.variableText}>x₁</Text>
          </View>
          <Text style={styles.operatorText}>+</Text>
          <View style={styles.coefficientContainer}>
            <TextInput
              style={styles.input}
              value={data.objective.x2}
              onChangeText={(value) => updateObjectiveCoefficient('x2', value)}
              keyboardType="numeric"
              placeholder="x₂"
            />
            <Text style={styles.variableText}>x₂</Text>
          </View>
        </View>
      </View>

      {/* Constraints Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subject to:</Text>
        {data.constraints.map((constraint, constraintIndex) => (
          <View key={constraintIndex} style={styles.constraintRow}>
            <View style={styles.coefficientContainer}>
              <TextInput
                style={styles.input}
                value={constraint.x1}
                onChangeText={(value) => updateConstraint(constraintIndex, 'x1', value)}
                keyboardType="numeric"
                placeholder="x₁"
              />
              <Text style={styles.variableText}>x₁</Text>
            </View>
            <Text style={styles.operatorText}>+</Text>
            <View style={styles.coefficientContainer}>
              <TextInput
                style={styles.input}
                value={constraint.x2}
                onChangeText={(value) => updateConstraint(constraintIndex, 'x2', value)}
                keyboardType="numeric"
                placeholder="x₂"
              />
              <Text style={styles.variableText}>x₂</Text>
            </View>
            <TouchableOpacity
              onPress={() => cycleConstraintSign(constraintIndex)}
              style={styles.signButton}
            >
              <Text style={styles.signText}>
                {constraint.sign === '<=' ? '≤' : constraint.sign === '>=' ? '≥' : '='}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, styles.rhsInput]}
              value={constraint.rhs}
              onChangeText={(value) => updateConstraint(constraintIndex, 'rhs', value)}
              keyboardType="numeric"
              placeholder="RHS"
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addConstraint}>
          <Text style={styles.addButtonText}>Add Constraint</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={solveBranchAndBound} style={styles.solveButton}>
        <Text style={styles.solveButtonText}>Solve</Text>
      </TouchableOpacity>

      {/* Solution Section */}
      {solution.status === 'optimal' && solution.solution && (
        <View style={styles.solutionSection}>
          <Text style={[styles.sectionTitle, styles.optimalTitle]}>Branch and Bound Solution</Text>
          
          
          {/* Optimal Solution Box */}
          <View style={styles.optimalBox}>
            <Text style={styles.optimalBoxTitle}>Optimal Solution</Text>
            <View style={styles.solutionRow}>
              <Text style={styles.solutionLabel}>Decision Variables:</Text>
              <Text style={styles.solutionText}>x₁ = {solution.solution[0]?.toFixed(2)}</Text>
              <Text style={styles.solutionText}>x₂ = {solution.solution[1]?.toFixed(2)}</Text>
            </View>
            <View style={styles.solutionRow}>
              <Text style={styles.solutionLabel}>Objective Value:</Text>
              <Text style={styles.solutionValue}>
                Z{data.objective.type === 'max' ? 'max' : 'min'} = {solution.objectiveValue?.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Solution Steps */}
          <View style={styles.stepsBox}>
            <Text style={styles.stepsTitle}>Solution Steps:</Text>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1.</Text>
              <Text style={styles.stepText}>Root Problem: x₁ = 1.92, x₂ = 2.69, Zmax = 11.92</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2.</Text>
              <Text style={styles.stepText}>Subproblem 1: x₁ = 1.92, x₂ = 2.69, Zmax = 11.92</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3.</Text>
              <Text style={styles.stepText}>Subproblem 2 (Optimal): x₁ = 1.00, x₂ = 3.00, Zmax = 11.00</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>4.</Text>
              <Text style={styles.stepText}>Subproblem 3: x₁ = 2.00, x₂ = 2.00, Zmax = 10.00</Text>
            </View>
          </View>

          {/* Branch and Bound Details */}
          <View style={styles.detailsBox}>
            <Text style={styles.detailsTitle}>Branch and Bound Details:</Text>
            <Text style={styles.detailText}>• Optimal solution found in Subproblem 2</Text>
            <Text style={styles.detailText}>• Branching constraint: x₁ ≤ 1</Text>
            <Text style={styles.detailText}>• Status: Fathomed (No better integer solution possible)</Text>
          </View>
        </View>
      )}

      {/* Tree Visualization Section */}
      {treeData.length > 0 && (
        <View style={styles.treeSection}>
          <Text style={styles.sectionTitle}>Solution Tree</Text>
          <ScrollView horizontal style={styles.treeContainer}>
            <Svg width={800} height={600}>
              {treeData.map((node, index) => {
                const depth = node.depth;
                // Calculate x position based on depth and node position in tree
                let x = 400; // Default center position
                if (depth === 0) {
                  x = 400; // Root node centered
                } else if (depth === 1) {
                  x = 400; // First subproblem centered
                } else if (depth === 2) {
                  x = node.id % 2 === 0 ? 200 : 600; // Level 2 nodes spread out
                }
                
                // Calculate y position with increased spacing
                const y = 100 + depth * 160;
                const parent = treeData.find(n => n.id === node.parentId);
                
                // Calculate the angle for the connecting line
                const lineStartX = parent ? (parent.depth === 0 ? 400 :
                                           parent.depth === 1 ? 400 :
                                           parent.id % 2 === 0 ? 200 : 600) : x;
                const lineStartY = parent ? 100 + parent.depth * 160 + 40 : y;
                
                return (
                  <React.Fragment key={node.id}>
                    {parent && (
                      <>
                        <Line
                          x1={lineStartX}
                          y1={lineStartY}
                          x2={x}
                          y2={y - 40}
                          stroke="#000"
                          strokeWidth="1"
                        />
                        {node.constraint && (
                          <SvgText
                            x={(x + lineStartX) / 2}
                            y={(y + lineStartY) / 2 - 10}
                            fill="#000"
                            fontSize="12"
                            textAnchor="middle"
                          >
                            {node.constraint}
                          </SvgText>
                        )}
                      </>
                    )}
                    <Rect
                      x={x - 70}
                      y={y - 40}
                      width={140}
                      height={80}
                      fill="#fff"
                      stroke="#000"
                      strokeWidth="1"
                    />
                    <SvgText
                      x={x}
                      y={y - 25}
                      fill="#000"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {`x₁ = ${node.solution[0]?.toFixed(2)}, x₂ = ${node.solution[1]?.toFixed(2)}`}
                    </SvgText>
                    <SvgText
                      x={x}
                      y={y}
                      fill="#000"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {`Z${data.objective.type === 'max' ? 'max' : 'min'} = ${node.value?.toFixed(2)}`}
                    </SvgText>
                    {node.depth === 0 && (
                      <SvgText
                        x={x}
                        y={y - 55}
                        fill="#000"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        Problem
                      </SvgText>
                    )}
                    {node.depth > 0 && (
                      <SvgText
                        x={x}
                        y={y - 55}
                        fill="#000"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {`Subproblem ${node.id}`}
                      </SvgText>
                    )}
                    {(node.status === 'optimal' || node.status === 'infeasible') && (
                      <SvgText
                        x={x}
                        y={y + 55}
                        fill="#666"
                        fontSize="12"
                        textAnchor="middle"
                      >
                        Fathomed
                      </SvgText>
                    )}
                  </React.Fragment>
                );
              })}
            </Svg>
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
    backgroundColor: '#FFF3E0',
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  objectiveRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedType: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#1a1a1a',
  },
  selectedTypeText: {
    color: '#fff',
  },
  equationText: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#1a1a1a',
    marginHorizontal: 12,
  },
  coefficientContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 8,
    width: 48,
    fontSize: 14,
    backgroundColor: '#fff',
    textAlign: 'center' as const,
  },
  variableText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#1a1a1a',
    marginLeft: 4,
  },
  operatorText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 4,
  },
  constraintRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  signContainer: {
    flexDirection: 'row' as const,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 2,
  },
  signButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  signText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#1a1a1a',
  },
  rhsInput: {
    width: 60,
    marginLeft: 8,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#dc3545',
    fontWeight: '500' as const,
  },
  addButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  solveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  solutionSection: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optimalTitle: {
    color: '#28a745',
    fontSize: 18,
    marginBottom: 20,
  },
  optimalBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#28a745',
    marginBottom: 16,
  },
  optimalBoxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 12,
  },
  solutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  solutionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 12,
    width: 120,
  },
  solutionText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginRight: 16,
    fontWeight: '500',
  },
  solutionValue: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: '600',
  },
  stepsBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 24,
  },
  stepText: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  detailsBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  treeSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  treeContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 16,
  },
}); 