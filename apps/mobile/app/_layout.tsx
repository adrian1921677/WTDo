import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'WTDo' }} />
      <Stack.Screen name="create" options={{ title: 'Create Reminder' }} />
    </Stack>
  );
}

