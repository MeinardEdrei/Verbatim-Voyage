import axios from "axios";

export const createSignature = async ({ transformation }) => {
  try {
    const response = await axios.post('/api/signature',
      { transformation }, 
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Signature generation error: ", error);
    throw new error(error.response?.data?.message || "Failed to generate signature");
  }
}