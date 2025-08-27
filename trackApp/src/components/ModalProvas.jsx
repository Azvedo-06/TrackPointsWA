import React, { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

import { calcularPontos } from "../service/CalculoPontos";

export default function ModalProvas({
  modalVisible,
  setModalVisible,
  selectedItem,
}) {
  const [marca, setMarca] = useState("");
  const [pontos, setPontos] = useState(null);
  const [sexoSelecionado, setSexoSelecionado] = useState("M");

  const getSexo = (sexo) => {
    if (!sexo) return "M"; // padrão
    if (sexo.toLowerCase().includes("masculino")) return "M";
    if (sexo.toLowerCase().includes("feminino")) return "F";
    return "M";
  };

  const handleCalcular = () => {
    if (!marca) return; // evita cálculo sem valor
    if (selectedItem) {
      const resultado = calcularPontos(
        selectedItem.nome,
        marca,
        sexoSelecionado
      );
      setPontos(resultado);
    }
  };

  const fecharModal = () => {
    setMarca("");
    setPontos(null);
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={fecharModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.nome}</Text>
                <Text style={styles.modalSubTitle}>Digite a marca:</Text>
                <TextInput
                  style={styles.Input}
                  placeholder="Ex: 10.20"
                  keyboardType="numeric"
                  value={marca}
                  onChangeText={setMarca}
                ></TextInput>

                <TouchableOpacity
                  style={[
                    styles.sexoButton,
                    sexoSelecionado === "M" && styles.sexoButtonAtivo,
                  ]}
                  onPress={() => setSexoSelecionado("M")}
                >
                  <Text style={styles.sexoButtonText}>Masculino</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.sexoButton,
                    sexoSelecionado === "F" && styles.sexoButtonAtivo,
                  ]}
                  onPress={() => setSexoSelecionado("F")}
                >
                  <Text style={styles.sexoButtonText}>Feminino</Text>
                </TouchableOpacity>

                <Pressable style={styles.calcButton} onPress={handleCalcular}>
                  <Text style={styles.calcButtonText}>Calcular Pontos</Text>
                </Pressable>

                {pontos !== null && (
                  <Text style={styles.result}>Pontos obtidos: {pontos}</Text>
                )}
              </>
            )}
            <Pressable style={styles.closeButton} onPress={fecharModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubTitle: {
    fontSize: 15,
    fontWeight: "condensed",
    marginBottom: 5,
  },
  Input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
  },
  calcButton: {
    margin: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
  },
  calcButtonText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  result: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    margin: 10,
    backgroundColor: "#cf3907ff",
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
  sexoButton: {
    margin:10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 15,
    marginHorizontal: 4,
  },
  sexoButtonAtivo: {
    backgroundColor: "#28a745",
  },
  sexoButtonText: {
    fontWeight: "bold",
  },
});
