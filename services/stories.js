import axios from "axios";

export const fetchStories = async () => {
  try {
    const response = await axios.get('/api/story');
    
    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch stories");
  }
}

export const fetchUserStories = async (data) => {
  try {
    const response = await axios.get(`/api/user/story?userId=${data}`);

    return {
      status: 200,
      data: response.data,
      message: response.data.message
    }
  } catch (error) {
    console.log('Fetch user stories service error:', error);
    throw new Error(error.response?.data?.message || "Failed to fetch this story")
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
    throw new Error(error.response?.data?.message || "Failed to delete comment");
  }
}

export const likeComment = async (post, id, user) => {
  try {
    const response = await axios.post(`/api/story/like/likeComment?storyId=${post}&commentId=${id}&userId=${user}`,
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
    console.log("Liking comment error:", error);
    throw new Error(error.response?.data?.message || "Failed to like comment");
  }
}

export const sendReply = async (post, id, user, replyText) => {
  try {
    const response = await axios.post(`/api/story/reply?storyId=${post}&commentId=${id}&userId=${user}&replyText=${replyText}`,
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
    console.log("Reply error:", error);
    throw new Error(error.response?.data?.message || "Failed to reply to a comment");
  }
}

export const deleteReply = async (post, commentId, replyId) => {
  console.log(post, commentId, replyId)
  try {
    const response = await axios.delete(`/api/story/reply?storyId=${post}&commentId=${commentId}&replyId=${replyId}`,
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
    console.log("Delete reply error:", error);
    throw new Error(error.response?.data?.message || "Failed to delete a reply");
  }
}

export const createStory = async (data) => {
  try {
    const response = await axios.post('/api/story', data, {
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

export const updateStory = async (storyId, storyData) => {
  try {
    const response = await axios.put('/api/story', {
      id: storyId,
      ...storyData
    });
    
    return {
      status: 200,
      data: response.data,
      message: response.data.message
    }
  } catch (error) {
    console.log('Error updating story service', error);
    throw new Error(error.response?.data?.message || "Failed to update story service");
  }
};

export const changeStoryStatusToDraft = async (data) => {
  try {
    const response = await axios.post(`/api/story/draft?storyId=${data}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    return {
      status: 200,
      data: response.data,
      message: response.data.message
    }
  } catch (error) {
    console.log('Changing story to draft service error:', error);
    throw new Error(error.response?.data?.message || "Failed to change story status");
  }
}

export const deleteStory = async (data) => {
  try {
    const response = await axios.delete(`/api/story?storyId=${data}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    return {
      status: 200,
      data: response.data,
      message: response.data.message
    }
  } catch (error) {
    console.log('Deleting story error:', error);
    throw new Error(error.response?.data?.message || "Failed to delete story");
  }
}