import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

const CORES = {
  vinho: "#a52a2a",
  dourado: "#ffd700",
  fundo: "#fdfcf0",
};

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

export default function MuralScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mural de Avisos</Text>
        <Text style={styles.headerSubtitle}>
          Fique por dentro das novidades da IPAA
        </Text>
      </View>

      <FlatList
        data={AVISOS_EXEMPLO}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagemCartaz} />
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
  imagemCartaz: { width: "100%", height: 200, resizeMode: "cover" },
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
