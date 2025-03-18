import { Stack } from 'expo-router';

export default function TopicsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerBackVisible: false
      }}>
      <Stack.Screen 
        name="index"
        options={{
          headerLeft: () => null
        }}
      />
      <Stack.Screen 
        name="[id]"
        options={{
          presentation: 'card',
        }}
      />
    </Stack>
  );
} 