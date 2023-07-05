import React from 'react';
import doctorImage from '../images/doc.jpeg';
import patientImage from '../images/Hospital_AI.png';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Doctor-Patient Website
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={doctorImage}
              alt="Doctor"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                For Doctors
              </Typography>
              <Typography variant="body1">
               
Welcome to our Doctor-Patient website! As a doctor, you have the ability to access and view patient information securely. Gain valuable insights into your patients' medical history, appointments, and treatment plans. Stay informed and provide personalized care by easily navigating through patient records. Enhance your practice and streamline your workflow with our user-friendly platform designed exclusively for doctors.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={patientImage}
              alt="Patient"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                For Patients
              </Typography>
              <Typography variant="body1">
              As a new patient, you have the ability to view all available doctors and their respective statuses (active or inactive). You can easily consult any doctor of your choice from the list.

If you're an existing patient, you can not only view the doctors but also see which doctors you have already consulted and those you haven't. This helps you keep track of your previous consultations.

Take advantage of our comprehensive system to find the right doctor.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
