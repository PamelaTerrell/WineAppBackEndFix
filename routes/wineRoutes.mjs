import express from 'express';
import Wine from '../models/Wine.mjs';

const router = express.Router();

// Create a new wine
router.post('/', async (req, res) => {
  try {
    const { name, year, type, rating, description, foodPairings } = req.body;
    const newWine = new Wine({ name, year, type, rating, description, foodPairings });
    await newWine.save();
    res.status(201).json(newWine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all wines
router.get('/', async (req, res) => {
  try {
    const wines = await Wine.find();
    res.status(200).json(wines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a wine
router.put('/:id', async (req, res) => {
  try {
    const { name, year, type, rating, description, foodPairings } = req.body;
    const updatedWine = await Wine.findByIdAndUpdate(
      req.params.id,
      { name, year, type, rating, description, foodPairings },
      { new: true }
    );
    res.status(200).json(updatedWine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific wine
router.get('/:id', async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    res.status(200).json(wine);
  } catch (error) {
    res.status(404).json({ message: 'Wine not found' });
  }
});

// Delete a wine
router.delete('/:id', async (req, res) => {
  try {
    await Wine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Wine deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// New route for pairing wines with food
router.get('/pairings', async (req, res) => {
  const { food } = req.query;  // Get the 'food' query parameter from the URL

  // Check if the food query parameter is provided
  if (!food) {
    return res.status(400).json({ message: 'Food query parameter is required' });
  }

  try {
    // Normalize the food input for case-insensitive matching
    const normalizedFood = food.trim().toLowerCase();

    console.log(`Food received for pairing: ${normalizedFood}`);  // Debugging line

    // Find wines that pair with the given food
    const wines = await Wine.find({ 
      foodPairings: { 
        $in: [normalizedFood] 
      } 
    });

    if (wines.length === 0) {
      return res.status(404).json({ message: `No wines found for pairing with ${food}. Try another food or add wines to the database!` });
    }

    res.status(200).json(wines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
