import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="async-storage" options={{ title: 'AsyncStorage' }} />
      <Stack.Screen name="sqlite" options={{ title: 'SQLite' }} />
    </Stack>
  );
}
