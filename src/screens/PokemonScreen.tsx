import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import  Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonDetail } from '../components/PokemonDetail';
import { usePokemon } from '../hooks/usePokemon';
import { RootStackParams } from '../navigator/Navigation';

interface Props extends StackScreenProps<RootStackParams,'Pokemon'>{};

export const PokemonScreen = ({navigation,route}:Props) => {

  const { simplePokemon,color} = route.params;
  const { id,name,picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  const { isLoading,pokemon } = usePokemon(id);

  return (
    <View style={{flex:1}}>
      <View style={{
        ...styles.headerContainer,
        backgroundColor:color
      }}>
        <TouchableOpacity
          onPress={ ()=>navigation.pop() }
          activeOpacity={0.8}
          style={{
            ...styles.back,
            top:top + 10
          }}
        >
          <Icon name='arrow-back-outline' color='white' size={35}/>
        </TouchableOpacity>

        <Text style={{
          ...styles.pokemonName,
          top:top + 40
        }}>
          { name + '\n' } #{ id }
        </Text>
        <Image source={require('../assets/pokebola-blanca.png')} style={styles.pokeboll}/>
        <FadeInImage
          uri={picture}
          style={styles.pokemonImage}
        />
      </View>

      {/* Detalles y loading  */}

      {
        isLoading
        ?(
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              color={ color }
              size={ 50 }
            />
          </View>
        )
        :<PokemonDetail pokemon={ pokemon } color={ color }/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer:{
    height:370,
    zIndex:999,
    alignItems:'center',
    borderBottomLeftRadius:1000,
    borderBottomRightRadius:1000
  },
  back:{
    position:'absolute',
    left:10
  },
  pokemonName:{
    color:'white',
    fontSize:40,
    alignSelf:'flex-start',
    left:10
  },
  pokeboll:{
    width:250,
    height:250,
    bottom:-20,
    opacity:0.7
  },
  pokemonImage:{
    width:250,
    height:250,
    position:'absolute',
    bottom:-15
  },
  loadingIndicator:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
