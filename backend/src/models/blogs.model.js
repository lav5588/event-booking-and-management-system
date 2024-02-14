import mongoose,{Schema} from "mongoose";

const blogSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title:{
    type:String,
    required:true
  },
  content: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
