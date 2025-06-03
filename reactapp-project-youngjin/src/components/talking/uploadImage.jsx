import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

export async function uploadImage(file, roomId, userId) {
  if (!file) return null;

  try {
    const fileRef = storageRef(storage, `${roomId}/${userId}/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }
}
