import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from 'axios' ;
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Topbar from "../global/Topbar";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState, useEffect } from 'react';


const EmailList = () => {
  const [emails,setEmails]=  useState(null);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id",
     headerName: "N°Email",
     width: 80, 
  },
    {
      field: "recipient",
      headerName: "Recipient",
      flex: 1,
      cellClassName: "name-column--cell",
      width: 170,
    },
    {
      field: "attachment",
      headerName: "Attachment",
      flex: 1,
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      width: 80,
    },
   
    
    
  ];




  function emailsList(){
    axios.get("http://localhost:8080/mailing/allEmails").then(
        response =>{
            const users= response.data;
            setEmails(users);
            
            
            
        })
}
useEffect(()=>{
  emailsList();
  },[]
)

  return (
    <div>
        <Topbar></Topbar>
    <div style={{marginLeft:"30%", width: "60%", marginTop:"5%"}} >
    <p style={{marginLeft:'30%', fontSize: "1.5em"}}>Liste des réponses Envoyées</p>
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
            color: "#66CDD5",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#66CDD5",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#66CDD5",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={emails ?? []} columns={columns} />
      </Box>
      
    </div>
    </div>
  );
};

export default EmailList;