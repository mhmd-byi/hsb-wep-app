// api/login.js
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its, password } = req.body;
  await dbConnect();

  const user = await User.findOne({ its });

  if (!user) {
    return res.status(401).send({ error: 'Invalid ITS' });
  }

  if (user.password === password) {
    if (user.role === 'admin') {
      const token = user.generateAuthToken();
      return res.status(200).send({ token, user });
    } else {
      return res.status(401).send({ error: `You are not authorized to log in.` });
    }
  } else {
    return res.status(401).send({ error: 'Incorrect ITS or password' });
  }
}