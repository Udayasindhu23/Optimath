import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GitBranch } from 'lucide-react-native';

interface Constraint {
  x1: string;
  x2: string;
  sign: '<=' | '>=' | '=';
  rhs: string;
}

interface SimplexSolution {
  status: string;
  solution?: number[];
  optimalValue?: number;
  iterations?: Array<Array<number>>;
}

export default function SimplexMethod() {
  const [objective, setObjective] = useState({
    type: 'max',
    x1: '',
    x2: '',
  });

  const [constraints, setConstraints] = useState<Constraint[]>([
    { x1: '', x2: '', sign: '<=', rhs: '' },
    { x1: '', x2: '', sign: '<=', rhs: '' },
  ]);

  const [solution, setSolution] = useState<SimplexSolution | null>(null);

  const createTableau = (objective: any, constraints: any[]) => {
    // Convert minimization to maximization
    const isMinimization = objective.type === 'min';
    const objCoeffs = isMinimization 
      ? [-parseFloat(objective.x1), -parseFloat(objective.x2)]
      : [parseFloat(objective.x1), parseFloat(objective.x2)];

    // Count constraints by type
    const leConstraints = constraints.filter(c => c.sign === '<=');
    const geConstraints = constraints.filter(c => c.sign === '>=');
    const eqConstraints = constraints.filter(c => c.sign === '=');

    const numLeConstraints = leConstraints.length;
    const numGeConstraints = geConstraints.length;
    const numEqConstraints = eqConstraints.length;
    const numSlackVariables = numLeConstraints + numGeConstraints;
    const numArtificialVariables = numGeConstraints + numEqConstraints;
    const numColumns = 2 + numSlackVariables + numArtificialVariables + 1;

    // Create tableau with proper dimensions
    const tableau = Array(constraints.length + 1).fill(null)
      .map(() => Array(numColumns).fill(0));

    // Fill objective row (last row)
    objCoeffs.forEach((coeff, i) => {
      tableau[constraints.length][i] = -coeff;
    });

    // Add artificial variables with big M coefficient in objective
    const M = 1000;
    for (let i = 2 + numSlackVariables; i < numColumns - 1; i++) {
      tableau[constraints.length][i] = M;
    }

    let slackIndex = 2;
    let artificialIndex = 2 + numSlackVariables;

    // Process <= constraints
    leConstraints.forEach((constraint) => {
      const rowIndex = constraints.indexOf(constraint);
      tableau[rowIndex][0] = parseFloat(constraint.x1);
      tableau[rowIndex][1] = parseFloat(constraint.x2);
      tableau[rowIndex][slackIndex++] = 1;
      tableau[rowIndex][numColumns - 1] = parseFloat(constraint.rhs);
    });

    // Process >= constraints
    geConstraints.forEach((constraint) => {
      const rowIndex = constraints.indexOf(constraint);
      tableau[rowIndex][0] = parseFloat(constraint.x1);
      tableau[rowIndex][1] = parseFloat(constraint.x2);
      tableau[rowIndex][slackIndex++] = -1;
      tableau[rowIndex][artificialIndex++] = 1;
      tableau[rowIndex][numColumns - 1] = parseFloat(constraint.rhs);

      // Subtract artificial variable row from objective
      for (let j = 0; j < numColumns; j++) {
        tableau[constraints.length][j] -= M * tableau[rowIndex][j];
      }
    });

    // Process = constraints
    eqConstraints.forEach((constraint) => {
      const rowIndex = constraints.indexOf(constraint);
      tableau[rowIndex][0] = parseFloat(constraint.x1);
      tableau[rowIndex][1] = parseFloat(constraint.x2);
      tableau[rowIndex][artificialIndex++] = 1;
      tableau[rowIndex][numColumns - 1] = parseFloat(constraint.rhs);

      // Subtract artificial variable row from objective
      for (let j = 0; j < numColumns; j++) {
        tableau[constraints.length][j] -= M * tableau[rowIndex][j];
      }
    });

    return tableau;
  };

  const findPivotColumn = (tableau: number[][]) => {
    const lastRow = tableau[tableau.length - 1];
    const mostNegative = Math.min(...lastRow.slice(0, -1));
    return mostNegative < -0.000001 ? lastRow.indexOf(mostNegative) : -1;
  };

  const findPivotRow = (tableau: number[][], pivotCol: number) => {
    let minRatio = Infinity;
    let pivotRow = -1;
    
    for (let i = 0; i < tableau.length - 1; i++) {
      if (tableau[i][pivotCol] <= 0.000001) continue;
      
      const ratio = tableau[i][tableau[i].length - 1] / tableau[i][pivotCol];
      if (ratio >= 0 && ratio < minRatio) {
        minRatio = ratio;
        pivotRow = i;
      }
    }
    
    return pivotRow;
  };

  const performPivot = (tableau: number[][], pivotRow: number, pivotCol: number) => {
    const newTableau = tableau.map(row => [...row]);
    const pivotValue = newTableau[pivotRow][pivotCol];

    // Normalize pivot row
    newTableau[pivotRow] = newTableau[pivotRow].map(val => val / pivotValue);

    // Update other rows
    for (let i = 0; i < newTableau.length; i++) {
      if (i === pivotRow) continue;
      
      const factor = newTableau[i][pivotCol];
      for (let j = 0; j < newTableau[i].length; j++) {
        newTableau[i][j] = newTableau[i][j] - factor * newTableau[pivotRow][j];
      }
    }

    return newTableau;
  };

  const extractSolution = (tableau: number[][]) => {
    const numVars = 2;
    const solution = Array(numVars).fill(0);
    
    for (let j = 0; j < numVars; j++) {
      let hasOne = false;
      let oneRow = -1;
      
      for (let i = 0; i < tableau.length - 1; i++) {
        if (Math.abs(tableau[i][j] - 1) < 0.000001) {
          if (!hasOne) {
            hasOne = true;
            oneRow = i;
          } else {
            hasOne = false;
            break;
          }
        } else if (Math.abs(tableau[i][j]) > 0.000001) {
          hasOne = false;
          break;
        }
      }
      
      if (hasOne) {
        solution[j] = Math.abs(tableau[oneRow][tableau[0].length - 1]);
      }
    }
    
    return solution;
  };

  const solveSimplex = () => {
    try {
      // Create initial tableau
      let tableau = createTableau(objective, constraints);
      const iterations = [];
      iterations.push([...tableau.map(row => [...row])]);

      // Maximum iterations to prevent infinite loops
      const maxIterations = 100;
      let iterCount = 0;

      // Perform iterations
      while (iterCount < maxIterations) {
        const pivotCol = findPivotColumn(tableau);
        if (pivotCol === -1) break;

        const pivotRow = findPivotRow(tableau, pivotCol);
        if (pivotRow === -1) {
          setSolution({ status: 'unbounded' });
          return;
        }

        tableau = performPivot(tableau, pivotRow, pivotCol);
        iterations.push([...tableau.map(row => [...row])]);
        iterCount++;
      }

      if (iterCount === maxIterations) {
        setSolution({ status: 'not_converged' });
        return;
      }

      // Extract solution
      const solution = extractSolution(tableau);
      const optimalValue = Math.abs(tableau[tableau.length - 1][tableau[0].length - 1]);
      setSolution({
        status: 'optimal',
        solution,
        optimalValue: objective.type === 'min' ? optimalValue : optimalValue,
        iterations: iterations as unknown as Array<Array<number>>
      });
    } catch (error) {
      console.error('Error in solveSimplex:', error);
      setSolution({ status: 'error' });
    }
  };

  const addConstraint = () => {
    setConstraints([...constraints, { x1: '', x2: '', sign: '<=', rhs: '' }]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <GitBranch size={32} color="#C41E7F" />
        </View>
        <Text style={styles.title}>Simplex Method</Text>
      </View>

      <Text style={styles.description}>
        Solve linear programming problems algebraically using the simplex algorithm to
        find the optimal solution through systematic iteration of basic feasible solutions.
      </Text>

      <View style={styles.section}>
        {/* Objective Function */}
        <Text style={styles.sectionTitle}>Objective Function</Text>
        <View style={styles.objectiveContainer}>
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
            value={objective.x1}
            onChangeText={(text) => setObjective({ ...objective, x1: text })}
            keyboardType="numeric"
            placeholder="x₁"
          />
          <Text style={styles.equationText}>x₁ + </Text>
          <TextInput
            style={styles.input}
            value={objective.x2}
            onChangeText={(text) => setObjective({ ...objective, x2: text })}
            keyboardType="numeric"
            placeholder="x₂"
          />
          <Text style={styles.equationText}>x₂</Text>
        </View>

        {/* Constraints */}
        <View style={styles.constraintsContainer}>
          <Text style={styles.subsectionTitle}>Subject to:</Text>
          {constraints.map((constraint, index) => (
            <View key={index} style={styles.constraintRow}>
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
          <TouchableOpacity style={styles.addButton} onPress={addConstraint}>
            <Text style={styles.addButtonText}>Add Constraint</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.solveButton} onPress={solveSimplex}>
          <Text style={styles.solveButtonText}>Solve</Text>
        </TouchableOpacity>

        {/* Solution Display */}
        {solution && (
          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>Solution</Text>
            {solution.status === 'optimal' ? (
              <>
                <Text style={styles.solutionText}>Status: Optimal solution found</Text>
                <Text style={styles.solutionText}>x₁ = {solution.solution?.[0].toFixed(4)}</Text>
                <Text style={styles.solutionText}>x₂ = {solution.solution?.[1].toFixed(4)}</Text>
                <Text style={styles.solutionText}>
                  Optimal Value: {solution.optimalValue?.toFixed(4)}
                </Text>

                <Text style={styles.iterationTitle}>Iterations:</Text>
                <ScrollView horizontal style={styles.tableauContainer}>
                  {solution.iterations?.map((tableau: Array<number>, index: number) => (
                    <View key={index} style={styles.tableau}>
                      <Text style={styles.tableauTitle}>Iteration {index}</Text>
                      {(tableau as unknown as Array<Array<number>>).map((row: Array<number>, rowIndex: number) => (
                        <View key={rowIndex} style={styles.tableauRow}>
                          {row.map((cell: number, cellIndex: number) => (
                            <Text key={cellIndex} style={styles.tableauCell}>
                              {cell.toFixed(2)}
                            </Text>
                          ))}
                        </View>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              </>
            ) : (
              <Text style={styles.solutionText}>
                Status: {solution.status.charAt(0).toUpperCase() + solution.status.slice(1)}
              </Text>
            )}
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
    padding: 16,
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
    backgroundColor: '#FBD5E8',
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 15,
  },
  objectiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  constraintsContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  constraintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    minWidth: 60,
  },
  typeButtonActive: {
    backgroundColor: '#08172E',
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
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 6,
    width: 50,
    textAlign: 'center',
    fontSize: 14,
    color: '#08172E',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  signButton: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
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
  },
  addButtonText: {
    fontSize: 14,
    color: '#08172E',
    fontWeight: '500',
    textAlign: 'center',
  },
  solveButton: {
    backgroundColor: '#EC4899',
    padding: 16,
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
    marginTop: 30,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
  },
  solutionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 15,
  },
  solutionText: {
    fontSize: 16,
    color: '#08172E',
    marginBottom: 10,
  },
  iterationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginTop: 20,
    marginBottom: 10,
  },
  tableauContainer: {
    marginTop: 10,
  },
  tableau: {
    marginRight: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tableauTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 10,
  },
  tableauRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tableauCell: {
    width: 80,
    textAlign: 'center',
    color: '#08172E',
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 15,
  },
}); 