import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';



import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Capture from '../../source/images/Capture.PNG';
import { Link } from '@mui/material';

const navItems = ['Home', 'About'];

function NavBar() {
  
  

  

  


  return (
    <Box sx={{ display: 'flex', backgroundColor:'white'}}>
      
      <AppBar component="nav" style={{backgroundColor:'white'}}>
      
        <Toolbar>
        <img src={Capture} alt="easylo logo"/>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
          
          </Typography>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
           
              <Button href='/' sx={{ color: 'black' }}>
                Home
              </Button>
              <Button sx={{ color: 'black' }}>
                About
              </Button>
            
            
            <Button href="/Login" variant="contained" style={{backgroundColor:"#0F23CE"}}> Login</Button> 
            
          </Box>
        </Toolbar>
      </AppBar>
      
      
    </Box>
  );
}



export default NavBar;