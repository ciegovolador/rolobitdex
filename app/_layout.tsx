import { useWindowDimensions } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors, breakpoints } from "../src/constants/theme";

export default function RootLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= breakpoints.tablet;

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="contact/[id]"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: "#fff",
            title: "Contact",
            ...(isDesktop ? { presentation: "modal" } : {}),
          }}
        />
        <Stack.Screen
          name="contact/new"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: "#fff",
            title: "New Contact",
            ...(isDesktop ? { presentation: "modal" } : {}),
          }}
        />
        <Stack.Screen
          name="trade/[id]"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: "#fff",
            title: "Trade",
            ...(isDesktop ? { presentation: "modal" } : {}),
          }}
        />
        <Stack.Screen
          name="trade/new"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: "#fff",
            title: "New Trade",
            ...(isDesktop ? { presentation: "modal" } : {}),
          }}
        />
        <Stack.Screen
          name="scan"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: "#fff",
            title: "Scan QR",
            ...(isDesktop ? { presentation: "modal" } : {}),
          }}
        />
      </Stack>
    </>
  );
}
