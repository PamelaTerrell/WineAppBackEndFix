import express from 'express';
import Wine from '../models/Wine.mjs';

const router = express.Router();

// Create a new wine entry
router.post('/', async (req, res) => {
  try {
    const newWine = new Wine(req.body);
    await newWine.save();
    res.status(201).json(newWine);
  } catch (error) {
    res.status(400).json({ message: 'Error creating wine', error });
  }
});

// Get all wines
router.get('/', async (req, res) => {
  try {
    const wines = await Wine.find();
    res.status(200).json(wines);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching wines', error });
  }
});

// Get a specific wine by ID
router.get('/:id', async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (!wine) return res.status(404).json({ message: 'Wine not found' });
    res.status(200).json(wine);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching wine', error });
  }
});

// Update a wine entry
router.put('/:id', async (req, res) => {
  try {
    const updatedWine = await Wine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWine) return res.status(404).json({ message: 'Wine not found' });
    res.status(200).json(updatedWine);
  } catch (error) {
    res.status(400).json({ message: 'Error updating wine', error });
  }
});

// Delete a wine entry
router.delete('/:id', async (req, res) => {
  try {
    const deletedWine = await Wine.findByIdAndDelete(req.params.id);
    if (!deletedWine) return res.status(404).json({ message: 'Wine not found' });
    res.status(200).json({ message: 'Wine deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting wine', error });
  }
});

export default router;
