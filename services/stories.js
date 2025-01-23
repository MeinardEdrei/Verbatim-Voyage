import axios from "axios";

export const fetchStories = async () => {
  try {
    const response = await axios.get('api/story');
    
    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch stories");
  }
}

export const fetchThisStory = async (data) => {
  try {
    const response = await axios.get(`/api/story/view?storyId=${data}`,
      { 
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch this story")
  }
}

export const likeStory = async (storyId, userId) => {
  try {
    const response = await axios.post('/api/story/like', 
      { storyId, userId }, 
      {
        headers: {
          'Content-Type' : 'application/json',
        }
    });

    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    console.log("Like story service error:", error);
    throw new Error(error.response?.data?.message || "Failed to like story");
  }
}

export const sendComment = async (data) => {
  try {
    const response = await axios.post('/api/story/comment',
      data,
      {
        headers: {
          'Content-Type' : 'application/json',
        }
      }
    );

    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to send comment");
  }
}

export const deleteComment = async (post, id) => {
  try {
    const response = await axios.delete(`/api/story/comment?storyId=${post}&commentId=${id}`,
      {
        headers: {
          'Content-Type' : 'application/json'
        }
      }
    )

    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    console.log("Deleting comment service error:", error);
    throw new Error(error.response?.data?.message || "Failed to send comment");
  }
}

export const createStory = async (data) => {
  try {
    const response = await axios.post('api/story', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to create story");
  }
}