import dbConnect from '@/utils/dbConnect';
import Youtube from '@/models/Youtube';

export default async function handler(req, res) {
  await dbConnect();
  const { url } = req.body;

  const findYoutube = await Youtube.findOne({});

  if (findYoutube) {
    console.log('Updating existing URL');
    await findYoutube.updateOne({ url });
    res.status(200).send({ done: true });
  } else {
    console.log('Creating new URL');
    await Youtube.create({ url });
    res.status(200).send({ done: true });
  }
}
