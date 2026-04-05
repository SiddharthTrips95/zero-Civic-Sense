import mongoose from 'mongoose';

const officialSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    ward: { type: String, required: true },
    photoUrl: { type: String, default: '' },
    trustScore: { type: Number, default: 0 },
    responseRate: { type: Number, default: 0 },
    resolutionRate: { type: Number, default: 0 },
    weeklyResolved: { type: Number, default: 0 },
    bio: { type: String, default: '' },
    role: { type: String },
    party: { type: String },
    phone: { type: String },
    email: { type: String },
    since: { type: Date },
  },
  {
    timestamps: true,
  }
);

officialSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Official = mongoose.model('Official', officialSchema);
