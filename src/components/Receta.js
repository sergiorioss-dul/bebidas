import React, { useContext,useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //Configuracion del modal
    const [ modalStyle ] = useState(getModalStyle);
    const [ open,setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const { recetaInfo,guardarRecetaInfo,guardarIdReceta } = useContext(ModalContext);

    //Muestra Info
    const mostrarIngredientes = recetaInfo =>{
        let ingredientes = [];
    
        for( let i=1; i<16 ; i++){
            if(recetaInfo[`strIngredient${i}`]){
                ingredientes.push(
                (recetaInfo[`strIngredient${i}`] !== null)?
                <li key={receta.strDrink}>{recetaInfo[`strIngredient${i}`]} {recetaInfo[`strMeasure${i}`]}</li>
                : null
            )}
        }
        return ingredientes;
    }

    return (  
        <div className="col-md-4 mb-3">
            <div className="card">
             <h2 className="card-header">{receta.strDrink}</h2>
             <img className="card-img-top" src={receta.strDrinkThumb} alt=""/>
             <div className="card-body">
                 <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={ () =>{
                        guardarIdReceta(receta.idDrink)
                        handleOpen();
                    }}
                 >
                     Ver Receta
                 </button>
                 <Modal
                    open={open}
                    onClose={() =>{
                        guardarIdReceta(null);
                        handleClose();
                        guardarRecetaInfo({});
                    }}
                 >
                     <div style={modalStyle} className={classes.paper}>
                        <h3>{recetaInfo.strDrink}</h3>
                        <h4 className="mt-4">Instrucciones</h4>
                        <p>
                            {recetaInfo.strInstructions}
                        </p>
                        <img
                            className="img-fluid"
                            src={recetaInfo.strDrinkThumb}
                            alt=""
                        />
                        <h3>Ingredientes & Cantidades</h3>
                        <ul>
                            {mostrarIngredientes(recetaInfo)}
                        </ul>
                     </div>
                 </Modal>
             </div>
            </div>
        </div>
    );
}
 
export default Receta;