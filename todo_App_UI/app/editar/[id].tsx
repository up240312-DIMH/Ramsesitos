import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditarTareaScreen() {
  const { id } = useLocalSearchParams();
  const { tittle } = useLocalSearchParams();

  const URL = `http://localhost:3000/todos/${id}`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed] = useState(false);
  const [exito, setExito] = useState(false);

  const handleActualizar = async () => {
    const tareaModificada = { title, description, completed };

    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaModificada),
      });

      if (response.ok) {
        console.log("Se actualizó la tarea #", tittle);

        setExito(true);
        setTimeout(() => {
          router.replace("/");
        }, 1100);
      } else {
        alert("El servidor no pudo actualizar la tarea");
      }
    } catch (error) {
      console.log("Error de red al actualizar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Editar Tarea: {tittle}</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable style={styles.updateButton} onPress={handleActualizar}>
        <Text style={styles.updateButtonText}>Guardar Cambios</Text>
      </Pressable>
      {exito && (
        <Text style={styles.successMessage}>
          ✅ ¡Tarea Actualizada {tittle} con Éxito!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#121212",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  textArea: { minHeight: 100, textAlignVertical: "top" },
  updateButton: {
    backgroundColor: "#0277bd",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  updateButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  successMessage: {
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});
