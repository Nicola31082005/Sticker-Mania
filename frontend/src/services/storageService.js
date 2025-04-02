import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";



// Upload the images to Firebase Storage
export async function storageImage(file) {
    try {
      const storageRef = ref(storage, `stickers/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading file to Firebase:", error);
      throw error;
    }
  }

export async function convertBase64ToFile (base64) {
    const file = await fetch(base64)
    .then((res) => res.blob())
    .then((blob) => new File([blob], `sticker-${uuidv4()}.png`, { type: "image/png" }));

    return file
}