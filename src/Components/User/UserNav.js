import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Capture from '../../source/images/Capture.PNG';
import wala from '../../source/images/wala_chaaben.jpg';
import { Link, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined';


const pages = ['Import File', 'File List', 'Consultations'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  


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




  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const goToPages=(page)=>{
    if (page === 'Import File'){
        navigate('/Upload'); 
    }else if(page=== 'File List'){
        navigate('/Status'); 
    }

  }
 function handleCalendarClick(){
    navigate('/calendarUser');

  }

 




  return (
    <AppBar style={{width:"100%", backgroundColor:'white'}}>
      <Container >
        <Toolbar disableGutters>
           <img src={Capture} alt="easylo logo"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'Black',
              textDecoration: 'none',
            }}
          >
            
           
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="Black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}


            </Menu>
            
          </Box>
         
          
         
            
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>goToPages(page)}
                sx={{ my: 2, color: 'Black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            

              
          </Box>
          <Box>
         
         <Typography
           variant="h3"
           noWrap
           component="a"
          
           sx={{
             mr: 4,
             display: { xs: 'none', md: 'flex' },
             fontFamily: 'monospace',
             fontWeight: 700,
             
             color: 'Black',
         
           }}
         >
    
          <NotificationsOutlinedIcon></NotificationsOutlinedIcon>
          </Typography>
         </Box>
        
          <Box>
         
          <Typography
            variant="h3"
            noWrap
            component="a"
           
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              
              color: 'Black',
          
            }}
          >
            
           <CalendarMonthIcon onClick={handleCalendarClick}></CalendarMonthIcon>
          
           </Typography>
          </Box>
         
          

          <Box sx={{ flexGrow: 0 }}>
            
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={wala} />
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;