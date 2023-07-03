import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from 'axios' ;
import { Link } from 'react-router-dom';

import DescriptionIcon from '@mui/icons-material/Description';
import React, { useState, useEffect } from 'react';

const reponsesOA = ['C:/Users/loulou/Desktop/reponseOA/rejected invoice7.txt', 'C:/Users/loulou/Desktop/reponseOA/rejected invoice6.txt', 'C:/Users/loulou/Desktop/reponseOA/rejected invoice5.txt', 'C:/Users/loulou/Desktop/reponseOA/accounting - invoice4.txt', 'C:/Users/loulou/Desktop/reponseOA/accounting - invoice3.txt', 'C:/Users/loulou/Desktop/reponseOA/accounting - invoice2.txt','C:/Users/loulou/Desktop/reponseOA/accounting - invoice1.txt'];

const ListInvoice= () => {
    const [invoices,setInvoices]=  useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const [numberRandom, setNumberRandom] = useState(null);
    const [msgBody,setMsgBody]=  useState('Bonjour Docteur,\n\nCette facture est rejetée.\nVeuillez la corriger et la réenvoyer le plus tôt possible.');
    const [subject,setSubject]=  useState('Réponse sur la Facture de Réf: ');
    const [attachment,setAttachment]=  useState(null);
  

  

   
       
    const generateRandomNumber = () => {
      const randomNumber = Math.floor(Math.random() * 7);
      setNumberRandom(randomNumber);
    };
     
   
 
   useEffect(() => {
   invoiceList();
 }, []);
 
  
    function invoiceList(){
        axios.get("http://localhost:8080/invoices/closedInv").then(
          response =>{
              setInvoices(response.data);
               })
            }
            const getUserById=async(id)=>{
              axios.get(`http://localhost:8080/api/v1/auth/User/${id}`).then(
          response =>{
              setUserEmail(response.data.email);
               })
  
        
      
            };


            const sendMail = async (details) => {
              try {
                const response = await axios.post('http://localhost:8080/sendMail', details);
                const status = response.data;
                console.log('Le mail a été envoyé avec succès', status);
                // Effectuez les actions supplémentaires nécessaires après l'envoi du mail
              } catch (error) {
                console.error('Une erreur s\'est produite lors de l\'envoi du mail', error);
                // Gérez les erreurs en conséquence
              }
            };
            
            
      
   
   

    const updateInvoice=async(id, userId)=>{
      getUserById(userId)
      
      axios.put(`http://localhost:8080/invoices/updateInv/${id}`)
        .then(response => {
          console.log('Le fichier a été mis à jour avec succès', response.data);
          // Effectuez les actions supplémentaires nécessaires après la mise à jour du fichier
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la mise à jour du fichier', error);
          // Gérez les erreurs en conséquence
        });
        
       
      };

           
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id",
     headerName: "Référence",
     width: 100, 
  },
    {
      field: "date",
      headerName: "Date de Création",
      flex: 1,
      width: 50,
    },
    {
      field: "status",
      headerName: "Etat",
      flex: 1,
      width:20,
    },
    { field: "userId",
    headerName: "Medecin",
    width: 100, 
 },
   
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      width: 50,
      renderCell: (params) => {
        const type= params.row.status.toString() == 'CLOSED';
        return (
          <div>
             { type &&(
               <Button variant="outlined" onClick={(e)=>{updateInvoice(params.id, params.userId,e)}}>Traiter</Button>
              
             )}
            
            
                  
                
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
       
    <div style={{marginTop:'10%', width:"60%" }} >
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
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={invoices ?? []} columns={columns} />
      </Box>
      
    </div>
   
    </div>
  );
};

export default ListInvoice;


