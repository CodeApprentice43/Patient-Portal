import { SyntheticEvent, useState } from 'react';
import { TextField, Grid, Button, Box, Input, InputLabel, Select, MenuItem } from '@mui/material';
import { EntryValues, FormProps } from '../../../types';

const HospitalEntryForm = ({ closeModal,onSubmit,diagnosisList }: FormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [codes, setCodes] = useState<string[]>([])

  const onCancel = () => {
    closeModal();
  };

  const addEntry = (event:SyntheticEvent)=>{
    event.preventDefault()
    const entry:EntryValues = {
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes: codes,
      discharge:{
        criteria:dischargeCriteria,
        date:dischargeDate
      }
      
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
          <Input placeholder='Date' type='date' value={date} onChange={(event)=>setDate(event.target.value)}/>
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
        <Box marginBottom={2} marginLeft={1.5}>
          <InputLabel>Discharge Date</InputLabel>
          <Input placeholder='Date' type='date' value={dischargeDate} onChange={(event)=>setDischargeDate(event.target.value)}/>
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Discharge Criteria"
            fullWidth
            size="small"
            value={dischargeCriteria}
            onChange={(event) => setDischargeCriteria(event.target.value)}
          />
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

export default HospitalEntryForm;
