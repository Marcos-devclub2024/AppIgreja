import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Definição das cores principais (Fé e Ouro)
const CORES = {
  primaria: "#a52a2a", // Vermelho Vinho (Sangue e Fogo)
  secundaria: "#ffd700", // Dourado (A Arca da Aliança)
  fundo: "#fdfcf0", // Creme suave (Acolhedor)
  textoEscuro: "#3e2723", // Marrom escuro (Para textos)
  textoClaro: "#fff", // Branco (Para o cabeçalho)
};

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🏛️ CABEÇALHO COM O LOGO CORRETO (ARCA DA ALIANÇA) */}
      <View style={styles.header}>
        {/* Usamos um ícone dourado que simboliza a glória e o fogo */}
        <FontAwesome5
          name="place-of-worship"
          size={60}
          color={CORES.secundaria}
        />
        {/* Nome Completo da Igreja */}
        <Text style={styles.churchName}>Igreja Pentecostal</Text>
        <Text style={styles.churchName}>Arca da Aliança</Text>
        {/* Abreviação IPAA */}
        <View style={styles.abbreviationBadge}>
          <Text style={styles.abbreviationText}>IPAA</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* 📖 MENSAGEM BÍBLICA (O CORAÇÃO DO APP) */}
        <View style={styles.versiculoCard}>
          <Ionicons
            name="book"
            size={24}
            color={CORES.primaria}
            style={{ marginBottom: 5 }}
          />
          <Text style={styles.versiculoTexto}>
            {
              '"Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."'
            }
          </Text>
          <Text style={styles.versiculoReferencia}>Salmos 119:105</Text>
        </View>

        {/* 📅 AGENDA DE CULTOS (OS HORÁRIOS) */}
        <Text style={styles.sectionTitle}>Horários dos Cultos</Text>
        <View style={styles.cultosContainer}>
          <View style={styles.cultoItem}>
            <View style={styles.cultoDia}>
              <Text style={styles.cultoDiaTexto}>DOM</Text>
            </View>
            <View style={styles.cultoInfo}>
              <Text style={styles.cultoNome}>Culto de Celebração</Text>
              <Text style={styles.cultoHora}>18:00h e 20:00h</Text>
            </View>
          </View>

          <View style={styles.cultoItem}>
            <View style={[styles.cultoDia, { backgroundColor: "#ff8c00" }]}>
              <Text style={styles.cultoDiaTexto}>QUA</Text>
            </View>
            <View style={styles.cultoInfo}>
              <Text style={styles.cultoNome}>Culto de Oração e Ensino</Text>
              <Text style={styles.cultoHora}>19:30h</Text>
            </View>
          </View>
        </View>

        {/* 🔘 PAINEL DE GESTÃO (ATALHOS) */}
        <Text style={styles.sectionTitle}>Painel Administrativo - IPAA</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="people" size={30} color={CORES.primaria} />
            <Text style={styles.cardLabel}>Membros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="megaphone" size={30} color={CORES.primaria} />
            <Text style={styles.cardLabel}>Mural de Avisos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CORES.fundo },
  header: {
    backgroundColor: CORES.primaria, // Vermelho Vinho (Acolhedor e Forte)
    paddingTop: 70,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 10, // Sombrinha forte
  },
  churchName: {
    color: CORES.textoClaro,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    textTransform: "uppercase", // Tudo maiúsculo
    letterSpacing: 1, // Espaçamento entre letras
  },
  abbreviationBadge: {
    backgroundColor: CORES.secundaria, // Dourado
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 15,
  },
  abbreviationText: {
    color: CORES.textoEscuro, // Marrom escuro para contraste
    fontSize: 18,
    fontWeight: "bold",
  },

  content: { padding: 20 },

  versiculoCard: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 25,
    marginTop: -55, // Faz o card subir sobre o vinho
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    alignItems: "center",
    borderTopWidth: 5, // Borda dourada no topo
    borderTopColor: CORES.secundaria,
  },
  versiculoTexto: {
    fontSize: 17,
    color: CORES.textoEscuro,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 24,
  },
  versiculoReferencia: {
    fontSize: 15,
    fontWeight: "bold",
    color: CORES.primaria,
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: CORES.textoEscuro,
    marginTop: 30,
    marginBottom: 15,
  },

  cultosContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 4,
  },
  cultoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cultoDia: {
    backgroundColor: CORES.primaria,
    width: 55,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cultoDiaTexto: { color: CORES.textoClaro, fontWeight: "bold", fontSize: 16 },
  cultoInfo: { marginLeft: 15 },
  cultoNome: { fontSize: 17, fontWeight: "bold", color: CORES.textoEscuro },
  cultoHora: { fontSize: 15, color: "#666" },

  grid: { flexDirection: "row", justifyContent: "space-between" },
  card: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardLabel: {
    marginTop: 12,
    fontWeight: "bold",
    color: CORES.primaria,
    fontSize: 16,
  },
});
