import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const connection = await mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connection successfull');
    });

    connection.on('error', (error) => {
      console.log('MongoDB connection failed');
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}
