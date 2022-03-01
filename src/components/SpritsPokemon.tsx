import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PokemonFull } from '../interfaces/pokemonInterface'
import { FadeInImage } from './FadeInImage'

interface Props{
    pokemon:PokemonFull,
    sprite:number,
    color:string
}

export const SpritsPokemon = ({pokemon,sprite,color}:Props) => {
    const spritsList = [
        pokemon.sprites.back_default,
        pokemon.sprites.front_default,
        pokemon.sprites.front_shiny,
        pokemon.sprites.back_shiny
    ]

    return (
        <View style={{...styles.container,backgroundColor:color}}>
            <FadeInImage 
                    uri={ spritsList[sprite] }
                    style={styles.basicSprite}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    basicSprite:{
        width:100,
        height:100
    },
    container:{
        backgroundColor:'#F2F2F2',
        width:100,
        height:100,
        borderRadius:20,
        opacity:0.8,
        marginRight:5
    }
});
