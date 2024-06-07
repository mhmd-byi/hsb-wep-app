import Subscription from "@/models/Subscription";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  const { its } = req.query;
  await dbConnect();
  const endDate = await Subscription.findOne({ its });
  if (!endDate) {
    res.status(200).json({ exists: false });
    return;
  }
  res.status(200).json({ endDate: endDate.subscriptionStartDate });
}
