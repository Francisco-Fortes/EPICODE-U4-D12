import express from "express";
import BlogsModel from "./model.js";

const blogsRouter = express.Router();

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new BlogsModel(req.body);
    //Validation of the re.body is happening thanks to Mongoose (Schema)
    //if the validationf fails, Mongoose will throw an error
    const { _id } = await newBlog.save();
    //{_id} comes from MongoDB
    //we await because we are waiting for the DB
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
blogsRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogsRouter.put("/:blogId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
