import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';


// GET/POST /api/participation/[id]
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const participations = await prisma.participation.findMany({
      where: {
        campaign_id: Number(id)
      }
    });
    res.status(200).json(participations);
  }
};