import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function CardProvas({ provas, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.info}>
        <Text style={styles.nome}>{provas.nome}</Text>
        <Text style={styles.descricao}>Categoria: {provas.categoria}</Text>
        <Text style={styles.descricao}>Praticada Por: {provas.praticado}</Text>
        <Text style={styles.info}>World Records:</Text>
        {provas.wrMasculino && (
          <Text numberOfLines={1} style={styles.descricao}>
            {provas.wrMasculino}
          </Text>
        )}
        {provas.wrFeminino && (
          <Text numberOfLines={2} style={styles.descricao}>Feminino: {provas.wrFeminino}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
    color: "#090",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descricao: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
});
