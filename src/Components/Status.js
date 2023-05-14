import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function ListFiles() {
    const [Filess,setFiles]=  useState(null);
   
    

    
    
    

    
   
    function FileList(){
        axios.get("http://localhost:8080/files").then(
            response =>{
                const filess= response.data;
                setFiles(filess);
                
                
            })
    }

   
    
    
    
    useEffect(()=>{
        FileList();
       
        
        
    },[]
    )
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'File Reference', width: 100 },
        {
          field: 'fileName',
          headerName: 'File Name',
          width: 250,
          
         
        },
        {
          field: 'state',
          headerName: 'State',
          width: 100,
          
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 250,
          
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell:(params)=>{
            return(
              <div>
            
                <Link to={'/ViewDetail/'+`${params.row.id}`} > 
                <Button  variant="contained" style={{backgroundColor:"#27E09A"}}> View File</Button> 
                </Link>
              </div>
            )
          }
        },

       ];
      console.log(Filess);
      
      const rows =Filess ? Filess?.map((e)=>{
        
        return{
     id: e.id,
    fileName: e.fileName,
    state: e.state,
    type:e.type 
        }}):[];
       
    
        
       
      
      
  return (
 


<div style={{marginLeft:'25%',  marginTop:100 , marginBottom: 180}}>
  <h3 style={{fontSize: 35,  marginLeft:"40%" }}>File List </h3>
    <Box sx={{ height: 250, width: '90%'}}>
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
  );
}

  


