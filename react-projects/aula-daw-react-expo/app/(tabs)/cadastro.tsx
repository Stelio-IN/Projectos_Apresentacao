import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HelloComponent from '@/components/helloComponent'; // Certifique-se de que o caminho esteja correto
import ClienteCadastro from '@/components/cadastroComponet';
import ClienteBusca from '@/components/clienteBuscaComponet';
export default function Cadastro() {
    return (
        <View>
            {/* <ClienteCadastro />  */}
        <ClienteBusca/>
        </View>
    );
}