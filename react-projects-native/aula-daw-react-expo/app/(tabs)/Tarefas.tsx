import React, { useState } from 'react';
import { Button, Text, CheckBox } from 'react-native-elements';
import { View, TextInput, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';

interface Item {
  id: number;
  text: string;
  checked: boolean;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const handleAddOrEditItem = () => {
    if (inputText.trim()) {
      if (editingItemId !== null) {
        setItems(items.map(item =>
          item.id === editingItemId ? { ...item, text: inputText } : item
        ));
        setEditingItemId(null);
      } else {
        const newItem: Item = {
          id: Date.now(),
          text: inputText,
          checked: false
        };
        setItems([...items, newItem]);
      }
      setInputText('');
    } else {
      alert('Por favor, digite uma atividade.');
    }
  };

  const handleToggleCheck = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (id: number, currentText: string) => {
    setEditingItemId(id);
    setInputText(currentText);
  };

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <View style={styles.listItem}>
      <CheckBox
        checked={item.checked}
        onPress={() => handleToggleCheck(item.id)}
        containerStyle={styles.checkBoxContainer}
      />
      <Text style={[styles.itemText, item.checked && styles.checkedItem]}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleEditItem(item.id, item.text)} style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Apagar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.header}>ToDo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite uma atividade"
          placeholderTextColor="#aaa"
        />
        <Button
          title={editingItemId ? "Salvar Edição" : "Adicionar"}
          onPress={handleAddOrEditItem}
          buttonStyle={styles.addButton}
        />
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    marginBottom: 20,
    color: '#333',
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%', // Reduzido para 90% da largura
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    width: '70%', // Reduzido para 70% da largura
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  list: {
    width: '90%', // Reduzido para 90% da largura
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  checkedItem: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  editButton: {
    padding: 5,
    backgroundColor: '#ffc107',
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
