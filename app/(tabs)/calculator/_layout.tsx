import { Stack } from 'expo-router';

export default function CalculatorLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Calculator',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="graphical" 
        options={{ 
          title: 'Graphical Method',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="simplex" 
        options={{ 
          title: 'Simplex Method',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="branch-and-bound" 
        options={{ 
          title: 'Branch & Bound',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="knapsack" 
        options={{ 
          title: 'Knapsack Problem',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="travelling-salesman" 
        options={{ 
          title: 'Travelling Salesman Problem',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}