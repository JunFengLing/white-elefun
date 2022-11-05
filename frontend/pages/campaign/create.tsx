import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';


type IProps = {
  setSnackbarProps: any
};
  
const CreateCampaign: NextPage<IProps> = ({ setSnackbarProps }) =>  {
  const [name, setName] = useState("");
  const [type, setType] = useState(0);
  const [maxParticipant, setMaxParticipant] = useState(10);
  const [startAt, setStartAt] = useState<string | null>(null);
  const [dueAt, setDueAt] = useState<string | null>(null);

  const router = useRouter();

  const createCampaign = async () => {
    try {
      const res = await fetch('/api/campaign', {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          name,
          maxParticipant,
          type,
          startAt,
          dueAt
        })
      });
      const campaign = await res.json();
      console.log(campaign);
      setSnackbarProps({ open: true, severity: "success", text: "Create Campaign Successfully!" });
      router.push('/campaign/join');
    } catch (err) {
    }
  };
  
  return (
    <Container sx={{ py: 3 }}>
      <Paper elevation={ 3 } sx={{ p: 3 }}>
        <TextField
          required
          fullWidth
          id="name"
          label="Name"
          margin="normal"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Max Participant</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="max-participant"
            value={ maxParticipant }
            label="Max Participant"
            onChange={ (e) => setMaxParticipant(Number(e.target.value)) }
          >
            { [10, 20, 30, 40 ,50].map((item, index) => <MenuItem key={ index } value={ item }>{ item }</MenuItem>) }
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ type }
            label="Age"
            onChange={ (e) => setType(Number(e.target.value)) }
          >
            <MenuItem value={ 0 }>Public</MenuItem>
            <MenuItem value={ 1 }>Private</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start At"
              inputFormat="MM/DD/YYYY"
              value={ startAt }
              onChange={(value) => setStartAt(value)}
              renderInput={ (params) => (
                <TextField { ...params } fullWidth />
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Due At"
              inputFormat="MM/DD/YYYY"
              value={ dueAt }
              onChange={(value) => setDueAt(value)}
              renderInput={ (params) => (
                <TextField { ...params } fullWidth />
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <Button
          variant="outlined"
          color="secondary"
          disabled={ !(name && startAt && dueAt) }
          onClick={ createCampaign }
        >
          Submit
        </Button>
      </Paper>
    </Container>
  )
}

export default CreateCampaign