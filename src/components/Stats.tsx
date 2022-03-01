import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Stat } from '../interfaces/pokemonInterface';

interface Props{
  item:Stat,
  color:string
}

export const Stats = ({item,color}:Props) => {
  return (
    <View style={{...styles.stat,backgroundColor:color}}>
        <Text style={styles.title}>{ item.stat.name }</Text>
        <Text style={styles.numero}>{ item.base_stat }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  stat:{
    marginVertical:20,
    marginRight:10,
    padding:10,
    width:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  title:{
    color:'white',
    fontSize:15,
    fontWeight:'bold'
  },
  numero:{
    fontSize:25,
    color:'white',
    fontWeight:'bold',
  }
});
