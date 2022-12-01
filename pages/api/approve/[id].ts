// pages/api/approve/[id].ts

import prisma from '../../../lib/prisma';

// PUT /api/approve/:id
export default async function handle(req, res) {
  const weightId = req.query.id;
  const weight = await prisma.weight.update({
    where: { id: weightId },
    data: { approved: true },
  });
  res.json(weight);
}
