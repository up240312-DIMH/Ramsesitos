import { router } from "expo-router"; // ⚡ AGREGAMOS ROUTER AQUÍ
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}
interface Props {
  task: Task;
  onDelete: () => void;
  getTasks: () => void;
}
export default function TaskCard({ task, onDelete, getTasks }: Props) {
  //Funcion eliminar tarea
  const deleteTask = async () => {
    const URL = "http://localhost:3000/todos";
    console.log("Se intentó borrar la tarea con ID:", task.id);
    try {
      const response = await fetch(`${URL}/${task.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Tarea eliminada correctamente");
        onDelete();
      } else {
        console.log("No se pudo eliminar la tarea");
      }
    } catch (error) {
      console.log("Error al eliminar:", error);
    }
  };

  const toggleCompleted = async () => {
    const URL_ACTUALIZAR = `http://172.16.100.58:3000/todos/${task.id}`;
    const tareaModificada = {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    };

    try {
      const response = await fetch(URL_ACTUALIZAR, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaModificada),
      });

      if (response.ok) {
        console.log("Estado de la tarea actualizado");
        onDelete();
      } else {
        console.log("El servidor no pudo actualizar el estado");
      }
    } catch (error) {
      console.log("Error de red al actualizar estado:", error);
    }
  };

  const irAEditar = () => {
    router.push({
      pathname: "/editar/[id]",
      params: { id: task.id, tittle: task.title },
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          style={{
            ...styles.btn,
            ...(task.completed ? styles.btnCompleted : styles.btnPending),
          }}
          onPress={toggleCompleted}
        >
          <Text style={styles.btnText}>
            {task.completed ? "Lista" : " Pendiente"}
          </Text>
        </Pressable>
        <Pressable
          style={{ ...styles.btn, ...styles.btnEdit }}
          onPress={irAEditar}
        >
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.btn, ...styles.btnDelete }}
          onPress={deleteTask}
        >
          <Text style={styles.btnText}> Borrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  textContainer: { marginBottom: 15 },
  title: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  description: { color: "#aaa", marginTop: 5 },
  actionsContainer: { flexDirection: "row", justifyContent: "space-between" },
  btn: {
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 3,
    alignItems: "center",
  },
  btnPending: { backgroundColor: "#444" },
  btnCompleted: { backgroundColor: "#2e7d32" },
  btnEdit: { backgroundColor: "#0277bd" },
  btnDelete: { backgroundColor: "#c62828" },
  btnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
