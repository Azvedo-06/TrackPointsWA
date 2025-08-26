import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  const provasCategoria = ["Velocidade", "Barreiras", "Saltos Horizontais", "Arremesso e Lançamentos"];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione a Categoria de Prova</Text>
      {provasCategoria.map((provas, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("Provas", { title: provas })}
        >
          <Text style={styles.buttonText}>{provas}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e5e5e5",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});
