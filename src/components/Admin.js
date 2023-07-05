import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <Box>
      <br />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        Admin's Page
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              borderRight: "1px solid #ccc",
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "10px" }}
            >
              Doctor
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              component={Link}
              to="/add-doctor"
            >
              Add a Doctor
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              component={Link}
              to="/delete-doctor"
            >
              Delete a Doctor
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              component={Link}
              to="/update-doctor"
            >
              Update Doctor
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              component={Link}
              to="/getall-doctor"
            >
              Show Doctor Details
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              component={Link}
              to="/get-doctor-id"
            >
              Get Doctor Detail by ID
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              component={Link}
              to="/activate-doctor"
            >
              Activate Doctor
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginBottom: "10px" }}
              component={Link}
              to="/deactivate-doctor"
            >
              Deactivate Doctor
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box>
            <CardContent>
              <Typography variant="body1">
                Certainly! Here's the welcome page description for the admin:
                Welcome, Admin! As an admin, you have access to the following
                options on this page: Add a new doctor to the system, delete a
                doctor from the system, update information of existing doctors,
                view details of all doctors, get details of a specific doctor by
                their ID, activate or deactivate a doctor's account. Feel free
                to customize the text or layout as per your requirements.
              </Typography><br></br>
              <Typography variant="body1">
                Certainly! Here's the welcome page description for the admin:
                Welcome, Admin! As an admin, you have access to the following
                options on this page: Add a new doctor to the system, delete a
                doctor from the system, update information of existing doctors,
                view details of all doctors, get details of a specific doctor by
                their ID, activate or deactivate a doctor's account. Feel free
                to customize the text or layout as per your requirements.
              </Typography><br></br>
              <Typography variant="body1">
               Hello !! Here's the welcome page description for the admin:
                Welcome, Admin! As an admin, you have access to the following
                options on this page: Add a new doctor to the system, delete a
                doctor from the system, update information of existing doctors,
                view details of all doctors, get details of a specific doctor by
                their ID, activate or deactivate a doctor's account. Feel free
                to customize the text or layout as per your requirements.
              </Typography>
             
            </CardContent>
          </Box>
        </Grid>
      </Grid>
     
    </Box>
  );
}

export default Admin;
