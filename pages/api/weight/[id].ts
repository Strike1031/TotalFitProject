// pages/api/weight/[id].ts

import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req, res) {
  const weightId = req.query.id;
  if (req.method === 'GET') {
    const weight = await prisma.weight.findUnique({
      where: { id: weightId },
    });
    res.json(weight);
  }
  else if (req.method === 'DELETE') {
    const weight = await prisma.weight.delete({
      where: { id: weightId },
    });
    res.json(weight);
  } 
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
