import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';


// GET/POST /api/swap
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {

    res.status(200).json({});
  }

  if (req.method === 'POST') {

  }
};