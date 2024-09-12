import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HelloComponent from '@/components/helloComponent'; // Certifique-se de que o caminho esteja correto

export default function Hello() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World</Text>       
            <HelloComponent nome="Stelio Acacio Mondlane" />
        </View>
    );
}

// Definindo estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
