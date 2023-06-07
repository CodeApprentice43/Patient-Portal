import { Patient, Diagnose, Entry,EntryValues } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Code, Work } from "@mui/icons-material";
import { useState } from "react";
import { Alert, Button } from '@mui/material'
import EntryModal from "../AddEntryModal";
import axios, { Axios } from "axios";
import { apiBaseUrl } from "../../constants";
import diagnosis from "../../services/diagnosis";


interface Props {
  diagnosisList: Diagnose[];
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

const getIcon = ({ entry }: { entry: Entry }): JSX.Element => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthAndSafetyIcon />;

    case 'Hospital':
      return <LocalHospitalIcon />;

    case 'OccupationalHealthcare':
      return <Work />;

    default:
      assertNever(entry);
  }
}

const EntryDetails = ({ entry, diagnosisDescription }: { entry: Entry, diagnosisDescription: (code: string) => string }) => {
  const icon = getIcon({ entry });
  
  const renderEntry = ()=> {
    return (
      <div>
        {entry.date} {icon}
        <br/>
        <br/>

         <i>{entry.description}</i> 
        <br/>
        <br/>

       diagnosed by {entry.specialist}
       {entry.diagnosisCodes?
       (
        <>
        <ul>
          {entry.diagnosisCodes.map(c=>(
            <li><strong>{c}</strong> {diagnosisDescription(c)}</li>
          ))}
        </ul>
        </>
       ):(<>
       
       </>)
      }

       </div>
    )
  }
  switch(entry.type)
  {
    case 'HealthCheck':
      return (
        <div key={entry.id} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
        {renderEntry()}
        </div>
      )
    
    case 'Hospital':
      return (
        <div key={entry.id} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
        {renderEntry()}
        <h3><i>Discharge Information</i></h3>
        <strong>criteria:</strong> {entry.discharge.criteria}
        <br></br>
        <strong>Date:</strong> {entry.discharge.date}
        </div>
      )
      
    case 'OccupationalHealthcare':
      return(
        <div key={entry.id} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
        {renderEntry()}
        Employer: <strong>{entry.employerName}</strong>
        <br/>
        <br/>

        {entry.sickLeave? (
          <>
          <strong>Sick Leave:</strong>
          <br/>
          [
          Start date: {entry.sickLeave.startDate}
          <br/>
          End date : {entry.sickLeave.endDate}
          ]
          </>

        ): (
          null
        )}
        </div>
       )
      }
};

interface Props{
  patients: Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  patient: Patient | undefined,
  diagnosisList:Diagnose[]
}
const PatientDetails = ({patients,setPatients, patient, diagnosisList }: Props) => {
  const [modalOpen, setModal] = useState<boolean>(false); //controls the visibility of the entry forms 
  const [success,setSuccess] = useState('')
  const [error,setError] = useState('')

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const diagnosisDescription = (code: string): string => {
    const diagnosis = diagnosisList.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : 'Not found';
  };
  

  const submitNewEntry = async ({entry}:{entry:EntryValues})=>
  {
    try{
      if(patient){
      const newEntry = await axios.post(`${apiBaseUrl}/patients/${patient.id}/entries`,entry)
      console.log(newEntry.data)
      setPatients(patients.map(p=>p.id===patient.id?
        {...p,entries:p.entries.concat(newEntry.data)}:p)
      
      )
      setSuccess(`Added a new ${newEntry.data.type} entry successfully`)
      setTimeout(()=>setSuccess(''),5000)
      }
      closeModal()
      
    }catch(error)
    {
      if(axios.isAxiosError(error))
      {
        setError(error.response?.data)
        setTimeout(()=>setError(''),5000)

      }
     else{
      setError('Unknown error has  occured')
      setTimeout(()=>setError(''),5000)

     }
     closeModal()
    }
     
  }
  if (patient === undefined) {
    return (
      <div>
        <h1>Patient not found</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          {patient.name}{" "}
          {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <EntryModal onSubmit = {submitNewEntry} modalOpen={modalOpen} closeModal={closeModal} />
        <br />
        <p><strong>entries</strong></p>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        {patient.entries.length > 0 ? (
          patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnosisDescription={diagnosisDescription} />
          ))
        ) : (
            <p>No entries found</p>
          )}
        {!modalOpen && <Button onClick={() => openModal()} variant="contained" color="secondary">Add Entry</Button>}
      </div>
    );
  }
};

export default PatientDetails;
