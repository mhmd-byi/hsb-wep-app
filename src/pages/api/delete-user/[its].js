import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its } = req.query;
  await dbConnect();
  await User.deleteOne({ its });

  res.status(200).json({ message: 'User removed successfully' });
}
