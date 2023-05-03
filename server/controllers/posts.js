import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, title, description, tags, picturePath } = req.body;
    const newPost = new Post({
      userId,
      title,
      tags,
      description,
      picturePath,
      likes: {},
      comments: [],
    });
    const savedPost = await newPost.save();

    const posts = await Post.find();
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(201).json({
      posts: posts,
      savedPost: savedPost,
    });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    let post;
    if (search) {
      query = { title: { $regex: search, $options: "i" } };
      post = await Post.find(query);
    } else {
      post = await Post.find();
      post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Populate user information for each post
    await Post.populate(post, {
      path: "userId",
      select: "firstName lastName picturePath creditUnion",
      model: User,
    });

    // Populate user information for each comment
    await Post.populate(post, {
      path: "comments.userId",
      select: "firstName lastName picturePath creditUnion",
      model: User,
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });

    // Populate user information for each post
    await Post.populate(post, {
      path: "userId",
      select: "firstName lastName picturePath creditUnion",
      model: User,
    });

    post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPostCount = async (req, res) => {
  const { userId } = req.params;

  try {
    const postCount = await Post.countDocuments({ userId });
    res.status(200).json({ count: postCount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Populate user information for each post
    await Post.populate(updatedPost, {
      path: "userId",
      select: "firstName lastName picturePath creditUnion",
      model: User,
    });

    // Populate user information for each comment
    await Post.populate(updatedPost, {
      path: "comments.userId",
      select: "firstName lastName picturePath creditUnion",
      model: User,
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            userId,
            content,
          },
        },
      },
      { new: true }
    );

    // Populate user information for each post
    await Post.populate(updatedPost, {
      path: "userId",
      select: "firstName lastName picturePath creditUnion",
      model: User,
    });

    // Populate user information for each comment
    await Post.populate(updatedPost, {
      path: "comments.userId",
      select: "firstName lastName picturePath creditUnion",
      model: User,
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
