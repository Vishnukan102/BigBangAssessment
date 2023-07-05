import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  CardContent,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import Card from "@mui/material/Card";

function AddDoctor(){
  const [firstnameValid, setFirstnameValid] = useState(false);
  const [lastnameValid, setLastnameValid] = useState(false);
  const [phonenumberValid, setPhonenumberValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [qualificationValid, setQualificationValid] = useState(false);
  const [specializationValid, setSpecializationValid] = useState(false);
  const [experienceValid, setExperienceValid] = useState(false);
  const [hospitalValid, setHospitalValid] = useState(false);
    const [error, setError] = useState(null);
    const handleAddDoctorSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const token=sessionStorage.getItem('token');
        console.log(token);
        const url = "https://localhost:7174/api/Admin";
        const data_token = {
          userId: 0,
          userFirstName: data.get("firstname"),
          userLastName: data.get("lastname"),
          userEmail: data.get("email"),
          password: data.get("password"),
          role: "Doctor",
          contactNumber: data.get("Phonenumber"),
          gender: null,
          address: null,
          reason: null,
          qualification: data.get("qualification"),
          specialization: data.get("specialization"),
          experience: data.get("experience"),
          hospital: data.get("hospital"),
        };
        try {
          console.log("Inside try block");
          console.log(data_token);
          const response = await axios.post(url, data_token,{
            headers: {
              'Authorization': `Bearer ${token}`,
            }
            });
          if (response.status === 200) {
            toast.success("Doctor added successfully");
          }
        } catch (error) {
          
          if (error.response && error.response.status === 400) {
            toast.error("Doctor already exists");
          }
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            toast.error("You do not have permission to view the doctor details");
          }
        }
      };
      const validateFirstname = (value) => {
    
        const regex = /^[A-Za-z]{2,}$/;
        return regex.test(value);
      };
    
      const validateLastname = (value) => {
       
        const regex = /^[A-Za-z]{2,}$/;
        return regex.test(value);
      };
    
      const validatePhonenumber = (value) => {
      
        const regex = /^\d{10}$/;
        return regex.test(value);
      };
    
      const validateEmail = (value) => {
       
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value);
      };
    
      const validatePassword = (value) => {
       
        const regex = /^.{6,}$/;
        return regex.test(value);
      };
    
      const validateQualification = (value) => {
        
        const regex = /^[A-Za-z]{2,}$/;
        return regex.test(value);
      };
    
      const validateSpecialization = (value) => {
       
        const regex = /^[A-Za-z]{2,}$/;
        return regex.test(value);
      };
    
      const validateExperience = (value) => {
       
        const regex = /^[A-Za-z0-9 ]{2,}$/;
        return regex.test(value);
      };
    
      const validateHospital = (value) => {
       
        const regex = /^[A-Za-z]{2,}$/;
        return regex.test(value);
      };
      const isFormValid = () => {
        if (
          firstnameValid &&
          lastnameValid &&
          emailValid &&
          passwordValid &&
          qualificationValid &&
          specializationValid &&
          experienceValid &&
          hospitalValid&&phonenumberValid
        ) {
          return true;
        }
        return false;
      };
    
    return(
        <div>
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="subtitle2"
            component="h3"
            sx={{ marginBottom: "10px" }}
          >
            Add Doctor
          </Typography>

          <Box
            component="form"
            onSubmit={handleAddDoctorSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="name"
              autoFocus
              onChange={(e) => {
                setFirstnameValid(validateFirstname(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!firstnameValid && "First Name must be atleast 2 characters"}
            </div>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              autoFocus
              onChange={(e) => {
                setLastnameValid(validateLastname(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!lastnameValid && "Last Name must be atleast 2 characters"}
            </div>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="Phonenumber"
              label="Phone Number"
              name="Phonenumber"
              autoComplete="Phonenumber"
              autoFocus
              onChange={(e) => {
                setPhonenumberValid(validatePhonenumber(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!phonenumberValid && "Phone number should be 10 digits"}
            </div>
            
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
              {!emailValid && "Enter a valid E-Mail"}
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
              {!passwordValid && "Password must be atleast 2 characters"}
            </div>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="qualification"
              label="Qualification"
              name="qualification"
              autoComplete="qualification"
              autoFocus
              onChange={(e) => {
                setQualificationValid(validateQualification(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!qualificationValid && "Qualification must be atleast 2 characters"}
            </div>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="specialization"
              label="Specialization"
              name="specialization"
              autoComplete="specialization"
              autoFocus
              onChange={(e) => {
                setSpecializationValid(validateSpecialization(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!specializationValid && "Specialization  must be atleast 2 characters"}
            </div>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="experience"
              label="Experience"
              name="experience"
              autoComplete="experience"
              autoFocus
              onChange={(e) => {
                setExperienceValid(validateExperience(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!experienceValid && "Experience must be atleast 2 characters"}
            </div>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="hospital"
              label="Hospital"
              name="hospital"
              autoComplete="Hospital"
              autoFocus
              onChange={(e) => {
                setHospitalValid(validateHospital(e.target.value));
              }}
            />
            <div style={{ color: "red" }}>
              {!hospitalValid && "Hospital  must be atleast 2 characters"}
            </div>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid()}
            >
              Add Doctor
            </Button>
          </Box>
        </Box>
        </div>
      )}



export default AddDoctor;