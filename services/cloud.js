import { useUserSession } from "@/app/utils/SessionContext";
import axios from "axios";

export const createSignature = async ({ public_id, folderPath }) => {
  try {
    const response = await axios.post('/api/signature',
      { 
        public_id,
        folderPath,
      }, 
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

export const uploadImage = async ({ file, session }) => {
  try {
    const sanitizedUsername = session?.userSession?.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '_') || 'anonymous';

    const folderPath = `verbatim_voyage/users/${sanitizedUsername}/blog_images`
    const public_id = `${folderPath}/image_${Date.now()}`;
    
    const { signature, timestamp } = await createSignature({ public_id, folderPath });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("public_id", public_id);
    formData.append("folder", folderPath);

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    const data = response.data;

    return data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
}

export const deleteImage = async ({ image_url, session }) => {
  try {
    const sanitizedUsername = session?.userSession?.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '_') || 'anonymous';

    const folderPath = `verbatim_voyage/users/${sanitizedUsername}/blog_images`
    const urlParts = image_url.split(`upload/`);
    const pathWithoutVersion = urlParts[1].split('/').slice(1).join('/');

    let public_id;

    if (urlParts.length > 1) {
      public_id = pathWithoutVersion.split('.')[0];
    }

    const { signature, timestamp } = await createSignature({ 
      public_id, 
      folderPath 
    });

    const formData = new FormData();
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("public_id", public_id);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Image deletion error:", error);
    throw new Error(error.response?.data?.message || "Failed to delete image");
  }
}