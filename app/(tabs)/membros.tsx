import { FontAwesome5, Ionicons } from "@expo/vector-icons";
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

// Definição de Cores da IPAA
const CORES = {
  vinho: "#a52a2a",
  dourado: "#ffd700",
  marrom: "#3e2723",
  fundo: "#fdfcf0",
  branco: "#ffffff",
};

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

  // Máscaras
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
    <View style={{ flex: 1, backgroundColor: CORES.fundo }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={[CORES.vinho, CORES.marrom]}
            style={styles.header}
          >
            <FontAwesome5
              name="id-card"
              size={40}
              color={CORES.dourado}
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.title}>Arca IPAA</Text>
            <Text style={{ color: "white", opacity: 0.9, fontWeight: "500" }}>
              Ficha Oficial de Membro
            </Text>
          </LinearGradient>

          <View style={styles.form}>
            <Text style={styles.sessaoLabel}>Novo Cadastro</Text>
            <TouchableOpacity
              onPress={escolherFoto}
              style={styles.fotoContainer}
            >
              <View style={[styles.fotoBotao, { borderColor: CORES.dourado }]}>
                {foto ? (
                  <Image source={{ uri: foto }} style={styles.fotoMembro} />
                ) : (
                  <Ionicons name="camera" size={40} color={CORES.vinho} />
                )}
              </View>
            </TouchableOpacity>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: João Silva"
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
                <Text style={styles.label}>CEP (Automático)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#fff9e6" }]}
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
                <Text style={styles.label}>Cargo na Igreja</Text>
                <TextInput
                  style={styles.input}
                  value={cargo}
                  onChangeText={setCargo}
                  placeholder="Ex: Diácono"
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
                <Text style={styles.buttonText}>SALVAR NA ARCA</Text>
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
                <Ionicons name="lock-closed" size={30} color={CORES.vinho} />
                <Text style={styles.lockText}>Área de Gestão (Senha IPAA)</Text>
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
                    <Text style={{ color: CORES.vinho, fontWeight: "bold" }}>
                      Bloquear
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buscaContainer}>
                  <Ionicons
                    name="search"
                    size={20}
                    color={CORES.vinho}
                    style={{ marginLeft: 15 }}
                  />
                  <TextInput
                    style={styles.inputBusca}
                    placeholder="Pesquisar por nome ou cargo..."
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
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={CORES.dourado}
                      />
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
              <Ionicons name="close-circle" size={35} color={CORES.vinho} />
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
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {membroSelecionado?.cargo}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={CORES.vinho}
                />
                <Text style={styles.infoText}>
                  <Text style={{ fontWeight: "bold" }}>Aniversário: </Text>
                  {membroSelecionado?.aniversario}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={20} color={CORES.vinho} />
                <Text style={styles.infoText}>
                  <Text style={{ fontWeight: "bold" }}>Telefone: </Text>
                  {membroSelecionado?.telefone}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={CORES.vinho}
                />
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
  header: {
    padding: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  form: {
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 20,
    marginTop: -30,
    elevation: 8,
  },
  sessaoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: CORES.vinho,
    marginBottom: 15,
    textAlign: "center",
  },
  fotoContainer: { alignItems: "center", marginBottom: 15 },
  fotoBotao: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff9e6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    overflow: "hidden",
  },
  fotoMembro: { width: 90, height: 90 },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: CORES.marrom,
    marginTop: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
    fontSize: 15,
    color: "#333",
  },
  button: {
    backgroundColor: CORES.vinho,
    padding: 18,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: CORES.dourado,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  lockContainer: { alignItems: "center", padding: 20 },
  lockText: {
    fontSize: 15,
    color: CORES.marrom,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputSenha: {
    backgroundColor: "#fff",
    width: "60%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },
  btnUnlock: {
    backgroundColor: CORES.vinho,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: "85%",
    alignItems: "center",
  },
  gestorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  gestorTitle: { fontSize: 20, fontWeight: "bold", color: CORES.marrom },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 15,
  },
  inputBusca: { flex: 1, padding: 12, fontSize: 15 },
  cardMembro: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 6,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: CORES.dourado,
  },
  fotoMini: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  nomeMembro: { fontSize: 17, fontWeight: "bold", color: CORES.marrom },
  cargoMembro: { fontSize: 14, color: "#777" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 25,
    maxHeight: "85%",
    elevation: 20,
  },
  closeBtn: { alignSelf: "flex-end", marginBottom: -10 },
  fotoDetalhe: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: CORES.dourado,
  },
  nomeDetalhe: {
    fontSize: 24,
    fontWeight: "bold",
    color: CORES.vinho,
    textAlign: "center",
  },
  tagCargo: {
    backgroundColor: CORES.vinho,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    alignSelf: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 12,
  },
  infoText: { marginLeft: 12, fontSize: 16, color: "#444" },
  enderecoTexto: { marginLeft: 35, color: "#666", fontSize: 15, marginTop: 4 },
});
