import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected");
        })

        connection.on("error", (error) => {
            console.log("MongoDB connection error, please make sure db is up and running: " + error);

            process.exit(1)
        })
    } catch (error) {
        console.log("Something went wrong in connection to DB");
        console.log(error);
    }
}