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

export const isStoryLiked = async (data) => {
  try {
    const response = await axios.get(`/api/story/like?storyId=${data}`,
      {
        headers: {
          'Content-Type' : 'application/json',
        }
      }
    )

    return {
      status: 200,
      data: response.data,
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch 'isStoryLiked'")
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