import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Listar(){

const [data, setData] = useState([]);

useEffect(()=>{  
    fetchData();
    }, []);
    
const fetchData = () => {
    axios.get('http://localhost:8000/Products/')
    .then(function (response)  {
      console.log(response);
      setData(response.data)
    })
    .catch(function (error)  {
      console.log(error);
    })
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    button:{
      margin: '2em',
    }
  });
  

    const classes = useStyles();
  
    return (
        <>
              <h1>Productos</h1>
              <Button variant="contained" color="primary" type="submit" component={Link} to="/add" className={classes.button}>
                  Agregar Producto
              </Button>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Producto</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Referencia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.price}</TableCell>
                        <TableCell>{data.reference}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        </>
    )
}

export default Listar