import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#1a2a6c", dark: "#1a2a6c" }}
      headerImage={
        <Ionicons
          size={310}
          name="stats-chart"
          style={styles.headerImage}
          color="rgba(255,255,255,0.2)"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Financeiro</ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardInfo}>
        <Ionicons name="construct-outline" size={40} color="#1a2a6c" />
        <ThemedText type="defaultSemiBold" style={styles.statusText}>
          Módulo em Desenvolvimento
        </ThemedText>
        <ThemedText style={{ textAlign: "center" }}>
          Em breve, você poderá gerenciar entradas, saídas e relatórios da Arca
          por aqui.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -50,
    left: -20,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  cardInfo: {
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    marginTop: 20,
  },
  statusText: {
    fontSize: 18,
    color: "#1a2a6c",
    marginVertical: 10,
  },
});
