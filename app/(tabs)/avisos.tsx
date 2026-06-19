import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";

const CORES = {
  dourado: "#ffd700",
  fundo: "#fdfcf0",
  vinho: "#7a1c1c" // Caso falte o vinho que você usa nos cards
};

// 🚨 COLE O SEU LINK DO GOOGLE APPS SCRIPT AQUI DENTRO DAS ASPAS:
const API_URL = "https://script.google.com/macros/s/AKfycbwdCpeToxKuwVpgnw3Zme2cLUZ6DxyK4VcJPUj9hAXF9fm0lW-1coPthSmKOXXMfrJh/exec";

// Exemplo de como os dados virão (depois conectaremos na planilha)
const AVISOS_EXEMPLO = [
  {
    id: "1",
    titulo: "Grande Culto de Celebração",
    descricao: "Venha participar conosco deste culto especial de gratidão.",
    data: "15/04/2026",
    imagem:
      "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=500", // Aqui irá o link do seu cartaz
  },
  {
    id: "2",
    titulo: "Consagração Geral",
    descricao: "Momento de intercessão e busca pelo Espírito Santo.",
    data: "18/04/2026",
    imagem:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=500",
  },
];

export default function Avisos() {
  const [avisos, setAvisos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const buscarAvisos = async () => {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL);
      const dados = await reply.json();
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: CORES.fundo }}>
        <ActivityIndicator size="large" color={CORES.vinho} />
        <Text style={{ marginTop: 10, color: '#666' }}>Buscando avisos da IPAA...</Text>
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
 imagemCartaz: { width: "100%", aspectRatio: 0.7, resizeMode: "contain", backgroundColor: "#f0f0f0" },
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
