import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const URL = "http://localhost:3000/todos";
export default function CrearTareaScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exito, setExito] = useState(false);

  const handleCrear = async () => {
    const nuevaTarea = {
      title: title,
      description: description,
    };

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTarea),
      });
      if (response.ok) {
        setExito(true);
        console.log("Tarea guardada con éxito:", title);

        setTimeout(() => {
          router.replace("/");
        }, 1100);
      } else {
        alert("El servidor rechazó la tarea");
      }
    } catch (error) {
      console.log(error);
      alert("No se pudo conectar con la base de datos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Crear Nueva tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="¿Qué tarea quieres realizar?"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Agrega una descripción..."
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Pressable style={styles.saveButton} onPress={handleCrear}>
        <Text style={styles.saveButtonText}>Guardar Tarea</Text>
      </Pressable>

      {exito && (
        <Text style={styles.successMessage}> ¡Tarea guardada con éxito!</Text>
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
  saveButton: {
    backgroundColor: "#2e2e2e",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  successMessage: {
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});
