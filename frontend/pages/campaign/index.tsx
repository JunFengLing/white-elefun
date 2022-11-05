import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'


type IProps = {
  setSnackbarProps: any
};

const Campaign: NextPage<IProps> = ({ setSnackbarProps }) =>  {
  const [invitationCode, setInvitationCode] = useState("");

  const router = useRouter()

  const onSubmit = async () => {
    try {
      const res = await fetch(`/api/campaign?r=${ Math.random() }`);
      const campaigns = await res.json();
      const campaign = campaigns.find((_campaign: any) => (_campaign.type === 1) && (_campaign.id + '' === invitationCode));
      if (campaign) {
        router.push(`/campaign/${ campaign.id }/nft`);
      } else {
        setSnackbarProps({ open: true, severity: "error", text: "Campaign not exist!" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ py: 3 }}>
      <Paper elevation={ 3 } sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Create New Campaign
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
          quasi quidem quibusdam.
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={ () => { router.push('/campaign/create') } }
        >
          Start
        </Button>
      </Paper>
      <Paper elevation={ 3 } sx={{ mt: 3, p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Join Existing Campaign
        </Typography>
        <TextField
          required
          fullWidth
          id="invitation-code"
          label="Invitation Code"
          margin="normal"
          value={ invitationCode }
          onChange={ (e) => setInvitationCode(e.target.value) }
          InputProps={{ endAdornment:
            <Button
              variant="outlined"
              // color="secondary"
              disabled={ !invitationCode }
              onClick={ onSubmit }
            >
              Submit
            </Button>
          }}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={ () => { router.push('/campaign/join') } }
        >
          Public
        </Button>
      </Paper>
      <Paper elevation={ 3 } sx={{ mt: 3, p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Manage Campaign
        </Typography>
      </Paper>
   </Container>
  )
}

export default Campaign;