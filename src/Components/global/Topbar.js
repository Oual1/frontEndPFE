import React from 'react'
import{Box, IconButton, useTheme} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon  from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined';
import SearchIcon  from '@mui/icons-material/Search';
import SideBar from './SideBar';

import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const settings = ['Account', 'Logout'];
function Topbar() {
    const theme= useTheme();
    const colors= tokens(theme.palette.mode);
    const colorMode= useContext(ColorModeContext);



   
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 
  


  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'GET', // Utilisez GET ou POST en fonction de votre configuration backend
        headers: {
          'Content-Type': 'application/json' // Assurez-vous de spécifier le type de contenu approprié
        },
      });
  
      if (response.ok) {
        // La requête de logout s'est terminée avec succès
        // Vous pouvez effectuer des opérations supplémentaires, comme vider le local storage, rediriger l'utilisateur, etc.
        localStorage.clear(); // Videz le local storage
  
        // Redirigez l'utilisateur vers la page de login, par exemple
        window.location.href = '/Login';
      } else {
        // La requête de logout a échoué
        // Gérez l'erreur en conséquence
        console.error('Erreur lors de la déconnexion:', response.statusText);
      }
    } catch (error) {
      // Une erreur s'est produite lors de la requête de logout
      // Gérez l'erreur en conséquence
      console.error('Erreur lors de la déconnexion:', error);
    }
  };


   function onClickLogout(setting) {
    if(setting === 'Logout'){
      logout();
    }
    
   }




  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };






  return (
    <div>
      <SideBar ></SideBar>
    <Box display="flex" justifyContent="space-between" marginLeft="210px"p={2}>
        <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        

        <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <Tooltip title="Open Profile">
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" key={setting} onClick={()=>onClickLogout(setting)}  >{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>



      </Box>

    </Box>
    
    </div>
  )
}

export default Topbar;