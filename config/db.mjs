import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;  // Use process.env.MONGO_URI instead of mongoURI
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);  // Exit process with failure
  }
};

export default connectDB;
