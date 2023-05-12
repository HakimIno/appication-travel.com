import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";

export const fetchNotificationData = async () => {
    try {
        const notificationCollectionRef = collection(db, 'notifys');
        const querySnapshot = await getDocs(notificationCollectionRef);

        const notification = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return notification;
    } catch (error) {
        console.log('Error getting trips data:', error);
    }
};

export const fetchPublic_RelationsData = async () => {
    try {
        const public_relationsCollectionRef = collection(db, 'public-relations');
        const querySnapshot = await getDocs(public_relationsCollectionRef);

        const public_relationsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return public_relationsData;
    } catch (error) {
        console.log('Error getting trips data:', error);
    }
};

async function allFetchData(DbName: string) {
    const collectionRef = collection(db, DbName);
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot
}

async function getReviewsData(hotelsId: string) {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, where('hotelsId', '==', hotelsId));
    const reviewsQuerySnapshot = await getDocs(q);

    const reviewsData = reviewsQuerySnapshot.docs.map((reviewDoc) => ({
        id: reviewDoc.id,
        ...reviewDoc.data(),
    }));

    return reviewsData;
}

export const fetchTripsDataQuery = async () => {
    try {

        const tripsQuerySnapshot = await allFetchData('trips')
        
        const trips = await Promise.all(
            tripsQuerySnapshot.docs.map(async (doc) => {

                const tripId = doc.id;


                const reviewsRef = collection(db, 'reviews');
                const q = query(reviewsRef, where('tripsId', '==', tripId));
                const reviewsQuerySnapshot = await getDocs(q);

                const hotelsRef = collection(db, 'hotels');
                const h = query(hotelsRef, where('tripsId', '==', tripId));
                const hotelsQuerySnapshot = await getDocs(h);

                const reviewsData = reviewsQuerySnapshot.docs.map((reviewDoc) => ({
                    id: reviewDoc.id,
                    ...reviewDoc.data(),
                }));

                const hotelsData = hotelsQuerySnapshot.docs.map((hotelsDoc) => ({
                    id: hotelsDoc.id,
                    reviews: [],
                    ...hotelsDoc.data(),
                }));

                return {
                    id: tripId,
                    tripsId: doc.id,
                    ...doc.data(),
                    hotels: hotelsData,
                    reviews: reviewsData,
                };
            })
        );

        return trips;
    } catch (error) {
        console.log('Error getting trips data:', error);
    }
};


export const fetchHotelsDataQuery = async () => {
    try {

        const hotelsQuerySnapshot = await allFetchData('hotels')

        const trips = await Promise.all(
            hotelsQuerySnapshot.docs.map(async (doc) => {
                const hotelsId = doc.id;

                const reviewsData = await getReviewsData(hotelsId);

                return {
                    id: hotelsId,
                    hotelsId: doc.id,
                    ...doc.data(),
                    reviews: reviewsData,
                };
            })
        );

        return trips;
    } catch (error) {
        console.log('Error getting trips data:', error);
    }
};
