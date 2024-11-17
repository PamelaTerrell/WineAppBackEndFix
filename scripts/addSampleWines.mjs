

import mongoose from 'mongoose';
import Wine from './models/Wine.mjs';  // Adjust path based on where your Wine model is located
import connectDB from './db.mjs';      // Adjust path based on where your db.mjs file is located

// Sample wine data to insert into the database
const sampleWines = [
  {
    name: 'Cabernet Sauvignon',
    year: 2018,
    type: 'Red',
    rating: 4,
    description: 'A rich, bold red wine that pairs beautifully with beef dishes.',
    foodPairings: ['Beef', 'Pasta', 'Steak']
  },
  {
    name: 'Chardonnay',
    year: 2020,
    type: 'White',
    rating: 5,
    description: 'A crisp and refreshing white wine that pairs well with seafood.',
    foodPairings: ['Seafood', 'Chicken', 'Cheese']
  },
  {
    name: 'Merlot',
    year: 2019,
    type: 'Red',
    rating: 4,
    description: 'Smooth and mellow, perfect with grilled beef.',
    foodPairings: ['Beef', 'Chicken', 'Cheese']
  },
  {
    name: 'Sauvignon Blanc',
    year: 2021,
    type: 'White',
    rating: 4,
    description: 'A zesty and vibrant white wine, ideal for light seafood dishes.',
    foodPairings: ['Seafood', 'Pasta']
  }
];

// Function to add sample wines to the database
const addSampleWines = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Optional: Delete all existing wines before inserting sample data (uncomment if desired)
    // await Wine.deleteMany();

    // Insert the sample wines into the database
    const result = await Wine.insertMany(sampleWines);
    console.log(`Inserted ${result.length} sample wines into the database.`);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding sample wines:', error.message);
    mongoose.connection.close();
  }
};

// Run the function to add sample wines
addSampleWines();
