// pages/api/patient/[id].ts
import prisma from '../../../lib/prisma';

// DELETE /api/patient/:id
export default async function handle(req, res) {
  const userId = req.query.id;
  if (req.method === 'GET') {
    const patientProfile = await prisma.profile.findMany({
      where: { userId: userId },
    });
    res.json(patientProfile);
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}


// export default async function handler(req, res) {

//   const { _id } = req.query;
//   var query = { _id: ObjectId(_id) };

//   try {
//       // connect to the database
//       let { db } = await connectToDatabase();
//       // fetch the posts
//       let user = await db.collection('users').find(query).toArray();
//       // return the posts
//       return res.json(JSON.parse(JSON.stringify(user)));
//   } catch (error) {
//       // return the error
//       return res.json({
//           message: new Error(error).message,
//           success: false,
//       });
//   }
   
// }