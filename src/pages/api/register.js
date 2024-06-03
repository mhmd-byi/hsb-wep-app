import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its, name, address, phone } = req.body;

  let newName = '';
  console.log('this is name', name)
  if (!name || name.length <= 1) {
    newName = 'null user'
  } else {
    newName = name;
  }

  try {
    await dbConnect();
    
    const user = await User.create({
      its,
      newName,
      address,
      phone,
    });

    if (user) {
      res.status(200).send({ done: true });
    } else {
      res.status(401).send({ error: 'Invalid details' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
