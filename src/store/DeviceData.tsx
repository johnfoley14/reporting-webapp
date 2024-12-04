import axios from "axios";

export const getDeviceMetadata = async () => {
  try {
    const response = await axios.get(`${backendUrl}/device-metadata`);
    // return response.data.data;
    return ["data"];
  } catch (error) {
    console.error("Error fetching current sound reading:", error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};
