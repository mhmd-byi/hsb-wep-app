import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  const { its } = req.query;
  await dbConnect();
  const user = await User.findOne({ its });
  if (!user) {
    res.status(200).json({ exists: false });
    return;
  }
  res.status(200).json({ user: user });
}
