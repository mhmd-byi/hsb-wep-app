import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its } = req.body;
  await dbConnect();
  await User.findOneAndUpdate(
    { its },
    { isLoggedIn: false },
    { new: true }
  );

  return res.status(200).json({ success: true, message: 'User logged out successfully' });
}
