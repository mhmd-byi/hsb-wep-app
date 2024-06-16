import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its } = req.query;
  await dbConnect();
  await User.findOneAndUpdate({ its: its }, { new: true });

  res.status(200).json({ message: 'User logged out successfully' });
}
