import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';



import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Capture from '../../source/images/Capture.PNG';
import { Link } from '@mui/material';

const navItems = ['Home', 'About'];

function SecFooter() {
  
  

  

  


  return (
    
    <Box sx={{ display: 'flex'}}>
        <hr style={{ borderTop: '1px solid', backgroundColor :"#2AC78C"}} />
        <AppBar style={{backgroundColor:"#2AC78C", bottom:'0', marginTop:"713px"}}>
      
        
      </AppBar>
      
      <AppBar style={{backgroundColor:"#A6B1B8", bottom:'0', marginTop:"720px"}}>
      <p style={{color:'black', textAlign:'center'}}>www.Corilus.be</p>
        
      </AppBar>
      
      
      
    </Box>
  );
}



export default SecFooter;