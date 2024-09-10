import React from 'react';
import { View, Text } from 'react-native';

// export default function HelloComponent({nome}:helloProps) {
//     return (
//         <View>
//             <Text>Olá {nome}</Text>
//         </View>
//     );
// }
export default function HelloComponent() {
    return (
        <View>
            <Text>Olá</Text>
        </View>
    );
}


declare type helloProps = {
    nome: string,
    // o ponto de interrogacao dita que podemos receber esse paramentro ou nao 
    idade?: number
}