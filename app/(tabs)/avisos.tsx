import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CORES = {
  dourado: "#ffd700",
  fundo: "#fdfcf0",
  vinho: "#7a1c1c",
};

// Seu link do Google Apps Script
const API_URL =
  "https://script.google.com/macros/s/AKfycbwdCpeToxKuwVpgnw3Zme2cLUZ6DxyK4VcJPUj9hAXF9fm0lW-1coPthSmKOXXMfrJh/exec";

export default function Avisos() {
  const [avisos, setAvisos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const buscarAvisos = async () => {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL);
      // CORRIGIDO: Agora usa resposta.json() corretamente
      const dados = await resposta.json();
      setAvisos(dados);
    } catch (erro) {
      console.error("Erro ao buscar avisos da planilha:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarAvisos();
  }, []);

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: CORES.fundo,
        }}
      >
        <ActivityIndicator size="large" color={CORES.vinho} />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Buscando avisos da IPAA...
        </Text>
      </View>
    );
  }

  // Renderização completa da lista na tela
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mural de Avisos</Text>
        <Text style={styles.headerSubtitle}>
          Fique por dentro das novidades da IPAA
        </Text>
      </View>

      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagem ? (
              <Image
                source={{ uri: item.imagem }}
                style={styles.imagemCartaz}
              />
            ) : null}

            <View style={styles.cardConteudo}>
              <View style={styles.tagData}>
                <Ionicons name="calendar-outline" size={14} color="white" />
                <Text style={styles.dataTexto}>{item.data}</Text>
              </View>
              <Text style={styles.tituloAviso}>{item.titulo}</Text>
              <Text style={styles.descricaoAviso}>{item.descricao}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CORES.fundo },
  header: {
    backgroundColor: CORES.vinho,
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "white",
    textAlign: "center",
    opacity: 0.8,
    marginTop: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
    overflow: "hidden",
    borderLeftWidth: 5,
    borderLeftColor: CORES.dourado,
  },
  // Proporção A4 com preenchimento completo (cover)
  imagemCartaz: {
    width: "100%",
    aspectRatio: 0.7,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  cardConteudo: { padding: 15 },
  tagData: {
    backgroundColor: CORES.vinho,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  dataTexto: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "bold",
  },
  tituloAviso: { fontSize: 18, fontWeight: "bold", color: "#333" },
  descricaoAviso: { fontSize: 14, color: "#666", marginTop: 5, lineHeight: 20 },
});
