import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HelloComponent from '@/components/helloComponent';

export default function Hello() {
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>

            {/* <HelloComponent nome = {"Stelio Acacio Mondlane"} idade = {15} > </HelloComponent> */}
            <HelloComponent > </HelloComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
});
