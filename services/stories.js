import axios from "axios";

export const fetchStories = async () => {
  try {
    const response = await axios.get('api/story');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new error(error.response?.data?.message || "Failed to fetch stories");
  }
}

export const createStory = async (data) => {
  try {
    const response = await axios.post('api/story', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to create story");
  }
}