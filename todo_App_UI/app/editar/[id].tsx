import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * ============================================================================
 * DICCIONARIO RÁPIDO DE ESTE ARCHIVO:
 * ============================================================================
 * - useLocalSearchParams: Atrapa el ID que viene en la URL. Si navegaste a
 * /editar/5, esta función saca el '5' para saber qué tarea vas a editar.
 * - Dos procesos en un archivo: Esta pantalla hace DOS cosas clave:
 * 1) useEffect: Descarga los datos viejos (GET ONE) y llena las cajas de texto solas.
 * 2) onPress: Envía los datos modificados (PUT) al guardar.
 * ============================================================================
 */

export default function EditarTareaScreen() {
  // Sacamos el ID de la URL
  const { id } = useLocalSearchParams();

  // TODO 1 (Quique): Pon aquí tu IP local (ojo, la URL ya trae el ID pegado)
  const URL = `http://192.168.1.14:3000/tasks/${id}`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    getUnaTarea();
  }, [id]);

  const getUnaTarea = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      
      setTitle(data.title);
      setDescription(data.description);
    } catch (error) {
      console.log("Error al cargar la tarea:", error);
    }
  };

  const handleActualizar = async () => {
    const tareaModificada = { title, description };
    
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(tareaModificada),
      });

      if (response.ok) {
        console.log("Se actualizó la tarea #", id);
        router.back();
      } else {
        alert("El servidor no pudo actualizar la tarea");
      }
    } catch (error) {
      console.log("Error de red al actualizar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Editar Tarea #{id}</Text>

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
});
