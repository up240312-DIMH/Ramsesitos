import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * ============================================================================
 *  DICCIONARIO RÁPIDO DE ESTE ARCHIVO:
 * ============================================================================
 * - interface: Es como crear un molde. Le dice a TypeScript exactamente qué
 * forma tendrá un objeto (qué variables trae de la base de datos).
 * - Props: Son los "parámetros" que recibe este componente desde afuera. Aquí
 * le decimos que va a recibir un objeto de tipo 'Task'.
 * - View: Es como un <div> en HTML. Una caja para agrupar otros elementos.
 * - Text: El único componente donde podemos mostrar letras o texto en pantalla.
 * - Pressable: Es un botón moderno. Detecta cuando el usuario lo toca (onPress).
 * - Link (expo-router): Funciona como la etiqueta <a> en HTML. Sirve para
 * navegar a otra pantalla pasándole datos (ej. el ID en la URL).
 * ============================================================================
 */

/* TODO 1 (Ivanna/Melanny): DEFINIR EL MOLDE
   Ajusten estos datos exactamente a como se llaman las columnas en su tabla MySQL. 
   Por ejemplo, si en la BD se llama 'descripcion', cámbienlo aquí. */
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  task: Task;
}
//melani-funcion
export default function TaskCard({ task }: Props) {
  //Funcion eliminar tarea
  const deleteTask = async () => {
    //url de la api
  const URL = "http://192.168.1.14:3000/tasks";

  //Se intento borrar
  console.log("Se intentó borrar la tarea con ID:", task.id);
  try {
    //Petición DELETE al servidor usando el ID de la tarea
    const response = await fetch(`${URL}/${task.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Tarea eliminada correctamente");
    } else {
      console.log("No se pudo eliminar la tarea");
    }

  } catch (error) {
    console.log("Error al eliminar:", error);
  }
};

  const toggleCompleted = async () => {
    /* TODO 3 (Opcional): MARCAR COMO COMPLETADA
       1. Aquí harías un fetch con método PUT (similar al de editar).
       2. Mandarías lo contrario al estado actual: { completed: !task.completed }. */
    console.log("Se intentó cambiar el estado de completada");
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        {/* Aquí imprimimos las variables de la tarea usando llaves {} */}
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          style={[
            styles.btn,
            task.completed ? styles.btnCompleted : styles.btnPending,
          ]}
          onPress={toggleCompleted}
        >
          <Text style={styles.btnText}>
            {task.completed ? "Lista" : " Pendiente"}
          </Text>
        </Pressable>

        {/* El Link arma la URL dinámica. Si el ID es 5, te lleva a /editar/5 */}
        <Link
          href={{ pathname: "/editar/[id]", params: { id: task.id } }}
          asChild
        >
          <Pressable style={[styles.btn, styles.btnEdit]}>
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>
        </Link>

        {/* Al presionar este botón, ejecuta la función deleteTask de arriba */}
        <Pressable style={[styles.btn, styles.btnDelete]} onPress={deleteTask}>
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
