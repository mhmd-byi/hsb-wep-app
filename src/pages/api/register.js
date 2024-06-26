import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { name, its, password = 'abc@123', email, phone, batch, role } = req.body;

  try {
    await dbConnect();
    
    const user = await User.create({
      its,
      name,
      email,
      phone,
      batch,
      role,
      password,
    });

    if (user) {
      res.status(200).send({ done: true, user: user });
    } else {
      res.status(401).send({ error: 'Invalid details' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
