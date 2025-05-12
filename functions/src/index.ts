// functions/index.ts
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize admin SDK once
initializeApp();
const db = getFirestore();

export const saveDocument = onRequest(async (req, res) => {
  try {
    const data = req.body;

    if (!data || typeof data !== "object") {
      res.status(400).send("Invalid request body");
      return;
    }

    const docRef = await db.collection("documents").add(data);
    logger.info("Document written with ID: ", docRef.id);

    res.status(200).send({ success: true, id: docRef.id });
  } catch (error) {
    logger.error("Error saving document:", error);
    res.status(500).send("Internal Server Error");
  }
});
