import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Alert,
    Image,
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
  const [endereco, setEndereco] = useState("");
  const [cargo, setCargo] = useState("");
  const [foto, setFoto] = useState(null);

  const escolherFoto = () => {
    Alert.alert("Selecionar Foto", "Como deseja adicionar a foto do membro?", [
      {
        text: "Tirar Foto (Câmera)",
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permissão", "Precisamos de acesso à câmera!");
            return;
          }
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            setFoto(result.assets[0].uri);
          }
        },
      },
      {
        text: "Escolher da Galeria",
        onPress: async () => {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permissão", "Precisamos de acesso às suas fotos!");
            return;
          }
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            setFoto(result.assets[0].uri);
          }
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const salvarMembro = () => {
    if (!foto) {
      Alert.alert("Aviso", "Por favor, selecione uma foto para o membro.");
      return;
    }
    Alert.alert("Sucesso", `Membro ${nome} cadastrado com sucesso!`);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#1a2a6c", "#b21f1f"]} style={styles.header}>
        <Text style={styles.title}>Cadastro de Membros</Text>
      </LinearGradient>

      <View style={styles.form}>
        <View style={styles.fotoContainer}>
          <TouchableOpacity onPress={escolherFoto} style={styles.fotoBotao}>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.fotoMembro} />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Ionicons name="camera" size={40} color="#666" />
                <Text style={styles.fotoTexto}>Adicionar Foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: João Silva"
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          placeholder="000.000.000-00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="(61) 98888-8888"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Rua, Número, Bairro"
        />

        <Text style={styles.label}>Cargo na Igreja</Text>
        <TextInput
          style={styles.input}
          value={cargo}
          onChangeText={setCargo}
          placeholder="Ex: Membro, Diácono, Obreiro"
        />

        <TouchableOpacity style={styles.button} onPress={salvarMembro}>
          <Text style={styles.buttonText}>SALVAR CADASTRO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 40, alignItems: "center" },
  title: { color: "white", fontSize: 22, fontWeight: "bold" },
  form: { padding: 20 },
  fotoContainer: { alignItems: "center", marginBottom: 20 },
  fotoBotao: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
  fotoMembro: { width: 120, height: 120 },
  fotoPlaceholder: { alignItems: "center" },
  fotoTexto: { fontSize: 12, color: "#666", marginTop: 5 },
  label: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 15 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 8,
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
