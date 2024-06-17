

import Post from '../model/post.js';

export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        console.log(post)
        post.save()
        .then(result => {
          // Successfully saved
        })
        .catch(error => {
          
          // Handle validation errors
          console.error('Validation Error:', error.message);
        });

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getAllPosts = async (request, response) => {
  //let username = request.query.username;
  let category = request.query.category;
  let posts;
  try {
      // if(username) 
      //     posts = await Post.find({ username: username });
       if (category) 
          posts = await Post.find({ categories: category });
      else 
          posts = await Post.find({});
          
      // response.status(200).json(posts);

       //let posts = await Post.find({});
       response.status(200).json(posts);
  } catch (error) {
      response.status(500).json(error)
  }
}


export const getPost = async (request, response) => {
  try {
      const post = await Post.findById(request.params.id);

      response.status(200).json(post);
  } catch (error) {
      response.status(500).json(error)
  }
}


export const updatePost = async (request, response) => {
  try {
      const post = await Post.findById(request.params.id);

      if (!post) {
          response.status(404).json({ msg: 'Post not found' })
      }
      
      await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

      response.status(200).json('post updated successfully');
  } catch (error) {
      response.status(500).json(error);
  }
}

 

export const deletePost = async (request, response) => {
  try {
      // Find and delete the post by ID from the request parameters
      const post = await Post.findByIdAndDelete(request.params.id);
      
      // Check if the post was found and deleted
      if (!post) {
         return response.status(404).json({ msg: 'Post not found' });
      }

      // Respond with a success message
      response.status(200).json({ msg: 'Post deleted successfully' });
  } catch (error) {
      // Handle any errors that occur during the deletion process
      response.status(500).json({ error: error.message });
  }
};