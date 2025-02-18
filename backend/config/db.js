import mongoose from 'mongoose';

const uri = process.env.URI;

export default async() => {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected with database');
    } catch (error) {
        console.error(error);
    }

}

