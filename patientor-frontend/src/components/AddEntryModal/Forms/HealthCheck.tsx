import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { HealthCheckRating, FormProps, EntryValues, Diagnose } from '../../../types';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  Box,
  SelectChangeEvent,
  Input,
} from '@mui/material';




const HealthEntry = ({ closeModal, onSubmit, diagnosisList }: FormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthRating, setHealthRating] = useState(HealthCheckRating.Healthy);
  const [codes, setCodes] = useState<string[]>([])

  interface Options {
    value: HealthCheckRating;
    label: string;
  }

  const ratingOptions: Options[] = Object.entries(HealthCheckRating)
    .filter(([key, value]) => isNaN(Number(key))) // Filter out numeric keys
    .map(([key, value]) => ({
      value: value as HealthCheckRating,
      label: key,
    }));
  

    const addEntry = (event: SyntheticEvent) => {
      event.preventDefault();
     
      const entry: EntryValues = {
        type: 'HealthCheck',
        description,
        date,
        specialist,
        healthCheckRating: healthRating,
        diagnosisCodes: codes
      
       };
       console.log('Sending request to the backend....',entry)
      onSubmit({ entry });
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
          <Input
            placeholder="Date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
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
          <InputLabel>Health Rating</InputLabel>
          <Select
            label="Health Rating"
            fullWidth
            size="small"
            value={healthRating}
            onChange={(event) =>
              setHealthRating(Number(event.target.value))
            }
          >
            {ratingOptions.map((r) => (
              <MenuItem key={r.label} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
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
              onClick={closeModal}
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

export default HealthEntry;
