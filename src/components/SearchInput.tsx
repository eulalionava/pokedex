import React, { useEffect, useState } from 'react'
import { Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';
import { useDebounceValue } from '../hooks/useDebounceValue';

interface Props{
    onDebounce:(value: string ) => void;
    style?:StyleProp<ViewStyle>,
}

export const SearchInput = ({style,onDebounce}:Props) => {

    const [ textValue,setTextValue ] = useState('');
    const debounce = useDebounceValue(textValue );

    useEffect( ()=>{
        onDebounce( debounce );
    },[debounce]);

    return (
        <View style={{
            ...styles.container,
            ...style as any
        }}>
            <View style={styles.textBackgroud}>
                <TextInput
                    placeholder='Buscar pokemon'
                    style={{
                        ...styles.textInput,
                        top:(Platform.OS === 'ios') ? 0 : 2
                    }}
                    autoCapitalize='none'
                    autoCorrect={ false }
                    value={ textValue }
                    onChangeText={ setTextValue }
                />
                <Icon name='search-outline' color='grey' size={ 30 }/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    textBackgroud:{
        backgroundColor:'#F3F1F3',
        borderRadius:50,
        height:40,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    textInput:{
        flex:1,
        fontSize:18
    }
});
