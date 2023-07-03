import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import axios from 'axios' ;
import { Link } from 'react-router-dom';

import DescriptionIcon from '@mui/icons-material/Description';
import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from "../UserNav";
import SecFooter from "../../global/SecFooter";


const InvoiceList= () => {
    const [invoices,setInvoices]=  useState([]);
    const [userName, setUserName] = useState(0);

    
 
 
   useEffect(() => {
   const fetchUserName = async () => {
     try {
       const token = localStorage.getItem('token');
       
       if (token) {
        
         const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-name`, {
           headers: { Authorization: `${token}` }
         });
         
         
         setUserName(roleResponse.data);
         
         
         
        
       }else {
         // Gérer le cas où le token est manquant
         setUserName(null)
       }
     } catch (error) {
       console.error('Erreur lors de la récupération du mail de l\'utilisateur:', error);
       // Gérez l'erreur ici
       setUserName(null);
       
     }
   };
   fetchUserName();
 }, []);
 
  
    function invoiceList(){
        axios.get("http://localhost:8080/invoices").then(
          response =>{
              setInvoices(response.data);
               })
            }
   
   

    const goToInvoice=async(id)=>{
  
        window.location.href = `/invoice/${id}/${userName}`;
      };

           
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id",
     headerName: "ID",
     width: 50, 
  },
    {
      field: "date",
      headerName: "Date de Création",
      flex: 1,
      
      width: 100,
    },
    {
      field: "status",
      headerName: "Etat",
      flex: 1,
      width: 100,
    },
   
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      width: 50,
      renderCell: (params) => {
        return (
          <div>
              <a onClick={(e)=>{goToInvoice(params.id,e)}}> <DescriptionIcon></DescriptionIcon> </a>
            
                  
                
          </div>
        );
      },
    },
  ];




useEffect(()=>{
  invoiceList()
  },[]
)

  return (
    <div>
       <ResponsiveAppBar></ResponsiveAppBar>
    <div style={{marginTop:'10%', width:"45%" }} >
    <p style={{marginLeft:'40%'}}>Liste des Factures</p>
      <Box
        
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={invoices ?? []} columns={columns} />
      </Box>
      
    </div>
    <SecFooter></SecFooter>
    </div>
  );
};

export default InvoiceList;