import React, { useEffect, useState } from 'react'

export const useDebounceValue = (input:string='',time:number = 500) => {
  
    const [debouncevalue,setDebounceValue ] = useState( input );
    
    useEffect( ()=>{
        const timeout = setTimeout( ()=>{
            setDebounceValue( input );
        },time);
    
        return ()=>{
            clearTimeout( timeout );
        }

    },[input]);
    

    return debouncevalue;
}
