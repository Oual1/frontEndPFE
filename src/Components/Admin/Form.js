import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Topbar from "../global/Topbar";
import axios from 'axios' ;
import { useState} from 'react';

const Form = () => {
    const [firstname,setFirstname]=  useState(null);
    const [lastname,setLastname]=  useState(null);
    const [email,setEmail]=  useState(null);
    const [phoneNumber,setPhoneNumber]=  useState(null);
    const [password,setPassword]=  useState(null);


  const isNonMobile = useMediaQuery("(min-width:600px)");

  
  
  const handleFormSubmit = (values) => {
    setFirstname(values.firstname);
    setLastname(values.lastname);
    setEmail(values.email);
    setPhoneNumber(values.phoneNumber);
    setPassword(values.password);
    addUser(values);
    window.location.href = '/Team';
  };


  function addUser(user){
        axios.post("http://localhost:8080/api/v1/auth/register", user)
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});}

  return (
    <div>
        <Topbar></Topbar>
    <div style={{marginLeft:"20%", marginTop:"5%"}}>
     
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                name="firstname"
                error={!!touched.firstname && !!errors.firstname}
                helperText={touched.firstname && errors.firstname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
                error={!!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit"  color="secondary" variant="contained" style={{backgroundColor:"#0F23CE"}} >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
    </div>
  );
};


const checkoutSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  email: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
 
  password: yup.string().required("required"),
  
});
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  password: "",
  
};

export default Form;