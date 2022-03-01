import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterface';

export type RootStackParams = {
  Home:undefined,
  Pokemon:{ simplePokemon:SimplePokemon,color:string }
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown:false,
            cardStyle:{
                backgroundColor:'white'
            }
        }}
    >
        <Stack.Screen name='Home' component={ HomeScreen } />
        <Stack.Screen name='Pokemon' component={ PokemonScreen } />
    </Stack.Navigator>
  )
}
