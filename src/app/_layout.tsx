import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Disclaimer",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="start"
        options={{
          title: "Start Menu",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="wumpus"
        options={{
          title: "Wumpus Game",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="credits"
        options={{
          title: "Credits",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
