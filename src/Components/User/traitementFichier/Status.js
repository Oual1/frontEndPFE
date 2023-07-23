
import * as React from 'react';
import axios from 'axios' ;
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ResponsiveAppBar from '../UserNav';
import SecFooter from '../../global/SecFooter';


import jsPDF from 'jspdf';
import 'jspdf-autotable';





export default function ListFiles() {
    const [Filess,setFiles]=  useState([]);


    const [errorMap, setErrorMap]= useState([]);
    const [filo, setFilo]= useState(null);
  
    const [userName, setUserName] = useState(null);
  
    
    const [errorRates, setErrorRates] = useState({});

    function getTauxErreur(fileId) {
      axios.get(`http://localhost:8080/details/taux/${fileId}`)
        .then(response => {
          setErrorRates(prevState => ({
            ...prevState,
            [fileId]: response.data,
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }

  
    
    

    

   


    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
         
          const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-name`, {
            headers: { Authorization: `${token}` }
          });
          
          
          setUserName(roleResponse.data);
          
          console.log(roleResponse.data)
        fileList(roleResponse.data)
         
        }
        
      } catch (error) {
        console.error('Erreur lors de la récupération du mail de l\'utilisateur:', error);
        // Gérez l'erreur ici
        setUserName(0);
        
      }
     

    };
   
   
    
   


    function fileList(id){
      axios.get(`http://localhost:8082/files/file-withUser/${id}`).then(
        response =>{
            const filess= response.data;
            console.log(response.data)
            setFiles(filess);
            filess?.forEach((file) => {
              getTauxErreur(file.id);
            });
           
           
            
            
        })
     
     
    }
    

    
    
    

    
   

   
    
    
    
    useEffect(()=>{
       
       fetchUserName();
       
      },[]
    )
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Référence', width: 150 },
        {
          field: 'fileName',
          headerName: 'Fichier',
          width: 280,
          
         
        },
        {
          field: 'state',
          headerName: 'Etat',
          width: 120,
          
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 180,
          
        },
        {
          field: 'error',
          headerName: "Nombre d'Erreurs",
          width: 180,
          renderCell:(params)=>{
            const fileId = params.row.id;
        const errorRate = errorRates[fileId] || 0;
            return(
              <div>
            
            <p style={{color:"red", marginLeft:"600%"}}>{errorRate}</p>

                 </div>
            )
          }
        },
       
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell:(params)=>{
          

            return(
              <div>
            
                <Link to={'/ViewDetail/'+`${params.row.id}`} > 
                  <Button  variant="contained" style={{backgroundColor:"#27E09A"}}> Voir</Button> 
                </Link>
             

                 </div>
            )
          }
        },

       ];
      
      
      const rows =Filess ? Filess?.map((e)=>{
        
        return{
     id: e.id,
    fileName: e.fileName,
    state: e.state,
    type:e.type 
        }}):[];
       
    
        
       
      
      
  return (
 
<div >
<ResponsiveAppBar></ResponsiveAppBar>

<div>
     
       
        
      
     
<div style={{marginTop:100 , marginBottom: 180, marginLeft:"10%"}}>

  <br></br>
  <br></br>
  <h3 style={{fontSize: "1.5em",  marginLeft:"32%", color:'black' }}>Liste des messages de rejet</h3>
    <Box sx={{ height: 310, width: '92%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box></div>
    
    
    </div>
    <SecFooter></SecFooter>
    </div>
  );
}

  


