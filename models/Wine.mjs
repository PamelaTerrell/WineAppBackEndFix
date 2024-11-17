// src/models/Wine.js
import mongoose from 'mongoose';

const wineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String },
  foodPairings: { type: [String], required: true }  // Array of food pairings
});

const Wine = mongoose.model('Wine', wineSchema);

export default Wine;
