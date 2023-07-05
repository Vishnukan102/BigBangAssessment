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



function DeleteDoctor(){
  const [error, setError] = useState(null);
  const handleDeleteDoctorSubmit = async (event) => {
   
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const delete_id = data.get("deleteid");
    const url = `https://localhost:7174/api/Admin/${delete_id}`;

    try {
      const token=sessionStorage.getItem('token');
      console.log("Inside try block");
      const response = await axios.delete(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Inside try block");
        toast.success("Doctor deleted successfully");
      }
    } catch (error) {
      // Handle any errors
      if (error.response && error.response.status === 400) {
        console.log("Doctor does not exist");
        toast.error("Doctor does not exist");
      }
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        toast.error("You do not have permission to delete a  doctor ");
      }
    }
  };

   return( 
    <div>
          {error && <Alert severity="error">{error}</Alert>}<Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="subtitle2"
            component="h3"
            sx={{ marginBottom: "10px" }}
          >
            Delete Doctor
          </Typography>

          <Box
            component="form"
            onSubmit={handleDeleteDoctorSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="deleteid"
              label="Doctor ID"
              name="deleteid"
              autoComplete="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete Doctor
            </Button>
          </Box>
        </Box>
        </div>
      )}


export default DeleteDoctor;