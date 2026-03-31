import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  // Função para abrir os links (WhatsApp, YouTube, etc)
  const openSocial = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir link", err),
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com o ícone corrigido */}
      <LinearGradient
        colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]}
        style={styles.header}
      >
        <Ionicons name="home" size={60} color="white" />
        <Text style={styles.title}>Igreja Pentecostal</Text>
        <Text style={styles.subtitle}>"Levando a Palavra ao Coração"</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🙏 Nossos Cultos</Text>
          <Text style={styles.cardText}>
            • Domingo: 19:00h - Culto da Família
          </Text>
          <Text style={styles.cardText}>
            • Quarta-feira: 20:00h - Culto de Ensino
          </Text>
          <Text style={styles.cardText}>
            • Sexta-feira: 19:30h - Círculo de Oração
          </Text>
        </View>

        {/* BOTÃO DO WHATSAPP - Coloque seu número abaixo */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => openSocial("https://wa.me/5561993677819")}
        >
          <Ionicons name="logo-whatsapp" size={24} color="white" />
          <Text style={styles.buttonText}>Falar com o Pastor</Text>
        </TouchableOpacity>

        {/* BOTÃO DO CULTO AO VIVO */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF0000" }]}
          onPress={() => openSocial("https://www.youtube.com")}
        >
          <Ionicons name="videocam" size={24} color="white" />
          <Text style={styles.buttonText}>Culto ao Vivo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    padding: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { color: "white", fontSize: 28, fontWeight: "bold", marginTop: 10 },
  subtitle: { color: "white", fontSize: 16, fontStyle: "italic" },
  content: { padding: 20 },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardText: { fontSize: 16, color: "#666", marginBottom: 5 },
  button: {
    backgroundColor: "#25D366",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
