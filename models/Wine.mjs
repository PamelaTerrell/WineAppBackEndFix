import mongoose from 'mongoose';

const wineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,  // E.g., "Red", "White", "Sparkling"
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Wine = mongoose.model('Wine', wineSchema);

export default Wine;
