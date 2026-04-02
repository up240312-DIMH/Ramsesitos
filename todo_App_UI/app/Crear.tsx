import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// URL de la API del profesor (localhost para pruebas en web)
const URL = "http://localhost:3000/todos";

export default function CrearTareaScreen() {
  // Estados para capturar el texto y manejar el mensaje de éxito
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exito, setExito] = useState(false);

  // Función asíncrona para enviar los datos a la base de datos
  const handleCrear = async () => {
    // Creamos el objeto con la estructura que pide la API
    const nuevaTarea = {
      title: title,
      description: description,
    };

    try {
      // Iniciamos la petición POST al servidor
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTarea),
      });

      // Si el servidor responde que todo está bien (status 200-299)
      if (response.ok) {
        setExito(true); // Activamos el mensaje visual de éxito
        console.log("Tarea guardada con éxito:", title);

        // Esperamos 1.5 seg para que el usuario vea el mensaje antes de volver
        setTimeout(() => {
          router.back();
        }, 1500);
      } else {
        // Si el servidor rechaza los datos, avisamos al usuario
        alert("El servidor rechazó la tarea");
      }
    } catch (error) {
      // Si falla la conexión a internet o la API está apagada
      console.log(error);
      alert("No se pudo conectar con la base de datos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>✨Crear Nueva tarea</Text>

      {/* Input vinculado al estado 'title' mediante value y onChangeText */}
      <TextInput
        style={styles.input}
        placeholder="¿Qué tarea quieres realizar?"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      {/* Input multilínea vinculado al estado 'description' */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Agrega una descripción..."
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Botón que dispara la función handleCrear al ser presionado */}
      <Pressable style={styles.saveButton} onPress={handleCrear}>
        <Text style={styles.saveButtonText}>Guardar Tarea</Text>
      </Pressable>

      {/* Operador lógico &&: si 'exito' es true, renderiza el mensaje verde */}
      {exito && (
        <Text style={styles.successMessage}>✅ ¡Tarea guardada con éxito!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#121212", // Fondo oscuro para estilo dark mode
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
    color: "#4CAF50", // Color verde para indicar éxito (UX)
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});
