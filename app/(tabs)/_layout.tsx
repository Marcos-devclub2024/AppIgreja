import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#a52a2a", // Vinho IPAA quando selecionado
        tabBarInactiveTintColor: "#666",
        headerShown: false, // Esconde o título de todas as telas para ficar limpo
        tabBarStyle: { backgroundColor: "#fff" },
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

      {/* 4. Financeiro */}
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
