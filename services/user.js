import axios from "axios";

export const fetchUser = async () => {
  try {
    const response = await axios.get('/api/user');

    return {
      status: 200,
      data: response.data
    }
  } catch (error) {
    console.log('Fetching user service error:', error);
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}