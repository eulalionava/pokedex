import React, { useEffect, useState } from 'react'
import {  Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usepokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterface';
import { styles } from '../theme/appTheme';

const ancho = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFeching,pokemonList } = usepokemonSearch();
  const [ pokemonFiltered,setPokemonFiltered ] = useState<SimplePokemon[]>([])

  const [term,setTerm] = useState('');

  useEffect( ()=>{
    if(term.length === 0 ){
      return setPokemonFiltered([]);
    }

    if( isNaN(Number(term)) ){
      setPokemonFiltered(
        pokemonList.filter( (poke)=>poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase() ))
      );
    }else{
      const pokemonById = pokemonList.find( poke=> poke.id === term );
      setPokemonFiltered(
        ( pokemonById ) ? [pokemonById] : []
      )
    }


  },[term]);


  if ( isFeching ){
    return <Loading/>
  }

  return (
    <View style={{
      flex:1,
      marginHorizontal:20 
    }}>
        <SearchInput 
          onDebounce={ (value)=>setTerm(value) }
          style={{
            position:'absolute',
            zIndex:999,
            width:ancho - 40,
            top:(Platform.OS === 'ios') ? top:top+20
          }}
        />

        <FlatList
            data={ pokemonFiltered }
            keyExtractor={ (pokemon)=> pokemon.id }
            showsVerticalScrollIndicator={ false }
            numColumns={2}
            //header
            ListHeaderComponent={(
              <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                marginTop:top + 60
              }}>
                { term }
              </Text>
            )}
            renderItem={ ({item}) => <PokemonCard pokemon={ item }/>}
        />
    </View>
  )
}

