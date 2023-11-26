import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
       const connMongoDB = await mongoose.connect(process.env.CONNECTION_URI);
        console.log(`MongoDB Connected: ${connMongoDB.connection.host}`.cyan.underline);
    } catch (err) {
        console.error(err);
    }
};

export default connectToDB;
