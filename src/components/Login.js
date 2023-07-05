import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Doctor Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function NavigateToPageBasedOnRole(token,navigate) {
  
      console.log("Inside navigate function");
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('decoded_token', JSON.stringify(decodedToken));
   
      if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Doctor') {
          navigate('/displaypatient');
      }
      if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Patient') {
        navigate('/displaydoctor');
      }
      if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Admin') {
        navigate('/admin');
      }
        
      };



const defaultTheme = createTheme();

 function Login() {
  const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
  const isFormValid = () => {
    if (
     
      emailValid &&
      passwordValid 
    ) {
      return true;
    }
    return false;
  };
  const validateEmail = (value) => {
   
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  };

  const validatePassword = (value) => {
   
    const regex = /^.{6,}$/;
    return regex.test(value);
  };
    const [error_message,setError]=useState('');
    
    const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    
    const url = 'https://localhost:7174/api/Token';
    const data_token = {
      
        userId: 0,
        userFirstName: "string",
        userLastName: "string",
        userEmail: data.get('email'),
        password: data.get('password'),
        role: "string",
        contactNumber: "string",
        gender: "string",
        address: "string",
        reason: "string",
        qualification: "string",
        specialization: "string",
        experience: "string",
        hospital: "string"
      
      };
      try {
        console.log("Inside try block");
        const response = await axios.post(url,data_token);
        const token = response.data.token;
        toast.success("Login Successful");
     
        NavigateToPageBasedOnRole(token,navigate);
      } catch (error) {
        
        if (error.response && error.response.status === 400) {
          
            toast.error('Invalid credentials. Please try again.'); 
          } else {
           
            console.log(error);
            toast.error('An error occured. Please try again'); 
          }
      }

      
    };
       
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmailValid(validateEmail(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!emailValid && "Please enter a valid e-mail"}
            </div>
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPasswordValid(validatePassword(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!passwordValid && "Password must be atleast 6 characters"}
            </div>
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid()}
            >
              Sign In
            </Button>
            {error_message && <div className="error-message">{error_message}</div>}
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register here."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;