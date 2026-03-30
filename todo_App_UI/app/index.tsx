import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface Task {
  id?: number;
  title: string;
  description: string;
  comppleted: boolean;
}
const URL = "http://localhost:3000/todos";
export default function Index() {
  const [tasks, setTask] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (data.success) {
        setTask(data.data);
      }
    } catch (err) {
      alert("Error al obtener tareas");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="¿Que tarea quieres realiar?"
        value={newTask}
        onChangeText={setNewTask}
      ></TextInput>
      <Pressable onPress={() => console.log("Se intentó agregar: ", newTask)}>
        <Text>Agregar</Text>
      </Pressable>
      <View>
        <Text>Tareas existentes: {tasks.length}</Text>
      </View>
    </View>
  );
}
