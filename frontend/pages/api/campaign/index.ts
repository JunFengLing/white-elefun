import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';


// GET/POST /api/campaign
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const statistics = await prisma.participation.groupBy({
      by: ["campaign_id"],
      _count: { "id": true }
    });
    let campaigns = await prisma.campaign.findMany();
    campaigns = campaigns.map((campaign: any) => {
      const statistic = statistics.find((_statistic: any) => _statistic.campaign_id === campaign.id);
      return {
        ...campaign,
        participant: statistic ? statistic._count.id : 0
      }
    });
    res.status(200).json(campaigns);
  }

  if (req.method === 'POST') {
    const { name, type, maxParticipant, startAt, dueAt } = req.body;
    const campaign = await prisma.campaign.create({
      data: {
        name,
        type,
        max_participant: maxParticipant,
        start_at: startAt,
        due_at: dueAt
      },
    });
    res.status(200).json(campaign);
  }
};