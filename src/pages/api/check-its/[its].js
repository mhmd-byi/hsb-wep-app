import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  const { its } = req.query;
  await dbConnect();
  console.log('this is its', req.query);
  const user = await User.findOne({ its });
  console.log('this is user', user);
  if (!user) {
    res.status(200).json({ exists: false });
    return;
  }
  res.status(200).json({ exists: true });
}
