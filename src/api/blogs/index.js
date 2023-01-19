import express from "express";
import createHttpError from "http-errors";
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
    console.log(`ID of the Blog: ${_id}`);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await BlogsModel.find();
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
    const blog = await BlogsModel.findById(req.params.blogId);
    //We need to retrieve the id from the params
    if (blog) {
      res.send(blog);
    } else {
      next(createHttpError(404, `Blog with ID ${req.params.blogId} not found`));
      //When you CastError: Cast to ObjectId failed for value is because you type a letter out of the a-f range
      //_id it is going to contain only numbers and letters from a to f
    }
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
