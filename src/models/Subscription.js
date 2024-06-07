import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  its: { type: Number, required: true },
  subscriptionStartDate: { type: Date, required: true },
  subscriptionEndDate: { type: Date, required: true }
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
