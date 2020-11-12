import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



function Add(){

    const [data, setData] = useState({
      name: '',
      price: '',
      reference: '',
    });

    const inputChange = (event) =>{
      setData({
        ...data,
        [event.target.name]:event.target.value,
      })
    }

    const sendData = (event) =>{
      event.preventDefault();
      axios.post('http://localhost:8000/Products/',data)
      .then(function (response)  {
        console.log(response);
      })
      .catch(function (error)  {
        console.log(error);
      })
      
    }
    const classes = useStyles();
    return (
        <>
          <h1>Agregar Producto</h1>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={sendData}>
            <TextField id="outlined-basic" label="Producto" variant="outlined" name="name" onChange={inputChange} />
            <TextField id="outlined-basic" label="Precio" variant="outlined" name="price" onChange={inputChange}/>
            <TextField id="outlined-basic" label="Referencia" variant="outlined" name="reference" onChange={inputChange}/>
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
            <Button variant="contained" color="primary" type="submit" component={Link} to="/">
              Inicio
            </Button>
        </form>
        </>
    )
}

export default Add