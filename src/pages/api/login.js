import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its } = req.body;
  await dbConnect();

  const user = await User.findOne({ its });

  if (!user) {
    return res.status(401).send({ error: 'Invalid ITS' });
  }

  if (user.isLoggedIn && user.userRole === 'user') {
    return res.status(200).send({ status: 'Already logged in' });
  }

  user.isLoggedIn = true;
  await user.save();

  res.status(200).send({ user });
}
