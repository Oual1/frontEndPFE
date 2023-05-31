import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from 'axios' ;
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Topbar from "../global/Topbar";

import React, { useState, useEffect } from 'react';


const Team = () => {
  const [users,setUsers]=  useState(null);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id",
     headerName: "ID",
     width: 80, 
  },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
      width: 150,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      width: 200,
    },
    {
      field: "role",
      headerName: "role",
      flex: 1,
      width: 200,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
            
            {role === "USER" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];




  function UsersList(){
    axios.get("http://localhost:8080/api/v1/auth/Users").then(
        response =>{
            const users= response.data;
            setUsers(users);
            console.log(users);
            
            
        })
}
useEffect(()=>{
  UsersList();
  },[]
)

  return (
    <div>
        <Topbar></Topbar>
    <div style={{marginLeft:"20%"}} >
     
      <Box
        m="40px 0 0 0"
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
        <DataGrid checkboxSelection rows={users ?? []} columns={columns} />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit"  color="secondary" variant="contained" style={{backgroundColor:"#0F23CE"}} href="/Form">
                Add New User
              </Button>
            </Box>
    </div>
    </div>
  );
};

export default Team;