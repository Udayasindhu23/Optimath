import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Route } from 'lucide-react-native';
import Svg, { Circle, Line, Text as SvgText, Path } from 'react-native-svg';

interface City {
  id: string;
  x: number;
  y: number;
}

interface Route {
  path: number[];
  totalDistance: number;
  steps: {
    from: string;
    to: string;
    distance: number;
  }[];
}

export default function TravelingSalesman() {
  const [cities, setCities] = useState<string[]>(['A', 'B', 'C', 'D']);
  const [distances, setDistances] = useState<number[][]>([
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
  ]);
  const [solution, setSolution] = useState<Route | null>(null);

  const addCity = () => {
    const newCityName = String.fromCharCode(65 + cities.length);
    const newDistances = distances.map(row => [...row, 0]);
    newDistances.push(Array(cities.length + 1).fill(0));
    setCities([...cities, newCityName]);
    setDistances(newDistances);
  };

  const handleDistanceChange = (fromIndex: number, toIndex: number, value: string) => {
    const newValue = parseInt(value) || 0;
    const newDistances = distances.map(row => [...row]);
    newDistances[fromIndex][toIndex] = newValue;
    newDistances[toIndex][fromIndex] = newValue; // Make matrix symmetric
    setDistances(newDistances);
  };

  const solveTSP = () => {
    const n = cities.length;
    const visited = new Set([0]);
    const path = [0];
    let totalDistance = 0;
    const steps: { from: string; to: string; distance: number; }[] = [];

    while (visited.size < n) {
      let lastCity = path[path.length - 1];
      let nearestCity = -1;
      let minDistance = Infinity;

      for (let city = 0; city < n; city++) {
        if (!visited.has(city) && distances[lastCity][city] < minDistance) {
          minDistance = distances[lastCity][city];
          nearestCity = city;
        }
      }

      if (nearestCity === -1) break;

      steps.push({
        from: cities[lastCity],
        to: cities[nearestCity],
        distance: distances[lastCity][nearestCity]
      });

      visited.add(nearestCity);
      path.push(nearestCity);
      totalDistance += minDistance;
    }

    // Return to starting city
    const lastCity = path[path.length - 1];
    totalDistance += distances[lastCity][0];
    steps.push({
      from: cities[lastCity],
      to: cities[0],
      distance: distances[lastCity][0]
    });
    path.push(0);

    setSolution({
      path,
      totalDistance,
      steps
    });
  };

  // Calculate city positions for visualization
  const getCityPositions = (): City[] => {
    const radius = 120;
    const centerX = 200;
    const centerY = 200;
    
    return cities.map((city, index) => {
      const angle = (index * 2 * Math.PI) / cities.length - Math.PI / 2;
      return {
        id: city,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Route size={32} color="#8b5cf6" />
        </View>
        <Text style={styles.title}>Traveling Salesman Problem</Text>
      </View>

      <Text style={styles.description}>
        Find the shortest possible route that visits each city exactly once and returns
        to the starting city.
      </Text>

      <View style={styles.matrixContainer}>
        <Text style={styles.subtitle}>Distance Matrix</Text>
        <ScrollView horizontal>
          <View>
            <View style={styles.matrixRow}>
              <View style={styles.matrixCell}>
                <Text style={styles.matrixHeader}></Text>
              </View>
              {cities.map((city) => (
                <View key={city} style={styles.matrixCell}>
                  <Text style={styles.matrixHeader}>{city}</Text>
                </View>
              ))}
            </View>
            {cities.map((fromCity, i) => (
              <View key={fromCity} style={styles.matrixRow}>
                <View style={styles.matrixCell}>
                  <Text style={styles.matrixHeader}>{fromCity}</Text>
                </View>
                {cities.map((toCity, j) => (
                  <View key={`${fromCity}-${toCity}`} style={styles.matrixCell}>
                    {i === j ? (
                      <Text style={styles.matrixValue}>0</Text>
                    ) : (
                      <TextInput
                        style={styles.matrixInput}
                        value={distances[i][j].toString()}
                        onChangeText={(value) => handleDistanceChange(i, j, value)}
                        keyboardType="numeric"
                      />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={addCity}>
          <Text style={styles.addButtonText}>Add City</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.solveButton} onPress={solveTSP}>
          <Text style={styles.solveButtonText}>Find Shortest Route</Text>
        </TouchableOpacity>
      </View>

      {solution && (
        <View style={styles.solutionContainer}>
          <Text style={styles.subtitle}>Solution</Text>
          <Text style={styles.solutionText}>
            Total Distance: {solution.totalDistance}
          </Text>
          <Text style={styles.solutionText}>
            Route: {solution.path.map(i => cities[i]).join(' → ')}
          </Text>

          <View style={styles.visualizationContainer}>
            <Svg width={400} height={400}>
              {/* Draw all possible edges with weights */}
              {cities.map((fromCity, i) => 
                cities.map((toCity, j) => {
                  if (i === j) return null;
                  const positions = getCityPositions();
                  const from = positions[i];
                  const to = positions[j];
                  
                  // Calculate the angle for the arrow
                  const dx = to.x - from.x;
                  const dy = to.y - from.y;
                  const angle = Math.atan2(dy, dx);
                  
                  // Adjust end points to account for circle radius
                  const radius = 20;
                  const startX = from.x + radius * Math.cos(angle);
                  const startY = from.y + radius * Math.sin(angle);
                  const endX = to.x - radius * Math.cos(angle);
                  const endY = to.y - radius * Math.sin(angle);

                  // Calculate midpoint for weight label
                  const midX = (startX + endX) / 2;
                  const midY = (startY + endY) / 2;

                  // Check if this edge is part of the solution
                  const isPartOfSolution = solution?.path.some((cityIndex, index) => 
                    index < solution.path.length - 1 && 
                    cityIndex === i && 
                    solution.path[index + 1] === j
                  );

                  return (
                    <React.Fragment key={`edge-${i}-${j}`}>
                      {/* Draw edge */}
                      <Line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke={isPartOfSolution ? "#10b981" : "#e2e8f0"}
                        strokeWidth={isPartOfSolution ? 3 : 1}
                      />
                      
                      {/* Draw arrow head */}
                      <Path
                        d={`M ${endX} ${endY} L ${endX - 10 * Math.cos(angle - Math.PI/6)} ${endY - 10 * Math.sin(angle - Math.PI/6)} L ${endX - 10 * Math.cos(angle + Math.PI/6)} ${endY - 10 * Math.sin(angle + Math.PI/6)} Z`}
                        fill={isPartOfSolution ? "#10b981" : "#e2e8f0"}
                      />

                      {/* Draw weight label with background */}
                      <Circle
                        cx={midX}
                        cy={midY}
                        r={12}
                        fill="white"
                        stroke={isPartOfSolution ? "#10b981" : "#e2e8f0"}
                      />
                      <SvgText
                        x={midX}
                        y={midY + 4}
                        fill={isPartOfSolution ? "#10b981" : "#64748b"}
                        textAnchor="middle"
                        fontSize="12"
                      >
                        {distances[i][j]}
                      </SvgText>
                    </React.Fragment>
                  );
                })
              )}

              {/* Draw cities */}
              {getCityPositions().map((city) => (
                <React.Fragment key={`city-${city.id}`}>
                  <Circle
                    cx={city.x}
                    cy={city.y}
                    r={20}
                    fill={city.id === cities[0] ? '#10b981' : '#8b5cf6'}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  <SvgText
                    x={city.x}
                    y={city.y + 6}
                    fill="white"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {city.id}
                  </SvgText>
                </React.Fragment>
              ))}
            </Svg>
          </View>

          <Text style={styles.subtitle}>Route Details</Text>
          <View style={styles.routeTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>From</Text>
              <Text style={styles.tableHeaderText}>To</Text>
              <Text style={styles.tableHeaderText}>Distance</Text>
            </View>
            {solution.steps.map((step, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{step.from}</Text>
                <Text style={styles.tableCell}>{step.to}</Text>
                <Text style={styles.tableCell}>{step.distance}</Text>
              </View>
            ))}
          </View>
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
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  matrixContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  matrixRow: {
    flexDirection: 'row',
  },
  matrixCell: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  matrixHeader: {
    fontWeight: '600',
    color: '#1e293b',
  },
  matrixInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  matrixValue: {
    color: '#64748b',
  },
  addButton: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  addButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  solveButton: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  solveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  solutionContainer: {
    marginTop: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  solutionText: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 8,
  },
  visualizationContainer: {
    alignItems: 'center',
    marginVertical: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
  },
  routeTable: {
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 12,
  },
  tableCell: {
    flex: 1,
    color: '#64748b',
    textAlign: 'center',
  },
}); 