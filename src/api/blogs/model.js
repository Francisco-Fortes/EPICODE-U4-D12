import mongoose from "mongoose";
const { Schema, model } = mongoose;
// import authorsSchema from "../authors/model.js";

const blogsSchema = new Schema(
  {
    //First parameter of the Schema is the structure
    //Second parameter are Options like timestamp
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    //     author: { authorsSchema },
  },
  { timestamps: true }
  //MongoDB handles automatically
  // "createdAt": "DATE"
  // "updatedAt": "DATE"
);

export default model("Blog", blogsSchema);
//The extra -s is added automatically by MongoDB
//The name to import it is BlogsModel
//this module it is going to linked to "Blogs" collection automatically
//if the collection does not exist, it will be created automatically

// {
//     "_id": "MONGO GENERATED ID",
//     "category": "ARTICLE CATEGORY",
//     "title": "ARTICLE TITLE",
//     "cover":"ARTICLE COVER (IMAGE LINK)",
//     "readTime": {
//       "value": Number,
//       "unit": "minute"
//     },
//     "author": {
//       "name": "AUTHOR NAME",
//       "avatar":"AUTHOR AVATAR LINK"
//     },
//     "content": "HTML",
//     "createdAt": "DATE",
//   "updatedAt": "DATE"
// }
