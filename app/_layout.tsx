import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Esse comando avisa: "Vá direto para a pasta das abas" */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
