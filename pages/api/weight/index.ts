// pages/api/weight/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/weight
export default async function handle(req, res) {
  
  const { dateTaken, measurement } = req.body;

  const session = await getSession({ req });
  const result = await prisma.weight.create({
    data: {
      dateTaken: dateTaken,
      measurement: measurement,
      patient: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}