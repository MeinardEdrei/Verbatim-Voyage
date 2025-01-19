import axios from "axios";

export const fetchStories = async () => {
  try {
    const response = await axios.get('api/story');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch stories");
  }
}

export const fetchThisStory = async (data) => {
  try {
    const response = await axios.get(`/api/story/view/${data}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch this story")
  }
}

export const createStory = async (data) => {
  try {
    const response = await axios.post('api/story', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to create story");
  }
}