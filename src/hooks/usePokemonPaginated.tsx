import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pekemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterface';

export const usePokemonPaginated = () => {
    const [isLoading,setIsLoading ] = useState(true); 
    const[pokemonList,setPokemonList] = useState<SimplePokemon[]>([]);

    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemos = async()=>{
        setIsLoading(true);
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next;
        mapPokemonList( resp.data.results );
    }

    const mapPokemonList =(list:Result[])=>{
        const newPokemonList:SimplePokemon[] = list.map( ({name,url})=>{
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length-2]; 
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return { id,picture,name };
        });

        setPokemonList([...pokemonList,...newPokemonList]);
        setIsLoading(false);
    }

    useEffect( ()=>{
        loadPokemos();
    },[]);

    return{
        isLoading,
        pokemonList,
        loadPokemos
    }

}
