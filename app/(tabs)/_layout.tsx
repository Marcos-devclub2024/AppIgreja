import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#a0a0a0",
        tabBarStyle: {
          backgroundColor: "#002F6C",
          height: 65,
          paddingBottom: 8,
          borderTopWidth: 2,
          borderTopColor: "#FFD700",
        },
        headerStyle: {
          backgroundColor: "#002F6C",
          height: 140,
        },
        headerTitleAlign: "center",
        headerTitle: () => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Image
              source={require("../../assets/images/logo_arte.png")}
              style={{ width: 180, height: 110 }}
              resizeMode="contain"
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mural"
        options={{
          title: "Mural",
          tabBarIcon: ({ color }) => (
            <Ionicons name="megaphone" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="membros"
        options={{
          title: "Membros",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
