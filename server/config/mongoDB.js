import mongoose from "mongoose";

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI)
        console.log('Successfully connected to MongoDB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default db