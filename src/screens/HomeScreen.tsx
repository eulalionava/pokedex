
import React from 'react'
import { Image,View,FlatList, ActivityIndicator, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../components/PokemonCard'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { styles } from '../theme/appTheme'

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { pokemonList,loadPokemos } = usePokemonPaginated();

  

  return (
    <>
      <Image 
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <View style={{alignItems:'center'}}>
          <FlatList
            data={ pokemonList }
            keyExtractor={ (pokemon)=> pokemon.id }
            showsVerticalScrollIndicator={ false }
            numColumns={2}
            //header
            ListHeaderComponent={(
              <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                top:top + 20,
                marginBottom:top + 20
              }}>
                Pokedex
              </Text>
            )}
            renderItem={ ({item}) => <PokemonCard pokemon={ item }/> }
            //Infinite scroll
            onEndReached={ loadPokemos }
            onEndReachedThreshold={ 0.4}
            ListFooterComponent={(
              <ActivityIndicator 
                size={ 30 }
                color="gray"
              />
            )}
          />
      </View>
    </>
  )
}
