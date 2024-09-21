import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput } from 'react-native';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [novoCliente, setNovoCliente] = useState({ nome: '', email: '', password: '' });
    const [loading, setLoading] = useState(true);

    // Método para listar clientes
    const listarClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/clientes/dados');
            const data = await response.json();
            setClientes(data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
        }
    };

    // Método para cadastrar um novo cliente
    const cadastrarCliente = async () => {
        try {
            await fetch('http://localhost:3000/clientes/dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });
            setNovoCliente({ nome: '', email: '', password: '' }); // Limpa os campos após o cadastro
            listarClientes(); // Atualiza a lista de clientes
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };

    // Método para editar um cliente
    const editarCliente = async (cliente) => {
        const novoEmail = prompt('Digite o novo email:', cliente.email);
        const novaSenha = prompt('Digite a nova senha:', cliente.password);
        if (novoEmail !== null && novaSenha !== null) {
            try {
                await fetch(`http://localhost:3000/clientes/${cliente.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome: cliente.nome,
                        email: novoEmail,
                        password: novaSenha,
                    }),
                });
                listarClientes(); // Atualiza a lista de clientes após edição
            } catch (error) {
                console.error('Erro ao atualizar cliente:', error);
            }
        }
    };

    // Método para eliminar um cliente
    const eliminarCliente = async (cliente) => {
        try {
            await fetch(`http://localhost:3000/clientes/${cliente.id}`, {
                method: 'DELETE',
            });
            listarClientes(); // Atualiza a lista de clientes após remoção
        } catch (error) {
            console.error('Erro ao eliminar cliente:', error);
        }
    };

    useEffect(() => {
        listarClientes();
    }, []);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Clientes</Text>

            {/* Formulário para cadastrar novo cliente */}
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={novoCliente.nome}
                onChangeText={(text) => setNovoCliente({ ...novoCliente, nome: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={novoCliente.email}
                onChangeText={(text) => setNovoCliente({ ...novoCliente, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={novoCliente.password}
                onChangeText={(text) => setNovoCliente({ ...novoCliente, password: text })}
            />
            <Button title="Cadastrar Cliente" onPress={cadastrarCliente} />

            {/* Lista de clientes */}
            <br /><br />
            <Text style={styles.title}>Lista de Clientes</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>ID</Text>
                    <Text style={styles.tableHeaderText}>Nome</Text>
                    <Text style={styles.tableHeaderText}>Email</Text>
                    <Text style={styles.tableHeaderText}>Ações</Text>
                </View>
                {clientes.map((cliente) => (
                    <View key={cliente.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{cliente.id}</Text>
                        <Text style={styles.tableCell}>{cliente.nome}</Text>
                        <Text style={styles.tableCell}>{cliente.email}</Text>
                        <View style={styles.actionButtons}>
                            <Button title="Editar" onPress={() => editarCliente(cliente)} />
                            <Button title="Remover" onPress={() => eliminarCliente(cliente)} color="red" />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    table: {
        borderWidth: 1,
        borderColor: '#000',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        padding: 8,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
    tableCell: {
        flex: 1,
        marginRight: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
});
