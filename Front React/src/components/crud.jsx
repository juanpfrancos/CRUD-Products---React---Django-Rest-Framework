import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

const baseUrl='http://localhost:8000/Products/'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function Crud() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [productSelected, setproductSelected]=useState({
    name:'',
    price: '',
    reference: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setproductSelected(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(productSelected);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, productSelected)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+productSelected.id+'/', productSelected)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(producto=>{
        if(productSelected.id===producto.id){
          producto.name=productSelected.name;
          producto.price=productSelected.price;
          producto.reference=productSelected.reference;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+productSelected.id)
    .then(response=>{
      setData(data.filter(producto=>producto.id!==productSelected.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarproducto=(producto, caso)=>{
    setproductSelected(producto);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva producto</h3>
      <br />
      <TextField name="name" className={styles.inputMaterial} label="Producto" onChange={handleChange}/>
      <br />
      <TextField name="price" className={styles.inputMaterial} label="Precio" onChange={handleChange}/>
      <br />
      <TextField name="reference" className={styles.inputMaterial} label="Referencia" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar</h3>
      <br />
      <TextField name="name" className={styles.inputMaterial} label="Producto" onChange={handleChange} value={productSelected && productSelected.name}/>
      <br />
      <TextField name="price" className={styles.inputMaterial} label="Precio" onChange={handleChange} value={productSelected && productSelected.price}/>
      <br />
      <TextField name="reference" className={styles.inputMaterial} label="Referencia  " onChange={handleChange} value={productSelected && productSelected.reference}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la producto <b>{productSelected && productSelected.name}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>ID</TableCell>
             <TableCell>Producto</TableCell>
             <TableCell>Precio</TableCell>
             <TableCell>Referencia</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(producto=>(
             <TableRow key={producto.id}>
               <TableCell>{producto.id}</TableCell>
               <TableCell>{producto.name}</TableCell>
               <TableCell>{producto.price}</TableCell>
               <TableCell>{producto.reference}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarproducto(producto, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarproducto(producto, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}

export default Crud;