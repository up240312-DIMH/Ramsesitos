import { router } from "expo-router"; // ⚡ AGREGAMOS ROUTER AQUÍ
import React, { useState } from "react";
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
export default function TaskCard({ task, onDelete }: Props) {
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  //Funcion eliminar tarea
  const deleteTask = async () => {
    const URL = "http://localhost:3000/todos";
    console.log("Se intentó borrar la tarea con ID:", task.id);
    try {
      const response = await fetch(`${URL}/${task.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMensajeExito("¡Tarea eliminada!");
        setTimeout(() => {
          onDelete();
        }, 1200);
      } else {
        setMensajeExito("¡La tarea No se pudo Eliminar!");
        setTimeout(() => {
          onDelete();
        }, 1200);
        console.log("No se pudo eliminar la tarea");
      }
    } catch (error) {
      setMensajeExito("¡Error!");
      setTimeout(() => {
        onDelete();
      }, 1200);
      console.log("Error al eliminar:", error);
    }
  };

  const toggleCompleted = async () => {
    const URL_ACTUALIZAR = `http://localhost:3000/todos/${task.id}`;
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
        //setMensajeExito("Tarea Marcada como completada");
        // onDelete();
        if (!task.completed) {
          setMensajeExito("Tarea Marcada como completada"); // (O el texto que le hayas puesto)
        } else {
          setMensajeExito("Tarea Marcada como Pendiente");
        }
        setTimeout(() => {
          setMensajeExito(null);
          onDelete();
        }, 1200);
      } else {
        setMensajeExito("No se pudo Marcar como completada");
        console.log("El servidor no pudo actualizar el estado");
      }
    } catch (error) {
      console.log("Error de red al actualizar estado:", error);
    }
  };

  const irAEditar = () => {
    router.push({
      pathname: "/editar/[id]",
      params: {
        id: task.id,
        tittle: task.title,
        description: task.description,
        completed: task.completed ? "true" : "false",
      },
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
      {mensajeExito && (
        <View style={styles.mensajeContainer}>
          <Text style={styles.mensajeTexto}>{mensajeExito}</Text>
        </View>
      )}
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
  mensajeContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50", // Borde verde sutil
  },
  mensajeTexto: {
    color: "#4CAF50", // Color verde estilo éxito
    fontWeight: "bold",
    fontSize: 14,
  },
});
