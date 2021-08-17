import type { NextApiRequest, NextApiResponse } from 'next';
import { getFilters } from '../../network/features/comparison/getFilters';

interface Filters {
  colors: string[];
  expansions: string[];
  formats: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse<Filters>) => {
  if (req.method !== 'GET') {
    return res.status(405).end('Method not allowed');
  }

  const filters = await getFilters();

  res.status(200).json(filters);
};
