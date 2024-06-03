import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its } = req.query;
  await dbConnect();
  console.log('this is its', req.query)
  await User.findOneAndUpdate({ its: its }, { isLoggedIn: false, multipleLogin: false }, { new: true });

  res.status(200).json({ message: 'User logged out successfully' });
}
