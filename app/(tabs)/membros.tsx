import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MembrosScreen() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cargo, setCargo] = useState("");
  const [aniversario, setAniversario] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const [membros, setMembros] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [senhaInput, setSenhaInput] = useState("");
  const [membroSelecionado, setMembroSelecionado] = useState<any>(null);

  const SENHA_MESTRA = "1234";

  const mascararData = (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\/\d{4})\d+?$/, "$1");
  const mascararCPF = (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  const mascararTelefone = (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");

  const membrosFiltrados = membros.filter(
    (m) =>
      (m.nome?.toLowerCase() || "").includes(busca.toLowerCase()) ||
      (m.cargo?.toLowerCase() || "").includes(busca.toLowerCase()),
  );

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
        }
      } catch (error) {
        Alert.alert("Erro", "CEP não encontrado.");
      }
    }
  };

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return Alert.alert("Erro", "Sem permissão!");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  const salvarMembro = async () => {
    if (!nome || !cargo) {
      Alert.alert("Aviso", "Preencha o nome e o cargo.");
      return;
    }
    setCarregando(true);
    const dadosParaEnviar = {
      nome,
      cargo,
      telefone,
      cpf,
      aniversario,
      endereco,
      numero,
      foto: foto || null,
    };
    const URL_SCRIPT =
      "https://script.google.com/macros/s/AKfycbwdCpeToxKuwVpgnw3Zme2cLUZ6DxyK4VcJPUj9hAXF9fm0lW-1coPthSmKOXXMfrJh/exec";

    try {
      await fetch(URL_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dadosParaEnviar, situacao: "Ativo" }),
      });
      Alert.alert("Sucesso", "Cadastrado na Arca!");
      setMembros([dadosParaEnviar, ...membros]);
      setNome("");
      setCpf("");
      setTelefone("");
      setCep("");
      setEndereco("");
      setNumero("");
      setCargo("");
      setAniversario("");
      setFoto(null);
    } catch (e) {
      Alert.alert("Erro", "Falha ao enviar.");
    } finally {
      setCarregando(false);
    }
  };

  const verificarSenha = () => {
    if (senhaInput === SENHA_MESTRA) {
      setAutenticado(true);
      setSenhaInput("");
    } else {
      Alert.alert("Erro", "Senha incorreta!");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f7f6" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient colors={["#1a2a6c", "#b21f1f"]} style={styles.header}>
            <Text style={styles.title}>Arca IPAA</Text>
            <Text style={{ color: "white", opacity: 0.8 }}>
              Ficha Oficial de Membro
            </Text>
          </LinearGradient>

          <View style={styles.form}>
            <Text style={styles.sessaoLabel}>Novo Cadastro</Text>
            <TouchableOpacity
              onPress={escolherFoto}
              style={styles.fotoContainer}
            >
              <View style={styles.fotoBotao}>
                {foto ? (
                  <Image source={{ uri: foto }} style={styles.fotoMembro} />
                ) : (
                  <Ionicons name="camera" size={40} color="#666" />
                )}
              </View>
            </TouchableOpacity>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "48%" }}>
                <Text style={styles.label}>Aniversário</Text>
                <TextInput
                  style={styles.input}
                  value={aniversario}
                  onChangeText={(t) => setAniversario(mascararData(t))}
                  keyboardType="numeric"
                  maxLength={10}
                  placeholder="DD/MM/AAAA"
                />
              </View>
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
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "55%" }}>
                <Text style={styles.label}>CEP</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#f0f4ff" }]}
                  value={cep}
                  onChangeText={buscarCep}
                  keyboardType="numeric"
                  maxLength={8}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Text style={styles.label}>Número</Text>
                <TextInput
                  style={styles.input}
                  value={numero}
                  onChangeText={setNumero}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>Endereço Completo</Text>
            <TextInput
              style={[
                styles.input,
                { minHeight: 60, textAlignVertical: "top" },
              ]}
              value={endereco}
              onChangeText={setEndereco}
              multiline
              numberOfLines={3}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "48%" }}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  value={telefone}
                  onChangeText={(t) => setTelefone(mascararTelefone(t))}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>
              <View style={{ width: "48%" }}>
                <Text style={styles.label}>Cargo</Text>
                <TextInput
                  style={styles.input}
                  value={cargo}
                  onChangeText={setCargo}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={salvarMembro}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>SALVAR MEMBRO</Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 40,
              borderTopWidth: 1,
              borderTopColor: "#ddd",
              paddingTop: 20,
            }}
          >
            {!autenticado ? (
              <View style={styles.lockContainer}>
                <Ionicons name="lock-closed" size={30} color="#1a2a6c" />
                <Text style={styles.lockText}>Área Restrita (Senha 1234)</Text>
                <TextInput
                  style={styles.inputSenha}
                  placeholder="Senha"
                  secureTextEntry
                  value={senhaInput}
                  onChangeText={setSenhaInput}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.btnUnlock}
                  onPress={verificarSenha}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    VER LISTA DE MEMBROS
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={styles.gestorHeader}>
                  <Text style={styles.gestorTitle}>
                    Membros ({membros.length})
                  </Text>
                  <TouchableOpacity onPress={() => setAutenticado(false)}>
                    <Text style={{ color: "#b21f1f" }}>Bloquear</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buscaContainer}>
                  <Ionicons
                    name="search"
                    size={20}
                    color="#1a2a6c"
                    style={{ marginLeft: 15 }}
                  />
                  <TextInput
                    style={styles.inputBusca}
                    placeholder="Pesquisar..."
                    value={busca}
                    onChangeText={setBusca}
                  />
                </View>

                {membrosFiltrados.map((m, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.cardMembro}
                    onPress={() => setMembroSelecionado(m)}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {m.foto ? (
                        <Image
                          source={{ uri: m.foto }}
                          style={styles.fotoMini}
                        />
                      ) : (
                        <Ionicons
                          name="person-circle"
                          size={40}
                          color="#ccc"
                          style={{ marginRight: 10 }}
                        />
                      )}
                      <View style={{ flex: 1 }}>
                        <Text style={styles.nomeMembro}>{m.nome}</Text>
                        <Text style={styles.cargoMembro}>{m.cargo}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={!!membroSelecionado}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setMembroSelecionado(null)}
            >
              <Ionicons name="close-circle" size={35} color="#b21f1f" />
            </TouchableOpacity>

            <ScrollView>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                {membroSelecionado?.foto ? (
                  <Image
                    source={{ uri: membroSelecionado.foto }}
                    style={styles.fotoDetalhe}
                  />
                ) : (
                  <Ionicons name="person-circle" size={100} color="#ddd" />
                )}
                <Text style={styles.nomeDetalhe}>
                  {membroSelecionado?.nome}
                </Text>
                <View style={styles.tagCargo}>
                  <Text style={{ color: "white" }}>
                    {membroSelecionado?.cargo}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={20} color="#1a2a6c" />
                <Text style={styles.infoText}>
                  <Text style={{ fontWeight: "bold" }}>Aniversário: </Text>
                  {membroSelecionado?.aniversario}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="card-outline" size={20} color="#1a2a6c" />
                <Text style={styles.infoText}>
                  <Text style={{ fontWeight: "bold" }}>CPF: </Text>
                  {membroSelecionado?.cpf}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={20} color="#1a2a6c" />
                <Text style={styles.infoText}>
                  <Text style={{ fontWeight: "bold" }}>Telefone: </Text>
                  {membroSelecionado?.telefone}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={20} color="#1a2a6c" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: "bold" }}>Endereço: </Text>
                  </Text>
                  <Text style={styles.enderecoTexto}>
                    {membroSelecionado?.endereco}, Nº{" "}
                    {membroSelecionado?.numero}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 40, alignItems: "center" },
  title: { color: "white", fontSize: 22, fontWeight: "bold" },
  form: {
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 15,
    marginTop: -20,
    elevation: 5,
  },
  sessaoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a2a6c",
    marginBottom: 15,
    textAlign: "center",
  },
  fotoContainer: { alignItems: "center", marginBottom: 15 },
  fotoBotao: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  fotoMembro: { width: 80, height: 80 },
  label: { fontSize: 12, fontWeight: "bold", color: "#1a2a6c", marginTop: 12 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#1a2a6c",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  lockContainer: { alignItems: "center", padding: 20 },
  lockText: {
    fontSize: 15,
    color: "#1a2a6c",
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputSenha: {
    backgroundColor: "#fff",
    width: "60%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },
  btnUnlock: {
    backgroundColor: "#1a2a6c",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  gestorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  gestorTitle: { fontSize: 18, fontWeight: "bold", color: "#1a2a6c" },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  inputBusca: { flex: 1, padding: 12, fontSize: 15 },
  cardMembro: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 6,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#1a2a6c",
  },
  fotoMini: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  nomeMembro: { fontSize: 16, fontWeight: "bold", color: "#1a2a6c" },
  cargoMembro: { fontSize: 13, color: "#666" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    maxHeight: "80%",
    elevation: 10,
  },
  closeBtn: { alignSelf: "flex-end", marginBottom: -10 },
  fotoDetalhe: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#1a2a6c",
  },
  nomeDetalhe: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a2a6c",
    textAlign: "center",
  },
  tagCargo: {
    backgroundColor: "#b21f1f",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  infoText: { marginLeft: 10, fontSize: 15, color: "#444" },
  enderecoTexto: { marginLeft: 30, color: "#666", fontSize: 14 },
});
