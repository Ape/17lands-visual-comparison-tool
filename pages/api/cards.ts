import type { NextApiRequest, NextApiResponse } from 'next';
import { getCardData } from '../../network/features/comparison/getCardData';

interface Filters {
  colors: string[];
  expansions: string[];
  formats: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse<Filters>) => {
  if (req.method !== 'GET') {
    return res.status(405).end('Method not allowed');
  }

  const cardData = await getCardData(req.query as any);

  res.status(200).json(cardData);
};
