import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Brain, Infinity as InfinityIcon } from 'lucide-react-native';

interface Constraint {
  x1: string;
  x2: string;
  x3: string;
  sign: '<=' | '>=' | '=';
  rhs: string;
}

interface DualityFormData {
  objective: {
    type: 'max' | 'min';
    x1: string;
    x2: string;
    x3: string;
    numVars: number;
  };
  constraints: Constraint[];
}

interface DualProblem {
  objective: {
    type: string;
    x1: number;
    x2: number;
    x3: number;
    numVars: number;
  };
  constraints: {
    x1: number;
    x2: number;
    x3: number;
    sign: string;
    rhs: number;
  }[];
  formulation: string;
}

interface DualitySolution {
  primal: {
    type: string;
    solution: number[];
    objectiveValue: number;
    status: string;
  };
  dual: {
    type: string;
    solution: number[];
    objectiveValue: number;
    status: string;
    formulation: DualProblem;
  };
}

export default function DualityMethod() {
  const [formData, setFormData] = useState<DualityFormData>({
    objective: {
      type: 'max',
      x1: '',
      x2: '',
      x3: '',
      numVars: 2
    },
    constraints: [
      { x1: '', x2: '', x3: '', sign: '<=', rhs: '' },
      { x1: '', x2: '', x3: '', sign: '<=', rhs: '' }
    ]
  });

  const [solution, setSolution] = useState<DualitySolution | null>(null);

  const getDual = (primalType: string, objectiveCoeffs: number[], constraints: number[][], constraintSigns: string[], rhsValues: number[]) => {
    const numConstraints = constraints.length;
    const numVariables = objectiveCoeffs.length;
    
    // Determine dual type (opposite of primal)
    const dualType = primalType.toLowerCase() === 'max' ? 'min' : 'max';
    
    // Create dual objective coefficients from primal RHS values
    const dualObjective = {
      type: dualType,
      x1: rhsValues[0] || 0,
      x2: rhsValues[1] || 0,
      x3: rhsValues[2] || 0,
      numVars: numConstraints
    };
    
    // Create dual constraints
    const dualConstraints = [];
    
    // For each primal variable, create a dual constraint
    for (let j = 0; j < numVariables; j++) {
      // Get coefficients for this constraint from the j-th column of primal constraints
      const constraintCoeffs = constraints.map(row => row[j]);
      
      // Determine dual constraint sign based on primal type
      const dualSign = primalType.toLowerCase() === 'max' ? '>=' : '<=';
      
      // Create dual constraint
      const dualConstraint = {
        x1: constraintCoeffs[0] || 0,
        x2: constraintCoeffs[1] || 0,
        x3: constraintCoeffs[2] || 0,
        sign: dualSign,
        rhs: objectiveCoeffs[j]
      };
      
      dualConstraints.push(dualConstraint);
    }

    return {
      objective: dualObjective,
      constraints: dualConstraints,
      formulation: formatDualProblem(dualType, rhsValues, constraints, objectiveCoeffs, numConstraints, constraintSigns)
    };
  };

  const formatDualProblem = (dualType: string, rhsValues: number[], constraints: number[][], objectiveCoeffs: number[], numConstraints: number, primalConstraintSigns: string[]) => {
    let formulation = `Dual Problem:\n\n`;
    formulation += `${dualType === 'min' ? 'Minimize' : 'Maximize'}\n`;
    
    // Objective function
    formulation += 'Z = ';
    for (let i = 0; i < numConstraints; i++) {
      if (i > 0) formulation += ' + ';
      formulation += `${rhsValues[i]}y${i + 1}`;
    }
    formulation += '\n\nSubject To:\n';
    
    // Constraints
    for (let j = 0; j < constraints[0].length; j++) {
      let constraint = '';
      for (let i = 0; i < numConstraints; i++) {
        const coeff = constraints[i][j];
        if (i > 0 && coeff >= 0) constraint += ' + ';
        constraint += `${coeff}y${i + 1}`;
      }
      constraint += ` ${dualType === 'min' ? '>=' : '<='} ${objectiveCoeffs[j]}\n`;
      formulation += constraint;
    }
    
    // Sign restrictions based on primal constraint types
    formulation += '\nSign restrictions:\n';
    for (let i = 0; i < numConstraints; i++) {
      const primalSign = primalConstraintSigns[i];
      if (dualType === 'min') {  // Primal is max
        if (primalSign === '<=') {
          formulation += `y${i + 1} ≥ 0\n`;
        } else if (primalSign === '>=') {
          formulation += `y${i + 1} ≤ 0\n`;
        } else {
          formulation += `y${i + 1} unrestricted\n`;
        }
      } else {  // Primal is min
        if (primalSign === '<=') {
          formulation += `y${i + 1} ≤ 0\n`;
        } else if (primalSign === '>=') {
          formulation += `y${i + 1} ≥ 0\n`;
        } else {
          formulation += `y${i + 1} unrestricted\n`;
        }
      }
    }
    
    return formulation;
  };

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
    const tableau = Array(constraints.length + 1).fill(0)
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
    let minRatio = Number.POSITIVE_INFINITY;
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
        solution[j] = tableau[oneRow][tableau[0].length - 1];
      }
    }
    
    return solution;
  };

  const solveTableau = (tableau: number[][]) => {
    let currentTableau = tableau.map(row => [...row]);
    const maxIterations = 100;
    let iterCount = 0;

    while (iterCount < maxIterations) {
      const pivotCol = findPivotColumn(currentTableau);
      if (pivotCol === -1) break;

      const pivotRow = findPivotRow(currentTableau, pivotCol);
      if (pivotRow === -1) {
        return { status: 'unbounded' };
      }

      currentTableau = performPivot(currentTableau, pivotRow, pivotCol);
      iterCount++;
    }

    if (iterCount === maxIterations) {
      return { status: 'not_converged' };
    }

    // Check if solution is feasible (no artificial variables in basis)
    const numColumns = currentTableau[0].length;
    const numArtificialVars = Math.floor((numColumns - 3) / 2);
    
    for (let j = numColumns - numArtificialVars - 1; j < numColumns - 1; j++) {
      for (let i = 0; i < currentTableau.length - 1; i++) {
        if (Math.abs(currentTableau[i][j] - 1) < 0.000001 && currentTableau[i][numColumns - 1] > 0.000001) {
          return { status: 'infeasible' };
        }
      }
    }

    const solution = extractSolution(currentTableau);
    const objectiveValue = -currentTableau[currentTableau.length - 1][currentTableau[0].length - 1];

    return {
      status: 'optimal',
      solution,
      objectiveValue
    };
  };

  const solve = () => {
    try {
      // Extract primal problem data
      const primalType = formData.objective.type;
      const objectiveCoeffs = [
        parseFloat(formData.objective.x1) || 0,
        parseFloat(formData.objective.x2) || 0,
        parseFloat(formData.objective.x3) || 0
      ].slice(0, formData.objective.numVars);
      
      const constraints = formData.constraints.map(c => [
        parseFloat(c.x1) || 0,
        parseFloat(c.x2) || 0,
        parseFloat(c.x3) || 0
      ].slice(0, formData.objective.numVars));
      
      const constraintSigns = formData.constraints.map(c => c.sign);
      const rhsValues = formData.constraints.map(c => parseFloat(c.rhs) || 0);
      
      // Get dual problem
      const dualProblem = getDual(primalType, objectiveCoeffs, constraints, constraintSigns, rhsValues);
      
      // Create tableaus for both problems
      const primalTableau = createTableau(formData.objective, formData.constraints);
      const dualTableau = createTableau(dualProblem.objective, dualProblem.constraints);
      
      // Solve both problems
      const primalSolution = solveTableau(primalTableau);
      const dualSolution = solveTableau(dualTableau);
      
      // Set solution state
      setSolution({
        primal: {
          type: primalType,
          solution: primalSolution.solution || [],
          objectiveValue: primalSolution.status === 'optimal' && typeof primalSolution.objectiveValue === 'number'
            ? (primalType === 'min' ? primalSolution.objectiveValue : -primalSolution.objectiveValue)
            : 0,
          status: primalSolution.status
        },
        dual: {
          type: dualProblem.objective.type,
          solution: dualSolution.solution || [],
          objectiveValue: dualSolution.status === 'optimal' && typeof dualSolution.objectiveValue === 'number'
            ? (dualProblem.objective.type === 'min' ? dualSolution.objectiveValue : -dualSolution.objectiveValue)
            : 0,
          status: dualSolution.status,
          formulation: dualProblem
        }
      });
      
    } catch (error) {
      console.error('Error in solve:', error);
      alert('An error occurred while solving the duality problem');
    }
  };

  const addConstraint = () => {
    setFormData({
      ...formData,
      constraints: [...formData.constraints, { x1: '', x2: '', x3: '', sign: '<=', rhs: '' }]
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <InfinityIcon size={32} color="#8b5cf6" />
        </View>
        <Text style={styles.title}>Duality Method</Text>
      </View>

      <Text style={styles.description}>
        Transform linear programming problems between their primal and dual forms to gain deeper insights into optimal solutions. Essential for sensitivity analysis and economic interpretations.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objective Function
        </Text>
        
        {/* Objective Function */}
        <View style={styles.objectiveContainer}>
          <TouchableOpacity
            style={[styles.smallTypeButton, formData.objective.type === 'max' && styles.typeButtonActive]}
            onPress={() => setFormData({
              ...formData,
              objective: { ...formData.objective, type: 'max' }
            })}
          >
            <Text style={[styles.smallTypeText, formData.objective.type === 'max' && styles.typeButtonTextActive]}>
              Max
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.smallTypeButton, formData.objective.type === 'min' && styles.typeButtonActive]}
            onPress={() => setFormData({
              ...formData,
              objective: { ...formData.objective, type: 'min' }
            })}
          >
            <Text style={[styles.smallTypeText, formData.objective.type === 'min' && styles.typeButtonTextActive]}>
              Min
            </Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>Z = </Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.smallInput}
              value={formData.objective.x1}
              onChangeText={(text) => setFormData({
                ...formData,
                objective: { ...formData.objective, x1: text }
              })}
              keyboardType="numeric"
              placeholder="x₁"
            />
            <Text style={styles.smallText}>x₁</Text>
          </View>
          <Text style={styles.smallText}>+</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.smallInput}
              value={formData.objective.x2}
              onChangeText={(text) => setFormData({
                ...formData,
                objective: { ...formData.objective, x2: text }
              })}
              keyboardType="numeric"
              placeholder="x₂"
            />
            <Text style={styles.smallText}>x₂</Text>
          </View>
        </View>

        {/* Constraints */}
        <Text style={styles.sectionTitle}>Subject to:</Text>
        <View style={styles.constraintsBox}>
          {formData.constraints.map((constraint, index) => (
            <View key={index} style={styles.constraintRow}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.smallInput}
                  value={constraint.x1}
                  onChangeText={(text) => {
                    const newConstraints = [...formData.constraints];
                    newConstraints[index] = { ...constraint, x1: text };
                    setFormData({ ...formData, constraints: newConstraints });
                  }}
                  keyboardType="numeric"
                  placeholder="x₁"
                />
                <Text style={styles.smallText}>x₁</Text>
              </View>
              <Text style={styles.smallText}>+</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.smallInput}
                  value={constraint.x2}
                  onChangeText={(text) => {
                    const newConstraints = [...formData.constraints];
                    newConstraints[index] = { ...constraint, x2: text };
                    setFormData({ ...formData, constraints: newConstraints });
                  }}
                  keyboardType="numeric"
                  placeholder="x₂"
                />
                <Text style={styles.smallText}>x₂</Text>
              </View>
              <TouchableOpacity
                style={styles.smallSignButton}
                onPress={() => {
                  const signs: Array<'<=' | '>=' | '='> = ['<=', '>=', '='];
                  const currentIndex = signs.indexOf(constraint.sign);
                  const newConstraints = [...formData.constraints];
                  newConstraints[index] = {
                    ...constraint,
                    sign: signs[(currentIndex + 1) % signs.length]
                  };
                  setFormData({ ...formData, constraints: newConstraints });
                }}
              >
                <Text style={styles.smallSignText}>{constraint.sign}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.smallInput}
                value={constraint.rhs}
                onChangeText={(text) => {
                  const newConstraints = [...formData.constraints];
                  newConstraints[index] = { ...constraint, rhs: text };
                  setFormData({ ...formData, constraints: newConstraints });
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

        <TouchableOpacity style={styles.solveButton} onPress={solve}>
          <Text style={styles.solveButtonText}>Solve</Text>
        </TouchableOpacity>

        {/* Solution Display */}
        {solution && (
          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>Solution</Text>
            
            {/* Primal Solution */}
            <View style={styles.problemSolution}>
              <Text style={styles.problemTitle}>Primal Solution</Text>
              {solution.primal.status === 'optimal' ? (
                <>
                  <Text style={styles.solutionText}>Status: Optimal solution found</Text>
                  <Text style={styles.solutionText}>x₁ = {solution.primal.solution[0].toFixed(4)}</Text>
                  <Text style={styles.solutionText}>x₂ = {solution.primal.solution[1].toFixed(4)}</Text>
                  <Text style={styles.solutionText}>
                    Optimal Value: {solution.primal.objectiveValue.toFixed(4)}
                  </Text>
                </>
              ) : (
                <Text style={styles.solutionText}>
                  Status: {solution.primal.status.charAt(0).toUpperCase() + solution.primal.status.slice(1)}
                </Text>
              )}
            </View>

            {/* Dual Solution */}
            <View style={styles.problemSolution}>
              <Text style={styles.problemTitle}>Dual Solution</Text>
              <Text style={styles.formulationText}>
                {solution.dual.formulation.formulation}
              </Text>
              {solution.dual.status === 'optimal' ? (
                <>
                  <Text style={styles.solutionText}>Status: Optimal solution found</Text>
                  <Text style={styles.solutionText}>y₁ = {solution.dual.solution[0].toFixed(4)}</Text>
                  <Text style={styles.solutionText}>y₂ = {solution.dual.solution[1].toFixed(4)}</Text>
                  <Text style={styles.solutionText}>
                    Optimal Value: {solution.dual.objectiveValue.toFixed(4)}
                  </Text>
                </>
              ) : (
                <Text style={styles.solutionText}>
                  Status: {solution.dual.status.charAt(0).toUpperCase() + solution.dual.status.slice(1)}
                </Text>
              )}
            </View>

            {/* Strong Duality */}
            {solution.primal.status === 'optimal' && solution.dual.status === 'optimal' && (
              <View style={styles.strongDuality}>
                <Text style={styles.problemTitle}>Strong Duality</Text>
                <Text style={styles.solutionText}>
                  Primal Optimal Value = Dual Optimal Value = {solution.primal.objectiveValue.toFixed(4)}
                </Text>
                <Text style={styles.solutionText}>
                  This confirms that strong duality holds for this problem.
                </Text>
              </View>
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
    padding: 20,
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
    backgroundColor: '#f3e8ff',
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
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 20,
  },
  objectiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
  },
  smallTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#f1f5f9',
    minWidth: 45,
    height: 32,
  },
  smallTypeText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#08172E',
  },
  typeButtonTextActive: {
    color: '#ffffff',
  },
  smallText: {
    fontSize: 14,
    color: '#08172E',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  smallInput: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 4,
    width: 40,
    height: 32,
    textAlign: 'center',
    fontSize: 14,
    color: '#08172E',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  constraintsBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginBottom: 16,
  },
  constraintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 6,
  },
  smallSignButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 40,
    height: 32,
  },
  smallSignText: {
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
    fontSize: 16,
    color: '#08172E',
    fontWeight: '500',
    textAlign: 'center',
  },
  solveButton: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  solveButtonText: {
    fontSize: 18,
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
    marginBottom: 20,
  },
  problemSolution: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  problemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#08172E',
    marginBottom: 12,
  },
  solutionText: {
    fontSize: 16,
    color: '#08172E',
    marginBottom: 8,
  },
  formulationText: {
    fontSize: 14,
    color: '#08172E',
    fontFamily: 'monospace',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  strongDuality: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
}); 