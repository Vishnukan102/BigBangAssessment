import FetchAllDoctors from "./FetchAllDoctors";
import NewPatient from "./NewPatient";
import FetchConsultedDoctors from "./FetchConsultedDoctors";
import ConsultedDoctors from "./ConsultedDoctors";
import FetchNotConsultedDoctors from "./FetchNotConsultedDoctors";
import NotConsultedDoctors from "./NotConsultedDoctors";
import { useState } from "react";
import  Button  from "@mui/material/Button";
function Doctor(){
    const[status,setstatus]=useState('');

    function viewActive(){
        setstatus("active");
        console.log("Inside viewactive function");
        

    }
    function viewInactive() {
        setstatus("inactive");
        
    }
    return(<div><br></br>
      <h1>Welcome {sessionStorage.getItem('decoded_token') && JSON.parse(sessionStorage.getItem('decoded_token')).Name}</h1>
        <Button variant="contained" color="success" onClick={viewActive}>
        View Active Doctors
    </Button><sp></sp>
    <Button variant="contained" color="error" onClick={viewInactive} style={{ marginLeft: '10px' }}>
     View Inactive Doctors
    </Button>
    {status === "active" && <FetchAllDoctors clickstatus={status}/>}
    {status === "inactive" && <FetchAllDoctors clickstatus={status}/>}
    {status === "active" && <FetchConsultedDoctors clickstatus={status}/>}
    {status === "inactive" && <FetchConsultedDoctors clickstatus={status}/>}
    {status === "active" && <FetchNotConsultedDoctors clickstatus={status}/>}
    {status === "inactive" && <FetchNotConsultedDoctors clickstatus={status}/>}
    </div>)
}

export default Doctor;