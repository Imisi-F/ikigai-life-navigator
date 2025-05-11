import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";  // Import Firestore config

// Function to save document to Firestore (no auth)
export const saveDocument = async (documentData: any) => {
  try {
    const docRef = await addDoc(collection(db, "documents"), documentData);
    console.log("Document saved successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving document:", error);
    throw error;
  }
};

// Function to get all documents from Firestore
export const getDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "documents"));
    const documents: any[] = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    console.log("Documents retrieved successfully:", documents);
    return documents;  // Return an array of documents
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};
