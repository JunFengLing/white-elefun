import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';


// GET /api/campaign/[id]
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const campaign = await prisma.campaign.findMany({
      where: {
        id: Number(id)
      }
    });
    res.status(200).json(campaign);
  }
};