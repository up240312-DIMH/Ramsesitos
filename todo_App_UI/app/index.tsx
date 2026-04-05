import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TaskCard from "../components/TaskCard";

/**
 * ============================================================================
 * DICCIONARIO RÁPIDO DE ESTE ARCHIVO:
 * ============================================================================
 * - useState: Es la memoria de la pantalla. Guarda información (como la lista
 * de tareas). Si esa info cambia, la pantalla se redibuja automáticamente.
 * - useEffect: Un bloque de código que se ejecuta automáticamente *una sola
 * vez* en cuanto la pantalla se abre. Perfecto para llamar a la BD al inicio.
 * - ScrollView: Una caja especial que permite hacer scroll hacia arriba o abajo.
 * - map(): Función de JS que agarra una lista de cosas (el arreglo de la BD)
 * y "dibuja" un componente <TaskCard /> por cada elemento que encuentre.
 * ============================================================================
 */

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// TODO 1 (Melanny): Pon aquí la IP de tu computadora y el puerto de la API
const URL = "http://192.168.1.14:3000/tasks";

export default function Index() {
  // useState crea 'tasks' y 'setTasks' para guardar las tareas de la BD
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState("");
  
 useEffect(() => {
  getTasks();
}, []);
//melani-get que obtiene todas las tareas
const getTasks = async () => {
  try {
    //Hace la petición
    const response = await fetch(URL);

    //Convierte a JSON
    const data = await response.json();

    //Guardar en el estado
    setTasks(data);

  } catch (error) {
    console.log("Error al obtener tareas:", error);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mis Tareas 📝</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Buscar tarea..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      <Link href={"/Crear" as any} asChild>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Agregar nueva tarea</Text>
        </Pressable>
      </Link>

      <Text style={styles.counterTitle}>Tareas existentes: {tasks.length}</Text>

      <ScrollView style={styles.list}>
        {/* TODO 3 (Melanny/Ivanna): Cuando getTasks funcione, este .map() 
            dibujará las tarjetas pasándole la tarea actual a TaskCard. */}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ScrollView>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  counterTitle: { fontSize: 14, color: "#888", marginBottom: 10 },
  list: { flex: 1 },
});
