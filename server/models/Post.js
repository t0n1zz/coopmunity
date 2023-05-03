import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: String,
    description: String,
    picturePath: String,
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        userId: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
