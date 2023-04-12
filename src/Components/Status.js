import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListFiles() {
    const [Filess,setFiles]=  useState(null);

    const deleteFile=async(id)=>{
      try {
        await axios.delete(`http://localhost:8080/files/${id}`).then(res =>{
          Filess= Filess.filter(item => item.id !==id);
          setFiles(Filess);
          


        });
        
        
        
      } catch (error) {
        console.log(error);
        
      }
      Show()
    };
    const Show=()=>{
      axios.get("http://localhost:8080/files").then(response =>{
        const Filess= response.data;
        setFiles(Filess)
      })
    }
    

    
   
    function FileList(){
        axios.get("http://localhost:8080/files").then(
            response =>{
                const filess= response.data;
                setFiles(filess);
                
                
            })
    }
    
    
    
    useEffect(()=>{
        FileList()
        
    },[]
    )
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
          field: 'fileName',
          headerName: 'FileName',
          width: 300,
          
         
        },
        {
          field: 'state',
          headerName: 'state',
          width: 150,
          
        },
        {
          field: 'type',
          headerName: 'type',
          width: 250,
          
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 70,
          renderCell:(params)=>{
            return(
              <div>
                <a onClick={(e)=>{deleteFile(params.id,e)}}> <DeleteIcon style={{Color:'#444'}}/> </a>
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
 


<div style={{marginTop:20}}>
    <Box sx={{ height: 400, width: '100%'}}>
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

  


