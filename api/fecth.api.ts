import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/config";

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

                const hotelPromises = hotelsQuerySnapshot.docs.map(async (doc) => {
                    const hotelId = doc.id;
                    const reviewsDataHotels = await getReviewsData(hotelId);
                    return {
                        id: hotelId,
                        reviews: reviewsDataHotels,
                        ...doc.data(),
                    };
                });

                const hotelsData = await Promise.all(hotelPromises);

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

        const hotels = await Promise.all(
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

        return hotels;
    } catch (error) {
        console.log('Error getting trips data:', error);
    }
};

export const fetchOrdersDataInProgress = async () => {
    try {
        const currentUser = auth.currentUser;
        const userId = currentUser?.uid;

        const ordersCollectionRef = collection(db, 'orders');
        const q = query(ordersCollectionRef, where('usersId', '==', userId), where('status', '==', 'InProgress'));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return ordersData;
    } catch (error) {
        console.log('Error getting users data:', error);
    }
};

export const fetchOrdersDataSuccess = async () => {
    try {
        const currentUser = auth.currentUser;
        const userId = currentUser?.uid;

        const ordersCollectionRef = collection(db, 'orders');

        const q = query(
            ordersCollectionRef,
            where('usersId', '==', userId),
            where('status', '==', 'Success')
        );
        const querySnapshot = await getDocs(q);

        const ordersData = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const orderId = doc.id;
                const orderData = doc.data();

                const ReviewsCollectionRef = collection(db, 'reviews');
                const reviewQuerySnapshot = await getDocs(
                    query(
                        ReviewsCollectionRef,
                        where('usersId', '==', userId),
                        where('orderId', '==', orderId)
                    )
                );
                const reviewExists = !reviewQuerySnapshot.empty;

                return {
                    id: orderId,
                    ...orderData,
                    reviewExists,
                };
            })
        );

        return ordersData;
    } catch (error) {
        console.log('Error getting order data:', error);
    }
};


export const fetchOrdersDataFailed = async () => {
    try {

        const currentUser = auth.currentUser;
        const userId = currentUser?.uid;

        const ordersCollectionRef = collection(db, 'orders');
        const q = query(ordersCollectionRef, where('usersId', '==', userId), where('status', '==', 'Failed'));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return ordersData;
    } catch (error) {
        console.log('Error getting users data:', error);
    }
};

interface FavoriteTrip {
    id: string;
    tripId: string;
}

interface FavoriteHotels {
    id: string;
    hotelsId: string;
}

export const fetchFavorites = async () => {
    try {
        const currentUser = auth.currentUser;
        const userId = currentUser?.uid;

        const favoritesCollectionRef = collection(db, 'favorites');
        const q = query(favoritesCollectionRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const favoritesTripId: FavoriteTrip[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            tripId: doc.data().tripId,
        }));

        const tripCollectionRef = collection(db, 'trips');
        const queryTripsSnapshot = await getDocs(tripCollectionRef);

        const reviewsRef = collection(db, 'reviews');

        const foundTripsData = await Promise.all(
            favoritesTripId.map(async (favorite) => {
                const foundTrip = queryTripsSnapshot.docs.find((trip) => trip.id === favorite.tripId);

                const r = query(reviewsRef, where('tripsId', '==', favorite.tripId));
                const reviewsQuerySnapshot = await getDocs(r);

                const reviewsData = reviewsQuerySnapshot.docs.map((reviewDoc) => ({
                    id: reviewDoc.id,
                    ...reviewDoc.data(),
                }));

                return {
                    id: favorite.id,
                    tripsId: foundTrip?.id,
                    reviews: reviewsData,
                    ...(foundTrip?.data() || {}),
                };
            })
        );

        return foundTripsData;
    } catch (error) {
        console.log('Error getting users data:', error);
    }
};


export const fetchFavoritesHotels = async () => {
    try {
        const currentUser = auth.currentUser;
        const userId = currentUser?.uid;

        const favoritesCollectionRef = collection(db, 'favorites_hotels');
        const q = query(favoritesCollectionRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const favoritesHotelsId: FavoriteHotels[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            hotelsId: doc.data().hotelsId,
        }));

        const hotelsCollectionRef = collection(db, 'hotels');
        const queryHotelsSnapshot = await getDocs(hotelsCollectionRef);

        const foundHotelsData = await Promise.all(
            favoritesHotelsId.map(async (favorite) => {
                const foundHotel = queryHotelsSnapshot.docs.find((hotel) => hotel.id === favorite.hotelsId);

                const reviewsRef = collection(db, 'reviews');
                const r = query(reviewsRef, where('hotelsId', '==', favorite.hotelsId));
                const reviewsQuerySnapshot = await getDocs(r);

                const reviewsData = reviewsQuerySnapshot.docs.map((reviewDoc) => ({
                    id: reviewDoc.id,
                    ...reviewDoc.data(),
                }));

                return {
                    id: favorite.id,
                    hotelsId: foundHotel?.id,
                    reviews: reviewsData,
                    ...(foundHotel?.data() || {}),
                };
            })
        );

        return foundHotelsData;
    } catch (error) {
        console.log('Error getting users data:', error);
    }
};


export const fetchRecommendedTrips = async () => {
    try {
        const tripsCollectionRef = collection(db, 'trips');
        const querySnapshot = await getDocs(tripsCollectionRef);

        const reviewsRef = collection(db, 'reviews');
        

        const trips = querySnapshot.docs.map(async (doc) => {
            const q = query(reviewsRef, where('tripsId', '==', doc.id));
            const reviewsQuerySnapshot = await getDocs(q);
            const reviewsData = reviewsQuerySnapshot.docs.map((reviewDoc) => ({
                id: reviewDoc.id,
                ...reviewDoc.data(),
            }));

            return {
                id: doc.id,
                tripsId: doc.id,
                ...doc.data(),
                reviews: reviewsData
            };
        });

        const tripsWithReviews = await Promise.all(trips);

        const ordersCollectionRef = collection(db, 'orders');
        const querySnapshotOrder = await getDocs(ordersCollectionRef);

        // Count the number of orders for each trip
        const tripOrdersCount: { [key: string]: number } = {};
        querySnapshotOrder.forEach((doc) => {
            const tripId = doc.data().tripsId;
            tripOrdersCount[tripId] = (tripOrdersCount[tripId] || 0) + 1;
        });

        const sortedTrips = tripsWithReviews.sort((a, b) => {
            const ordersA = tripOrdersCount[a.id] || 0;
            const ordersB = tripOrdersCount[b.id] || 0;

            if (ordersA > ordersB) {
                return -1;
            } else if (ordersA < ordersB) {
                return 1;
            } else {

                return a.id.localeCompare(b.id);
            }
        })

        const recommendedTrips = sortedTrips.slice(0, 5);


        return recommendedTrips;

    } catch (error) {
        console.log('Error getting trips data:', error);
        return [];
    }
};