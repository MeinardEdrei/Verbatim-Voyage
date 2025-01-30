import axios from "axios";

export const fetchUser = async (data) => {
  try {
    const response = await axios.get(`/api/user?userId=${data}`);

    return {
      status: 200,
      data: response.data
    }
  } catch (error) {
    console.log('Fetching user service error:', error);
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}