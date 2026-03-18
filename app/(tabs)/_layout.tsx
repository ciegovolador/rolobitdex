import { View, useWindowDimensions, StyleSheet } from "react-native";
import { Tabs, usePathname, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Sidebar } from "../../src/components/Sidebar";
import { colors, breakpoints } from "../../src/constants/theme";

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= breakpoints.tablet;
  const pathname = usePathname();

  const activeTab =
    pathname === "/" || pathname.startsWith("/index") ? "index" :
    pathname.startsWith("/trades") ? "trades" :
    pathname.startsWith("/address") ? "address" :
    pathname.startsWith("/settings") ? "settings" : "index";

  function handleTabPress(name: string) {
    const route = name === "index" ? "/" : `/${name}`;
    router.push(route as any);
  }

  if (isDesktop) {
    return (
      <View style={styles.desktopLayout}>
        <Sidebar activeTab={activeTab} onTabPress={handleTabPress} />
        <View style={styles.desktopContent}>
          <Tabs
            screenOptions={{
              tabBarStyle: { display: "none" },
              headerStyle: { backgroundColor: colors.surface },
              headerTintColor: "#fff",
            }}
          >
            <Tabs.Screen name="index" options={{ title: "Contacts" }} />
            <Tabs.Screen name="trades" options={{ title: "Trades" }} />
            <Tabs.Screen name="address" options={{ title: "My Address" }} />
            <Tabs.Screen name="settings" options={{ title: "Settings" }} />
          </Tabs>
        </View>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trades"
        options={{
          title: "Trades",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="address"
        options={{
          title: "My Address",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  desktopLayout: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
  },
  desktopContent: {
    flex: 1,
  },
});
