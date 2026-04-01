import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Membros() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cargo, setCargo] = useState("");
  const [aniversario, setAniversario] = useState("");
  const [foto, setFoto] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // --- MÁSCARAS DE DIGITAÇÃO ---

  const mascararData = (valor: string) => {
    return valor
      .replace(/\D/g, "") // Remove tudo que não é número
      .replace(/(\d{2})(\d)/, "$1/$2") // Coloca a primeira barra
      .replace(/(\d{2})(\d)/, "$1/$2") // Coloca a segunda barra
      .replace(/(\/\d{4})\d+?$/, "$1"); // Limita a 8 números
  };

  const mascararCPF = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const mascararTelefone = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  // --- FUNÇÕES DE BUSCA E SALVAMENTO ---

  const buscarCep = async (valor: string) => {
    setCep(valor);
    if (valor.length === 8) {
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
        const dados = await resposta.json();
        if (!dados.erro) {
          setEndereco(
            `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`,
          );
        } else {
          Alert.alert("Aviso", "CEP não encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Erro ao buscar CEP.");
      }
    }
  };

  const escolherFoto = () => {
    Alert.alert("Selecionar Foto", "Como deseja adicionar a foto?", [
      {
        text: "Câmera",
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted")
            return Alert.alert("Erro", "Sem permissão!");
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          });
          if (!result.canceled) setFoto(result.assets[0].uri);
        },
      },
      {
        text: "Galeria",
        onPress: async () => {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted")
            return Alert.alert("Erro", "Sem permissão!");
          let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          });
          if (!result.canceled) setFoto(result.assets[0].uri);
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const salvarMembro = async () => {
    if (!nome || !cargo) {
      Alert.alert("Aviso", "Preencha o nome e o cargo.");
      return;
    }
    setCarregando(true);
    const URL_SCRIPT =
      "https://script.google.com/macros/s/AKfycbwdCpeToxKuwVpgnw3Zme2cLUZ6DxyK4VcJPUj9hAXF9fm0lW-1coPthSmKOXXMfrJh/exec";
    const dadosParaEnviar = {
      nome,
      cargo,
      telefone,
      aniversario,
      situacao: "Ativo",
      foto: foto ? "Foto Anexada" : "Sem foto",
      endereco: `${endereco}, Nº ${numero}`,
    };
    try {
      await fetch(URL_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar),
      });
      Alert.alert("Sucesso", "Cadastrado na Arca!");
      setNome("");
      setCpf("");
      setTelefone("");
      setCep("");
      setEndereco("");
      setNumero("");
      setCargo("");
      setAniversario("");
      setFoto(null);
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          keyboardShouldPersistTaps="always"
        >
          <LinearGradient colors={["#1a2a6c", "#b21f1f"]} style={styles.header}>
            <Text style={styles.title}>Cadastro IPAA</Text>
          </LinearGradient>

          <View style={styles.form}>
            <View style={styles.fotoContainer}>
              <TouchableOpacity onPress={escolherFoto} style={styles.fotoBotao}>
                {foto ? (
                  <Image source={{ uri: foto }} style={styles.fotoMembro} />
                ) : (
                  <Ionicons name="camera" size={40} color="#666" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome do Membro"
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "48%" }}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={styles.input}
                  value={cpf}
                  onChangeText={(t) => setCpf(mascararCPF(t))}
                  keyboardType="numeric"
                  maxLength={14}
                  placeholder="000.000.000-00"
                />
              </View>
              <View style={{ width: "48%" }}>
                <Text style={styles.label}>Aniversário</Text>
                <TextInput
                  style={styles.input}
                  value={aniversario}
                  onChangeText={(t) => setAniversario(mascararData(t))}
                  placeholder="DD/MM/AAAA"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            <Text style={styles.label}>CEP (Busca Automática)</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: "#f0f4ff", paddingHorizontal: 8 },
              ]}
              value={cep}
              onChangeText={buscarCep}
              keyboardType="numeric"
              maxLength={8}
              placeholder="Apenas números"
            />

            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
              multiline
              placeholder="Rua, Bairro, Cidade"
            />

            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              value={numero}
              onChangeText={setNumero}
              placeholder="Ex: 123"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={(t) => setTelefone(mascararTelefone(t))}
              keyboardType="phone-pad"
              maxLength={15}
              placeholder="(00) 00000-0000"
            />

            <Text style={styles.label}>Cargo</Text>
            <TextInput
              style={styles.input}
              value={cargo}
              onChangeText={setCargo}
              placeholder="Ex: Diácono"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={salvarMembro}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>SALVAR NA ARCA</Text>
              )}
            </TouchableOpacity>

            <View style={{ height: 50 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 40, alignItems: "center" },
  title: { color: "white", fontSize: 22, fontWeight: "bold" },
  form: { padding: 20 },
  fotoContainer: { alignItems: "center", marginBottom: 15 },
  fotoBotao: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  fotoMembro: { width: 100, height: 100 },
  label: { fontSize: 14, fontWeight: "bold", color: "#1a2a6c", marginTop: 15 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a2a6c",
    paddingVertical: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1a2a6c",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
