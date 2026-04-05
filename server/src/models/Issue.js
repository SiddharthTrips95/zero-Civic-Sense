import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `iss-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    reporter: { type: String, required: true },
    timestamp: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    upvotes: { type: Number, default: 0 },
    userVoted: { type: [String], enum: ['up', 'down'], default: [] },
    status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' },
    severity: { type: String, enum: ['low', 'medium', 'critical'], default: 'low' },
  },
  {
    timestamps: true, // creates createdAt and updatedAt
  }
);

// Map the Mongoose `_id` to `id` for frontend compatibility
issueSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Issue = mongoose.model('Issue', issueSchema);
