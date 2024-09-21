import React from 'react';
import { View, Text } from 'react-native';

type HelloProps = {
    nome: string;
    // o ponto de interrogação indica que podemos receber esse parâmetro ou não
    idade?: number;
};

export default function HelloComponent({ nome }: HelloProps) {
    return (
        <View>
            <Text>Olásad {nome}</Text>
        </View>
    );
}
