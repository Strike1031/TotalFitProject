// pages/api/profile/[id].ts

import prisma from '../../../lib/prisma';

// DELETE /api/profile/:id
export default async function handle(req, res) {
  const userId = req.query.id;
  if (req.method === 'GET') {
    const profile = await prisma.profile.findMany({
      where: { userId: userId },
    });
    res.json(profile);
  }
  else if (req.method === 'DELETE') {
    const profile = await prisma.profile.delete({
      where: { userId: userId },
    });
    res.json(profile);
  } 
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}