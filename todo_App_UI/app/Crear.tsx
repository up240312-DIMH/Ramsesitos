import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * ============================================================================
 * DICCIONARIO RÁPIDO DE ESTE ARCHIVO:
 * ============================================================================
 * - TextInput: Es la caja donde el usuario escribe. El 'value' se conecta a
 * nuestro useState, y el 'onChangeText' actualiza ese estado cada vez que teclea.
 * - JSON.stringify(): Convierte un objeto de JavaScript a un texto "plano"
 * (formato JSON) para que pueda viajar seguro por internet a la base de datos.
 * - router.back(): Función de Expo Router que hace la acción de la "flechita
 * hacia atrás" del celular. Te regresa a la pantalla principal.
 * ============================================================================
 */

// TODO 1 (Manu): Pon aquí tu IP local
const URL = "http://TU_IP:3000/tasks";

export default function CrearTareaScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCrear = async () => {
    /* TODO 2 (Manu): ENVIAR DATOS A LA BD (POST)
       1. Crea un objeto: const nuevaTarea = { title: title, description: description };
       2. Haz el fetch: 
          const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaTarea)
          });
       3. Si sale bien, regresa a la pantalla principal con: router.back(); 
    */
    console.log("Se intentó crear la tarea: ", title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>✨ Nueva tarea</Text>

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
  saveButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
