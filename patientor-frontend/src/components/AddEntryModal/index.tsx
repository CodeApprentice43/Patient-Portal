import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import  { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import {  EntryTypes,EntryValues } from '../../types';
import RenderForm from './RenderForm'
interface Props {
  modalOpen: boolean;
  closeModal: () => void;
  onSubmit :({entry}:{entry:EntryValues})=>void
}

interface EntryOption {
  value: EntryTypes;
  label: string;
  
}


const EntryModal = ({ modalOpen, closeModal,onSubmit }: Props) => {
  const [entryType, setEntry] = useState<EntryTypes>(EntryTypes.Hospital);

  const entryOptions: EntryOption[] = Object.values(EntryTypes).map((v) => ({
    value: v,
    label: v.toString(),
  }));
  
  const handleEntryType = (event: SelectChangeEvent<EntryTypes>) => {
    event.preventDefault();
    const val = event.target.value;
    const type = Object.values(EntryTypes).find((e) => e.toString() === val);
    if (type) {
      setEntry(type);
    }
  };

  return modalOpen ? (
    <div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={entryType}
        onChange={handleEntryType}
        row

      >
        {entryOptions.map((e) => (
          <FormControlLabel
            key={e.label}
            value={e.value}
            control={<Radio />}
            label={e.label}
            
          />
        ))}
      </RadioGroup>
    <RenderForm formType={entryType} onSubmit={onSubmit} closeModal={closeModal}/>
    </div>
  ) : null;
};

export default EntryModal;
