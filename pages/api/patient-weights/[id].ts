// pages/api/patient/[id].ts
import prisma from '../../../lib/prisma';

// DELETE /api/patient/:id
export default async function handle(req, res) {
  const patientId = req.query.id;
  if (req.method === 'GET') {
    const patientWeights = await prisma.weight.findMany({
      where: { patientId: patientId, approved: true },
    });
    res.json(patientWeights);
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