import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../supabaseClient';

export default function TaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para buscar as tarefas
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*');

    if (error) {
      Alert.alert('Erro', 'Erro ao buscar tarefas');
      console.error('Erro ao buscar tarefas:', error);
    } else {
      setTasks(data);
    }
  };

  // Função para adicionar uma nova tarefa
  const addTask = async () => {
    if (description === '' || status === '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ description, status }]);

    if (error) {
      Alert.alert('Erro', 'Erro ao adicionar tarefa');
      console.error('Erro ao adicionar tarefa:', error);
    } else {
      setDescription('');
      setStatus('');
      fetchTasks(); // Atualiza a lista após adicionar
    }
  };

  // Função para editar uma tarefa existente
  const editTask = async () => {
    if (description === '' || status === '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .update({ description, status })
      .eq('id', editingTaskId);

    if (error) {
      Alert.alert('Erro', 'Erro ao editar tarefa');
      console.error('Erro ao editar tarefa:', error);
    } else {
      setDescription('');
      setStatus('');
      setEditingTaskId(null); // Volta para o modo de adicionar
      fetchTasks(); // Atualiza a lista
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (taskId) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      Alert.alert('Erro', 'Erro ao remover tarefa');
      console.error('Erro ao remover tarefa:', error);
    } else {
      fetchTasks(); // Atualiza a lista após remover
    }
  };

  // Função para preencher os campos de edição
  const startEditing = (task) => {
    setDescription(task.description);
    setStatus(task.status);
    setEditingTaskId(task.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingTaskId ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button
        title={editingTaskId ? 'Salvar Edição' : 'Adicionar Tarefa'}
        onPress={editingTaskId ? editTask : addTask}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => startEditing(item)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  status: {
    fontSize: 12,
    color: '#888',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});