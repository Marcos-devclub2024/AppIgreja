import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Definição de Cores Oficiais IPAA
const CORES = {
  vinho: "#a52a2a",
  dourado: "#ffd700",
  marrom: "#3e2723",
  fundo: "#fdfcf0",
  branco: "#ffffff",
};

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.banner}>
        <Text style={styles.igrejaNome}>IGREJA PENTECOSTAL</Text>
        <Text style={styles.igrejaNomeDestaque}>ARCA DA ALIANÇA</Text>

        <View style={styles.badgeIPAA}>
          <Text style={styles.badgeText}>IPAA</Text>
        </View>
      </View>

      {/* Card do Versículo */}
      <View style={styles.versiculoCard}>
        <MaterialCommunityIcons
          name="book-open-variant"
          size={28}
          color={CORES.vinho}
        />
        <Text style={styles.versiculoTexto}>
          "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."
        </Text>
        <Text style={styles.versiculoReferencia}>Salmos 119:105</Text>
      </View>

      {/* Seção: Horários dos Cultos */}
      <Text style={styles.sectionTitle}>Horários dos Cultos</Text>

      <View style={styles.horariosWrapper}>
        {/* TERÇA-FEIRA */}
        <View style={styles.cardHorario}>
          <View style={[styles.diaIcon, { backgroundColor: CORES.vinho }]}>
            <Text style={styles.diaTexto}>TER</Text>
          </View>
          <View style={styles.infoHorario}>
            <Text style={styles.cultoTitulo}>Ensino da Palavra</Text>
            <Text style={styles.cultoHora}>19:30h às 21:30h</Text>
          </View>
        </View>

        {/* QUINTA-FEIRA */}
        <View style={styles.cardHorario}>
          <View style={[styles.diaIcon, { backgroundColor: CORES.vinho }]}>
            <Text style={styles.diaTexto}>QUI</Text>
          </View>
          <View style={styles.infoHorario}>
            <Text style={styles.cultoTitulo}>Cura e Libertação</Text>
            <Text style={styles.cultoHora}>19:30h às 21:30h</Text>
          </View>
        </View>

        {/* SÁBADO */}
        <View style={styles.cardHorario}>
          <View style={[styles.diaIcon, { backgroundColor: CORES.dourado }]}>
            <Text style={[styles.diaTexto, { color: CORES.marrom }]}>SAB</Text>
          </View>
          <View style={styles.infoHorario}>
            <Text style={styles.cultoTitulo}>Consagração</Text>
            <Text style={styles.cultoHora}>07:30h às 08:30h</Text>
          </View>
        </View>

        {/* DOMINGO */}
        <View style={styles.cardHorario}>
          <View style={[styles.diaIcon, { backgroundColor: CORES.vinho }]}>
            <Text style={styles.diaTexto}>DOM</Text>
          </View>
          <View style={styles.infoHorario}>
            <Text style={styles.cultoTitulo}>Culto da Família</Text>
            <Text style={styles.cultoHora}>18:30h às 20:30h</Text>
          </View>
        </View>
      </View>

      {/* Painel Administrativo */}
      <Text style={styles.sectionTitle}>Painel Administrativo - IPAA</Text>

      <View style={styles.adminGrid}>
        <TouchableOpacity style={styles.adminCard}>
          <Ionicons name="people" size={30} color={CORES.vinho} />
          <Text style={styles.adminCardText}>Membros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminCard}>
          <MaterialCommunityIcons
            name="bullhorn"
            size={30}
            color={CORES.vinho}
          />
          <Text style={styles.adminCardText}>Mural de Avisos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CORES.fundo },
  header: {
    backgroundColor: "#1a237e",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  topBar: { padding: 15, alignItems: "flex-start" },
  topBarText: { color: "white", fontSize: 18, fontWeight: "500" },
  banner: {
    backgroundColor: CORES.vinho,
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  igrejaNome: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  igrejaNomeDestaque: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  badgeIPAA: {
    backgroundColor: CORES.dourado,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: { color: CORES.marrom, fontWeight: "bold", fontSize: 16 },

  versiculoCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
    marginTop: -20,
  },
  versiculoTexto: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
    color: "#444",
  },
  versiculoReferencia: { color: CORES.vinho, fontWeight: "bold", fontSize: 15 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: CORES.marrom,
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 15,
  },

  horariosWrapper: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },
  cardHorario: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  diaIcon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  diaTexto: { color: "white", fontWeight: "bold", fontSize: 14 },
  infoHorario: { marginLeft: 15 },
  cultoTitulo: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cultoHora: { fontSize: 14, color: "#666" },

  adminGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  adminCard: {
    backgroundColor: "white",
    width: "47%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },
  adminCardText: { marginTop: 10, fontWeight: "bold", color: CORES.vinho },
});
