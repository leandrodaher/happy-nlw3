import { Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    /*teste?: string; // nome + ? para propriedades não obrigatórias*/
    showCancel?: boolean;
}
                                                    // showCancel = true é um valor padrão para showCancel caso a propiedade não seja passada ao componente
export default function Header(/*props: HeaderProps*/ { title, showCancel = true }: HeaderProps) {
    const navigation = useNavigation();
    
    function handleGoBackToAppHomepage() {
        navigation.navigate('OrphanagesMap');
    }

    return (
        <View style={styles.container}>
            {/* Botão de voltar */}
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d6" />
            </BorderlessButton>

            {/* <Text style={styles.title}>{props.title}</Text> */}
            <Text style={styles.title}>{title}</Text> 

            { showCancel ? (
                <BorderlessButton onPress={handleGoBackToAppHomepage}>
                <   Feather name="x" size={24} color="#ff669d" />
                </BorderlessButton>
            ) : (
                <View />
            ) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f8',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,

    }
});