import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  console.log('here')
  const { its, password } = req.body;
  await dbConnect();

  const user = await User.findOne({ its });

  if (!user) {
    return res.status(401).send({ error: 'Invalid ITS' });
  }

  if (user.password === password) {
    const token = user.generateAuthToken();
    return res.status(200).send({ token, user });
  }
}
