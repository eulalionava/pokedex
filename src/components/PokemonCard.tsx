import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View,Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterface'
import { FadeInImage } from './FadeInImage';
const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon:SimplePokemon
}


export const PokemonCard = ({pokemon}:Props) => {

    const [bgColor,setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation();

    useEffect( ()=>{
        ImageColors.getColors(pokemon.picture,{fallback:'grey'})
            .then(colors=>{

                if(!isMounted.current) return;

                (colors.platform === 'android') 
                    ? setBgColor( colors.dominant || 'gray')
                    : setBgColor('gray')
            });
        return ()=>{
            isMounted.current = false;
        }

    },[]);

  return (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={()=>navigation.dispatch(CommonActions.navigate('Pokemon',{ simplePokemon:pokemon,color:bgColor }))}
    >
        <View style={{
            ...styles.cardContainer,
            width:windowWidth * 0.4,
            backgroundColor:bgColor
        }}>
            <View>
                <Text style={styles.name}>
                    {pokemon.name}
                    {'\n#' + pokemon.id}
                </Text>
            </View>
            <View style={styles.pokebolaContainer}>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={ styles.pokebola}
                />
            </View>
            <FadeInImage
                uri={pokemon.picture}
                style={styles.pokemonImage}
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal:10,
        height:120,
        width:160,
        marginBottom:25,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 7.46,

        elevation: 10,
    },
    name:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        top:20,
        left:10
    },
    pokebola:{
        width:100,
        height:100,
        position:'absolute',
        bottom:-20,
        right:-20,
    },
    pokemonImage:{
        width:120,
        height:120,
        position:'absolute',
        right:-8,
        bottom:-5
    },
    pokebolaContainer:{
        width:100,
        height:100,
        position:'absolute',
        bottom:0,
        right:0,
        overflow:'hidden',
        opacity:0.5
    }
});