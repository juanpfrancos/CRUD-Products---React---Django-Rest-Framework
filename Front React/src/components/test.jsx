import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';

function DataTable() {

/*Fetch Data*/
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
/*------------------------------------------*/


/*Show Data*/
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Producto', width: 130 },
  { field: 'price', headerName: 'Precio', type: 'number', width: 90,},
  { field: 'reference', headerName: 'Referencia', width: 130 },
];

const arrdata = data.map((data) => (
    data
));
/*console.log(arrdata)*/

/*----------------------------*/

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={arrdata} columns={columns} pageSize={3} checkboxSelection />
      </div>
    );
  }

export default DataTable