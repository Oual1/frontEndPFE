import React from 'react'
import { useState, useRef } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from '../../theme';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { BarChartOutlined } from '@mui/icons-material';
import wala from '../../source/images/wala_chaaben.jpg';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import axios from 'axios';
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  

const SideBar=() =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
 

  const [currentImage, setCurrentImage] = useState('../../source/images/Capture.PNG'); // Chemin de l'image actuelle
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
    handleUpload();
  };
  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const token = localStorage.getItem('token');
        
        if (token) {
        const response = await axios.put(
          'http://localhost:8080/api/v1/auth/uploadImage',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              headers:{ Authorization: `${token}` } // Remplacez par votre token d'authentification
            }
          }
        );
        

        console.log(response.data);
        setCurrentImage(URL.createObjectURL(selectedImage));
        }

        // Traitez la réponse du serveur selon vos besoins
        // Vous pouvez afficher un message de succès ou rediriger l'utilisateur, par exemple
      } catch (error) {
        console.error('Error uploading image:', error);
        // Traitez l'erreur selon vos besoins
        // Vous pouvez afficher un message d'erreur ou effectuer une action appropriée
      }
    }
  };



  return (
    <div >
    <Box 
      sx={{
        "& .pro-sidebar-inner": {
          background: "#29D8AD !important",
          position: "fixed",
          left: "0px",
          width:"300px"
          
          
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 0px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{position:'fixed'}}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: 'black',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                
              >
                <Typography variant="h5" color='black' >
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
              
               <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={wala}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  
                />
                
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color='black'
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Chaaben
                </Typography>
                <Typography variant="h5" color='black' >
                  wala
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/Dashboard"
              icon={<HomeOutlinedIcon></HomeOutlinedIcon> }
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon></PeopleOutlinedIcon>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add User"
              to="/form"
              icon={<PersonAddAltIcon></PersonAddAltIcon>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
             <Item
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
            </Box>

          
        </Menu>
      </ProSidebar>
    </Box>
    </div>
  )
}



export default SideBar;