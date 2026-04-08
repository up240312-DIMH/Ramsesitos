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

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

const URL = "http://localhost:3000/todos";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getTasks();
  }, []);
  const getTasks = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      let listaTareas: Task[] = [];

      if (Array.isArray(data)) {
        listaTareas = data;
      } else if (data && Array.isArray(data.data)) {
        listaTareas = data.data;
      }
      const tareasOrdenadas = listaTareas.sort((a, b) => b.id - a.id);

      setTasks(tareasOrdenadas);
    } catch (error) {
      console.log("Error al obtener tareas:", error);
    }
  };

  const tareasFiltradas = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mis Tareas 📝</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar tarea..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      <Link href={"/Crear" as any} asChild>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Agregar nueva tarea</Text>
        </Pressable>
      </Link>

      <Text style={styles.counterTitle}>
        Tareas encontradas: {tareasFiltradas.length}
      </Text>

      <ScrollView style={styles.list}>
        {tareasFiltradas.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={getTasks}
            getTasks={getTasks}
          />
        ))}

        {tareasFiltradas.length === 0 && searchText !== "" && (
          <Text style={{ color: "#aaa", textAlign: "center", marginTop: 20 }}>
            No se encontraron tareas con "{searchText}"
          </Text>
        )}
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
