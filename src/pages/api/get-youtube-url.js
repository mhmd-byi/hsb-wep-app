import dbConnect from '@/utils/dbConnect';
import Youtube from '@/models/Youtube';

export default async function handler(req, res) {
  await dbConnect();

  const url = await Youtube.findOne({});

  res.status(200).json(url);
}
