// pages/api/profile/index.ts
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/profile
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  if (req.method === 'GET') {
    const user = await prisma.profile.findMany();
    res.json(user);
  }
  else if(req.method === 'POST') {
    const { name, email, phoneNumber, address, role, bio, image } = req.body;

    const session = await getSession({ req });
    const result = await prisma.profile.create({
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        role: role,
        bio: bio,
        image: image,
        user: { 
          connect: { email: session?.user?.email },
      },
      },
    });
    res.json(result);
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
  
}