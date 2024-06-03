import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { its } = req.body;
        await dbConnect();

        const user = await User.findOneAndUpdate(
          { its },
          { isLoggedIn: false },
          { new: true }
        );

        if (!user) {
          return res.status(400).json({ success: false, message: 'No user found with this ITS.' });
        }

        return res.status(200).json({ success: true, message: 'User logged out successfully' });
        
      } catch (error) {
        return res.status(500).json({ success: false, error: 'Server Error' });
      }

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
