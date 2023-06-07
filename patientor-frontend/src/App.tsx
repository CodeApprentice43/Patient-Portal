import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes,useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { apiBaseUrl } from "./constants";
import { Patient,Diagnose,HealthCheckRating } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails/PatientDetails";


const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses,setDiagnoses] = useState<Diagnose[]>([])
  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
      console.log(patients)
    };
    const fetchDiagnosisList = async  ()=> {
      const diagnosis = await diagnosisService.getAll()
      setDiagnoses(diagnosis)
    }
    void fetchPatientList();
    void fetchDiagnosisList();
    Object.values(HealthCheckRating).map(v=>console.log(v))
  }, []);
  
  const match = useMatch('/patients/:id')
  const patient = match?
  patients.find(patient=> patient.id === match.params.id):
  undefined

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path= "/patients/:id" element = {<PatientDetails patients = {patients} setPatients = {setPatients} patient={patient}
             diagnosisList={diagnoses}/>}/>
          </Routes>
        </Container>
    </div>
  );
};

export default App;
