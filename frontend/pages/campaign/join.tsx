import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

  
const JoinCampaign: NextPage = () =>  {
  const [campaigns, setCampaigns] = useState<Array<any>>([]);
  
  const router = useRouter();

  const getCampaigns = async () => {
    try {
      const res = await fetch(`/api/campaign?r=${ Math.random() }`);
      const campaigns = await res.json();
      setCampaigns(campaigns);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <Container sx={{ py: 3 }}>
      <TableContainer component={ Paper }>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Start At</TableCell>
              <TableCell align="right">Due At</TableCell>
              <TableCell align="right">Participant</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { campaigns.map((campaign: any) => (
              <TableRow
                key={ campaign.id }
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  { campaign.name }
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  { campaign.type === 0 ? 'Public' : 'Private' }
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  { new Date(campaign.start_at).toLocaleDateString("en-US") }
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  { new Date(campaign.due_at).toLocaleDateString("en-US") }
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  { `${ campaign.participant } / ${ campaign.max_participant }` }
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Button
                    color="secondary"
                    onClick={ () => { router.push(`/campaign/${ campaign.id }/nft`) } }
                  >
                    Join
                  </Button>
                  <Button
                    color="secondary"
                    onClick={ () => { router.push(`/campaign/${ campaign.id }/detail`) } }
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper elevation={ 3 } sx={{ mt: 3, p: 3 }}>
        <Typography variant="subtitle1">
          { "Not Finding?" }
          <Button
            color="secondary"
            onClick={ () => { router.push('/campaign/create') } }
          >
            Create
          </Button>
        </Typography>
      </Paper>
    </Container>
  )
}

export default JoinCampaign