import { useUserSession } from "@/app/utils/SessionContext";
import axios from "axios";

export const createSignature = async ({ public_id, transformation }) => {
  try {
    const response = await axios.post('/api/signature',
      { public_id, transformation }, 
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

export const uploadImage = async ({ file }) => {
  try {
    const session = useUserSession();
    const public_id = `verbatim_voyage/users/${session?.userSession?.user?.name}/blog_images/image_${Date.now()}`;
    const transformation = { crop: 'fill' };
    
    const {signature, timestamp } = await createSignature({ public_id, transformation });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("public_id", public_id);

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    const data = response.data;

    return data.secure_url;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
}