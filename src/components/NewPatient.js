import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FetchAllDoctors from './FetchAllDoctors';
import { useState } from 'react';


const NewPatient = ({ parse_doctor,onConsultClick,passstatus}) => {
    const [isConsulted, setIsConsulted] = useState(false);
    console.log(parse_doctor);
    console.log(passstatus);
    console.log(parse_doctor.isActive);
  const bull = (
    <span style={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
      •
    </span>
  );
 
  const handleConsultClick = () => {
   
    // Invoke the provided onConsultClick function and pass the doctor ID
    onConsultClick(parse_doctor.doctorId);
    setIsConsulted(true);
  };
  if(passstatus == 'active'){
    if(parse_doctor.isActive == true){
      
  return (
    
    <div>
      <br></br>
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          All Doctor Details
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" component="div" style={{ marginRight: '5px' }}>
          {parse_doctor.firstName} {parse_doctor.lastName} 
        </Typography>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'green' }}></div>
        </div>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Contact Number: {parse_doctor.contactNumber}
        </Typography>
        <Typography variant="body2">
          E-Mail: {parse_doctor.email}
          <br />
          Specialization: {parse_doctor.specialization}
        </Typography>
        <Typography variant="body2">
          Experience: {parse_doctor.experience}
          <br />
          Hospital: {parse_doctor.hospital}
        </Typography>
        <Typography variant="body2">
          Qualification: {parse_doctor.qualification}
          <br/>
        </Typography>
        
        <Button variant="contained" color="success" size="small" onClick={handleConsultClick} disabled={isConsulted}>
        {isConsulted ? 'Consulted' : 'Consult'}
        </Button>
      </CardContent>
      
    </Card>
    </div>
  );
}
}
if(passstatus == 'inactive'){
  if(parse_doctor.isActive == false){

  return (
    
    <div>
      <br></br>
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          All Doctor Details
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" component="div" style={{ marginRight: '5px' }}>
          {parse_doctor.firstName} {parse_doctor.lastName} 
        </Typography>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red' }}></div>
        </div>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Contact Number: {parse_doctor.contactNumber}
        </Typography>
        <Typography variant="body2">
          E-Mail: {parse_doctor.email}
          <br />
          Specialization: {parse_doctor.specialization}
        </Typography>
        <Typography variant="body2">
          Experience: {parse_doctor.experience}
          <br />
          Hospital: {parse_doctor.hospital}
        </Typography>
        <Typography variant="body2">
          Qualification: {parse_doctor.qualification}
          <br/>
        </Typography>
        
        <Button variant="contained" color="success" size="small" onClick={handleConsultClick} disabled={isConsulted}>
        {isConsulted ? 'Consulted' : 'Consult'}
        </Button>
      </CardContent>
      
    </Card>
    </div>
  );

}
}
}

export default NewPatient;
