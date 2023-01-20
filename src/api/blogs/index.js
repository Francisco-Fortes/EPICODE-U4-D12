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
    //Alternative method
    //     const blog = await BlogsModel.findById(req.params.blogId);
    //     //findById, findOne, findByIdAndUpdate... retrieve a MONGOOSE DOC
    //     //an object with superpowers that for example has .save() method
    //     blog.title = "The New ALTERNATIVE Venus (EDITED)";
    //     //We are modifying from here, it does not matter if we write something in the body or not
    //     await blog.save();
    //     if (blog) {
    //       res.send(blog);
    //     } else {
    //       next(createHttpError(404, `Blog with ID ${req.params.blogId} not found`));
    //     }
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    //------------------
    const updatedBlog = await BlogsModel.findByIdAndUpdate(
      //Max of 3 parameters
      req.params.blogId, //Which one you want to modify
      req.body, //How you want to modify
      { new: true, runValidators: true } //Options
      //By default findByIdAndUpdate() returns the record pre-modification {new: false},
      //to retrieve the modified one we need {new: true}
      //By default findByIdAndUpdate() is not running validators {runValidators: false},
      //in order to make them run we need {runValidators: true}
    );
    if (updatedBlog) {
      res.send(updatedBlog);
    } else {
      next(createHttpError(404, `Blog with ID ${req.params.blogId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const deletedBlog = await BlogsModel.findByIdAndDelete(req.params.blogId);
    if (deletedBlog) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Blog with ID ${req.params.blogId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
