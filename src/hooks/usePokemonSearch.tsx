import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pekemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterface';

export const usepokemonSearch = () => {

    const [isFeching,setIsFeching ] = useState(true); 
    const[pokemonList,setPokemonList] = useState<SimplePokemon[]>([]);


    const loadPokemos = async()=>{
        const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
        mapPokemonList( resp.data.results );
    }

    const mapPokemonList =(list:Result[])=>{
        const newPokemonList:SimplePokemon[] = list.map( ({name,url})=>{
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length-2]; 
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return { id,picture,name };
        });

        setPokemonList( newPokemonList );
        setIsFeching(false);
    }

    useEffect( ()=>{
        loadPokemos();
    },[]);

    return{
        isFeching,
        pokemonList,
        loadPokemos
    }

}
