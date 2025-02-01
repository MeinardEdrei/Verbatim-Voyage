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

export const updateProfile = async (user, id) => {
  try {
    const response = await axios.post(`/api/user/profile?username=${user}&userId=${id}`,
      {
        headers: {
          'Content-Type' : 'application/json'
        }
      }
    );

    return {
      status: 200,
      data: response.data
    }
  } catch (error) {
    console.log('Updating profile error:', error);
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
}