import React, { createContext,useEffect,useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) =>{

    //State
    const [ idreceta,guardarIdReceta] = useState(null);
    const [ recetaInfo,guardarRecetaInfo ] = useState({});

    useEffect(()=>{

        const obtenerReceta = async () =>{
            if(!idreceta) return;
            const url= `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const res = await axios.get(url);
            guardarRecetaInfo(res.data.drinks[0]);
        }
        obtenerReceta();
    },[idreceta])
    
    return(
        <ModalContext.Provider
            value={{
                recetaInfo,
                guardarIdReceta,
                guardarRecetaInfo
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;