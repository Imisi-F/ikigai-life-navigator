import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";  // Import the initialized Storage instance

// Function to upload file to Firebase Storage
export const uploadFile = async (file: File) => {
  try {
    const fileRef = ref(storage, `documents/${file.name}`);  // Define the path in Storage
    await uploadBytes(fileRef, file);  // Upload the file
    console.log("File uploaded successfully!");
    return fileRef.fullPath;  // Return the path where the file is stored
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};