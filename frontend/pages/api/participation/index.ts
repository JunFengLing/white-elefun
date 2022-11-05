import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';


// GET/POST /api/participation
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const participations = await prisma.participation.findMany();
    res.status(200).json(participations);
  }

  if (req.method === 'POST') {
    const { campaignId, walletAddress, payloads } = req.body;
    const participation = await prisma.participation.createMany({
      data: payloads.map((payload: any) => ({
        campaign_id: campaignId,
        wallet_address: walletAddress,
        contract_address_before: payload.address,
        token_id_before: payload.tokenId
      }
    ))});
    res.status(200).json(participation);
  }
};