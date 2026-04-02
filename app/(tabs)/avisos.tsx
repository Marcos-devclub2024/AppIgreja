import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Avisos() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [avisos, setAvisos] = useState([
    {
      id: "1",
      titulo: "Culto de Celebração",
      mensagem: "Esperamos todos domingo às 19h.",
      data: "15/05",
      urgente: false,
    },
    {
      id: "2",
      titulo: "Reunião de Obreiros",
      mensagem: "Urgente: Mudança para as 18h no sábado.",
      data: "14/05",
      urgente: true,
    },
  ]);

  const [autenticado, setAutenticado] = useState(false);
  const SENHA_MESTRA = "1234";

  const postarAviso = () => {
    if (!titulo || !mensagem) {
      Alert.alert("Erro", "Preencha o título e a mensagem.");
      return;
    }
    const novoAviso = {
      id: Math.random().toString(),
      titulo,
      mensagem,
      urgente,
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
    };
    setAvisos([novoAviso, ...avisos]);
    setTitulo("");
    setMensagem("");
    setUrgente(false);
    Alert.alert("Sucesso", "Comunicado enviado para a Arca!");
  };

  const renderAviso = ({ item }: any) => (
    <View style={[styles.cardAviso, item.urgente && styles.cardUrgente]}>
      <View style={styles.cardHeader}>
        <Ionicons
          name={item.urgente ? "alert-circle" : "notifications-outline"}
          size={24}
          color={item.urgente ? "#b21f1f" : "#1a2a6c"}
        />
        <Text
          style={[styles.tituloAviso, item.urgente && { color: "#b21f1f" }]}
        >
          {item.titulo}
        </Text>
        <Text style={styles.dataAviso}>{item.data}</Text>
      </View>
      <Text style={styles.textoAviso}>{item.mensagem}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f7f6" }}>
      <LinearGradient colors={["#1a2a6c", "#b21f1f"]} style={styles.header}>
        <Text style={styles.headerTitle}>Mural da Arca</Text>
        <Text style={styles.headerSub}>Comunicados e Avisos</Text>
      </LinearGradient>

      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id}
        renderItem={renderAviso}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListHeaderComponent={
          !autenticado ? (
            <TouchableOpacity
              style={styles.btnGestor}
              onPress={() => {
                Alert.prompt(
                  "Área do Gestor",
                  "Senha:",
                  [
                    { text: "Sair" },
                    {
                      text: "Entrar",
                      onPress: (p: any) =>
                        p === SENHA_MESTRA
                          ? setAutenticado(true)
                          : Alert.alert("Erro", "Senha errada"),
                    },
                  ],
                  "secure-text",
                );
              }}
            >
              <Ionicons name="lock-closed" size={18} color="#1a2a6c" />
              <Text style={styles.btnGestorText}>Postar como Gestor</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.postarBox}>
              <TextInput
                style={styles.input}
                placeholder="Título"
                value={titulo}
                onChangeText={setTitulo}
              />
              <TextInput
                style={[styles.input, { minHeight: 60 }]}
                placeholder="Mensagem..."
                multiline
                value={mensagem}
                onChangeText={setMensagem}
              />
              <TouchableOpacity
                style={[
                  styles.checkUrgente,
                  urgente && { backgroundColor: "#ffebee" },
                ]}
                onPress={() => setUrgente(!urgente)}
              >
                <Text style={{ color: "#b21f1f", fontWeight: "bold" }}>
                  {urgente ? "✅ Urgente" : "⚠️ Marcar Urgente"}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={styles.btnPostar}
                  onPress={postarAviso}
                >
                  <Text style={styles.btnText}>PUBLICAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnSair}
                  onPress={() => setAutenticado(false)}
                >
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 40, alignItems: "center" },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  headerSub: { color: "white", opacity: 0.8 },
  btnGestor: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 10,
    marginBottom: 10,
  },
  btnGestorText: { color: "#1a2a6c", fontWeight: "bold", marginLeft: 8 },
  postarBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 15,
    padding: 8,
  },
  checkUrgente: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  btnPostar: {
    flex: 1,
    backgroundColor: "#1a2a6c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnSair: { backgroundColor: "#eee", padding: 12, borderRadius: 8 },
  btnText: { color: "white", fontWeight: "bold" },
  cardAviso: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#1a2a6c",
  },
  cardUrgente: { borderLeftColor: "#b21f1f", backgroundColor: "#fff5f5" },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  tituloAviso: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#1a2a6c",
  },
  dataAviso: { fontSize: 11, color: "#999" },
  textoAviso: { fontSize: 14, color: "#444" },
});
