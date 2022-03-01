import React from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { PokemonFull } from '../interfaces/pokemonInterface'
import  Carousel  from 'react-native-snap-carousel';
import { Sprits } from '../data/Sprits';
import { SpritsPokemon } from './SpritsPokemon';
import { Movimientos } from './Movimientos';
import { Stats } from './Stats';

const { width:windowWith } = Dimensions.get('window');

interface Props{
    pokemon:PokemonFull,
    color:string
}

export const PokemonDetail = ({ pokemon,color }:Props) => {

  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
            ...StyleSheet.absoluteFillObject,
        }}
    >
        {/* Tipos */}
        <View style={{...styles.container,marginTop:370}}>
            <Text style={styles.title}>Types</Text>
            <View style={{flexDirection:'row'}}>
                {
                    pokemon.types.map( ({type})=>(
                        <Text 
                            style={{...styles.regularText,marginRight:20}} 
                            key={type.name}
                        >
                            { type.name }
                        </Text>
                    ))
                }
            </View>
        </View>
        <View style={styles.container}>
            <Text style={styles.title}>Peso</Text>
            <Text style={styles.regularText}>{ pokemon.weight } kg</Text>
        </View>

        <View style={{...styles.container,marginTop:20}}>
            <Text style={styles.title}>Sprites</Text>
        </View>
        <ScrollView 
            horizontal={ true }
            style={{marginLeft:20}}
            showsHorizontalScrollIndicator={ false }
        >
        {
            Sprits.map( (item)=>(
                <SpritsPokemon 
                    key={item.id}
                    pokemon={ pokemon } 
                    sprite={ item.id } 
                    color={ color }
                />
            ))
        }
        </ScrollView>

        {/* Habilidades */}
        <View style={styles.container}>
            <Text style={styles.title}>Habilidades base</Text>
            <View style={{flexDirection:'row'}}>
                {
                    pokemon.abilities.map( ({ability})=>(
                        <Text 
                            style={{...styles.regularText,marginRight:20}} 
                            key={ability.name}
                        >
                            { ability.name }
                        </Text>
                    ))
                }
            </View>
        </View>

        {/* Movimientos */}
        <View style={styles.container}>
            <Text style={styles.title}>Moviemientos</Text>
            <FlatList
                data={pokemon.moves}
                renderItem={ ({item})=><Movimientos move={ item.move.name} color={ color }/>}
                keyExtractor={(item)=>item.move.name}
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
            />
        </View>

        {/* Stats */}
        <View style={{...styles.container,marginBottom:50}}>
            <Text style={styles.title}>Stats</Text>
            <FlatList
                data={ pokemon.stats}
                renderItem={({item})=> <Stats item={ item } color={color}/> }
                keyExtractor={ (item) => item.stat.name }
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
            />
        </View>



    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    regularText:{
        fontSize:19
    },
});
