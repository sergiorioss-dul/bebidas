import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext ();

const RecetasProvider = (props) => {

    const [ recetas,guardarRecetas ] = useState([]);
    const [ buscar,buscarRecetas ] = useState({
        nombre:'',
        categoria:''
    });

    const [ consultar,guardarConsultar] = useState(false);

    const { nombre, categoria } = buscar;

    useEffect(()=>{

        if(consultar){
                const obtenerRecetas = async () =>{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const res = await axios.get(url);
                guardarRecetas(res.data.drinks);
            }
        obtenerRecetas();
        }
        // eslint-disable-next-line
    },[buscar])

    return ( 
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar,
            }}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;