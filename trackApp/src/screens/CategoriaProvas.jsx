import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { provasMock } from "../data/provasMock";
import CardProvas from "../components/CardProvas";
import ModalProvas from "../components/ModalProvas";

export default function CategoriaProvas({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { title: categoria } = route.params;

  const provasDaCategoria = provasMock.filter(
    (provas) => provas.categoria === categoria
  );

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.title}</Text>
      <FlatList
        data={provasDaCategoria}
        keyExtractor={(provas) => provas.id.toString()}
        renderItem={({ item }) => (
          <CardProvas provas={item} onPress={() => handleItemPress(item)} />
        )}
      />
      <ModalProvas
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedItem={selectedItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
