import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../config/config";
import { generateRandomID } from "../utils/utils";

export const updateImageToFirestore = async (orderId: string, imageUri: string) => {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `images/sleep/${generateRandomID(6)}.jpg`);

        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);


        const downloadURL = await getDownloadURL(storageRef);


        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, { sleep_checkout: downloadURL });

        console.log('Image updated successfully!');
    } catch (error) {
        console.log('Error updating image:', error);
    }
};

export const updateImageProfile = async (usersId: string, imageUri: string) => {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `images/profile/${generateRandomID(6)}.jpg`);

        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);


        const downloadURL = await getDownloadURL(storageRef);


        const usersRef = doc(db, 'users', usersId);
        await updateDoc(usersRef, { profileUrl: downloadURL });

        console.log('Image updated successfully!');
    } catch (error) {
        console.log('Error updating image:', error);
    }
};
