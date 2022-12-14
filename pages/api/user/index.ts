// pages/api/weight/[id].ts

import prisma from '../../../lib/prisma';

// DELETE /api/user/:id
export default async function handle(req, res) {
  const userId = req.query.id;
  if (req.method === 'GET') {
    const user = await prisma.user.findMany();
    res.json(user);
  }
  else if (req.method === 'DELETE') {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    res.json(user);
  } 
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}