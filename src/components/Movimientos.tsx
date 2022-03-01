import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

interface Props{
    move:string,
    color:string
}

export const Movimientos = ({move,color}:Props) => {
  return (
    <View style={{...styles.move,backgroundColor:color}}>
        <Text style={{color:'white'}}>{ move }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    move:{
        marginTop:10,
        marginRight:5,
        padding:10,
        borderRadius:5
    }
});
