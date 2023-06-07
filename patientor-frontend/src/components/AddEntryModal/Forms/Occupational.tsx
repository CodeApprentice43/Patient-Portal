import { SyntheticEvent, useState } from 'react';
import { TextField, Grid, Button, Box, InputLabel,Input, Select, MenuItem } from '@mui/material';
import { EntryValues, FormProps } from '../../../types';


const OccupationalEntryForm = ({ closeModal,onSubmit,diagnosisList }: FormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [codes, setCodes] = useState<string[]>([])

  const onCancel = () => {
    closeModal();
  };

  const addEntry = (event:SyntheticEvent)=>{
    event.preventDefault()
    const entry:EntryValues = {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName,
      sickLeave: {
        startDate: startDate,
        endDate: endDate
      },
      diagnosisCodes: codes
    }
    onSubmit({entry})
  
   }


  return (
    <div style={{ border: '2px dotted black', padding: '16px' }}>
      <form onSubmit={addEntry}>
        <Box marginBottom={2}>
          <TextField
            label="Description"
            fullWidth
            size="small"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Box>
        <Box marginBottom={2} marginLeft={1.5}>
          <InputLabel>Date</InputLabel>
          <Input type='date' value={date} onChange={(event)=>setDate(event.target.value)}/>
  
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Specialist"
            fullWidth
            size="small"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
          />
        </Box>
        
        <Box marginBottom={2}>
      
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Employer Name"
            fullWidth
            size="small"
            value={employerName}
            onChange={(event) => setEmployerName(event.target.value)}
          />
        </Box>
        <Box marginBottom={2} marginLeft={1.5}>
          <InputLabel>Sickleave</InputLabel>
          <br/>
          <InputLabel>start</InputLabel>
          <Input type='date' value={startDate} onChange={(event)=>setStartDate(event.target.value)}/>
          <InputLabel>end</InputLabel>
          <Input type='date' value={endDate} onChange={(event)=>setEndDate(event.target.value)}/>
        </Box>

        <Box marginBottom={2}>
        <InputLabel>Diagnosis Codes</InputLabel>

  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    multiple // Enable multiple selection
    value={codes}
    onChange={(e) => setCodes(e.target.value as string[])} // Cast the value to string[]
    fullWidth
  >
    {diagnosisList.map((d) => (
      <MenuItem key={d.code} value={d.code}>
        {d.code}
      </MenuItem>
    ))}
  </Select>
</Box>

        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default OccupationalEntryForm;
