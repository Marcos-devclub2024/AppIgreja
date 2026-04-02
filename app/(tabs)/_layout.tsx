import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1a2a6c",
        tabBarInactiveTintColor: "#666",
        headerShown: true,
        headerStyle: { backgroundColor: "#1a2a6c" },
        headerTintColor: "#fff",
      }}
    >
      {/* 1. Tela Inicial */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      {/* 2. Membros */}
      <Tabs.Screen
        name="membros"
        options={{
          title: "Membros",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />

      {/* 3. Mural (Avisos) */}
      <Tabs.Screen
        name="avisos"
        options={{
          title: "Mural",
          tabBarIcon: ({ color }) => (
            <Ionicons name="megaphone" size={24} color={color} />
          ),
        }}
      />

      {/* 4. Financeiro (Explore) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Financeiro",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
