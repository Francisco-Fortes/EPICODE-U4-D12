import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import blogsRouter from "./api/blogs/index.js";

const server = express();
const port = process.env.PORT || 3001;
//if process.env.PORT does not work, we will use 3001

//Middlewares
server.use(cors());
server.use(express.json());

//Endpoints
server.use("/blogs", blogsRouter);

//ErrorHandlers

mongoose.set("strictQuery", false);
//Why we are using this?
mongoose.connect(process.env.MONGO_CONNECTION_STRING);
//It only takes one parameter, the connection string (URL) from Mongo

mongoose.connection.on("connected", () => {
  //Once the connection is done run the server
  console.log(`Connected to Mongo`);
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on Port: ${port}`);
  });
});
