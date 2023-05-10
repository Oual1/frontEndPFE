import axios from 'axios' ;
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DeleteIcon from '@mui/icons-material/Delete';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { Link } from 'react-router-dom';

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
    const segregateFile=async(id)=>{
      try {
        await axios.get(`http://localhost:8080/files/file-seg/${id}`).then(resp =>{
          
        });
        await axios.get(`http://localhost:8080/headers/header-seg/${id}`).then(re =>{
          
        });
        await axios.get(`http://localhost:8080/details/detail-seg/${id}`).then(response =>{
          
      });
        await axios.get(`http://localhost:8080/footers/footer-seg/${id}`).then(res=>{
          
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
          width: 100,
          
        },
        {
          field: 'type',
          headerName: 'type',
          width: 250,
          
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 300,
          renderCell:(params)=>{
            return(
              <div>
                <a onClick={(e)=>{deleteFile(params.id,e)}}> <DeleteIcon style={{Color:'#444'}}/> </a>
                <span style={{paddingLeft:'3em'}}></span>
                <a onClick={(e)=>{segregateFile(params.id,e)}}> <ContentCutIcon style={{Color:'#444'}}/> </a>
                <span style={{paddingLeft:'3em'}}></span>
                <Link to={'/messages/'+`${params.row.id}`} > <SlideshowIcon /> </Link>
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
 


<div style={{marginLeft:'20%',  marginTop:20 , marginBottom: 180}}>
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

  


