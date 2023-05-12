import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { auth, db, storage } from '../config/config';
import { COLORS, images } from '../constants';
import { SIZES, SPACING } from '../constants/theme';
import { AirbnbRating } from "react-native-ratings";
import { TextInput } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import LoadingBooking from '../components/booking/loading-booking';


type ReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReviewInput'>;



const ReviewInputScreen = () => {

    const navigation = useNavigation<ReviewScreenNavigationProp>()
    const route = useRoute<RouteProp<RootStackParamList, "ReviewInput">>();
    const { tripsId, title, hotelsId } = route.params;


    const [reviewText, setReviewText] = useState('');
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const [rating, setRating] = useState(3);

    const handleRatingChange = (newRating: any) => {
        setRating(newRating);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                const userId = currentUser?.uid;

                if (userId) {
                    const userDocRef = doc(db, 'users', userId);
                    const documentSnapshot = await getDoc(userDocRef);

                    if (documentSnapshot.exists()) {
                        const userData = documentSnapshot.data();
                        setUserData(userData);
                    } else {
                        console.log('User document does not exist');
                    }
                }
            } catch (error) {
                console.log('Error getting user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const [imageAll, setImageAll] = useState<string[]>([])

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,

        });

        if (!result.canceled) {
            const uris = result.assets.map((item) => item.uri).slice(0, 5);
            setImageAll(uris);
        }
    };


    const uploadImages = async () => {
        try {
            setIsLoading(true);
            const downloadURLs: string[] = [];

            for (let i = 0; i < imageAll.length; i++) {
                const image = imageAll[i];
                const response = await fetch(image);
                const blob = await response.blob();
                const imageRef = ref(storage, `images/${Date.now()}.jpg`);

                const uploadTask = uploadBytesResumable(imageRef, blob);

                const uploadPromise = new Promise<string>((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Image ${i + 1} progress: ${progress}%`);
                        },
                        (error) => {
                            console.log("Upload error:", error);
                            reject(error);
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(imageRef);
                            resolve(downloadURL);
                        }
                    );
                });

                const downloadURL = await uploadPromise;
                downloadURLs.push(downloadURL);
            }

            console.log("Success", "Images uploaded successfully");
            setIsLoading(false);
            return downloadURLs;
        } catch (error) {
            console.log("Upload error:", error);
            throw error;
        }
    };

    const handleReviews = async () => {
        try {
            const uploadedImageUrls = await uploadImages();
            const tripsCollectionRef = collection(db, 'reviews');
            const querySnapshot = await getDocs(tripsCollectionRef);
            const dates = new Date();
            const date = format(dates, "dd MMM");

            const reviewsData = querySnapshot.docs.map((doc) => doc.data());

            if (tripsId !== undefined) {
                const newReviews = {
                    id: reviewsData.length + 1,
                    tripsId: tripsId,
                    date: date,
                    author: `${userData?.firstName} ${userData?.lastName}`,
                    imageReview: uploadedImageUrls,
                    rating: `${rating * 2}`,
                    text: reviewText,
                };
                await setDoc(doc(db, "reviews", `reviews-ID-${reviewsData.length + 1}`), newReviews);
                navigation.goBack()
            } else {
                const newReviews = {
                    id: reviewsData.length + 1,
                    hotelsId: hotelsId,
                    date: date,
                    author: `${userData?.firstName} ${userData?.lastName}`,
                    imageReview: uploadedImageUrls,
                    rating: `${rating * 2}`,
                    text: reviewText,
                };

                await setDoc(doc(db, "reviews", `reviews-ID-${reviewsData.length + 1}`), newReviews);

                navigation.goBack()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteImage = (index: any) => {
        const updatedImages = [...imageAll];
        updatedImages.splice(index, 1);
        setImageAll(updatedImages);
    };




    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: SPACING.l }}>
                <Text style={styles.textFont} numberOfLines={2}>{title}</Text>

                <View style={{ marginRight: SPACING.xl * 5, marginVertical: SPACING.l }}>
                    <Text style={[styles.textFont, { fontSize: 12 }]}>ให้คะแนน</Text>
                    <AirbnbRating
                        defaultRating={rating}
                        count={5}
                        showRating={false}
                        selectedColor={COLORS.yellow}
                        size={18}
                        onFinishRating={handleRatingChange}
                    />
                </View>
                <View style={{}}>
                    <Text style={[styles.textFont, { fontSize: 12 }]}>เขียนรีวิวเกี่ยวกับแพ็คเกจนี้ได้ 100 ตัวอักษร</Text>

                    <View
                        style={{
                            backgroundColor: COLORS.white,
                            borderBottomColor: '#000000',
                            borderWidth: 0.5,
                            padding: 8,
                            borderRadius: SIZES.radius,
                            marginVertical: SPACING.s
                        }}>
                        <TextInput
                            placeholder='เขียนรีวิวในช่องนี้'
                            style={[styles.textFont, { fontSize: 12 }]}
                            maxLength={100}
                            value={reviewText}
                            onChangeText={(e) => setReviewText(e)}
                        />
                    </View>

                    <TouchableOpacity onPress={pickImage} style={styles.addPhoto}>
                        <MaterialIcons name="add-photo-alternate" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {imageAll.map((item, index) => (
                            <>
                                {item &&
                                    <>
                                        <Image key={index} source={{ uri: item }} style={{ width: 100, height: 100, borderRadius: SIZES.radius, marginVertical: 5 }} />
                                        <TouchableOpacity
                                            onPress={() => handleDeleteImage(index)}
                                            style={{ right: 15, top: 0, marginTop: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 17, paddingHorizontal: 2, borderRadius: 2 }}>
                                            <Octicons name="x" size={18} color={COLORS.white} />
                                        </TouchableOpacity>
                                    </>
                                }

                            </>
                        ))}
                    </View>
                </View>
            </View>
            {isLoading && <LoadingBooking src={images.reviewsLoad} />}
            <TouchableOpacity
                style={{
                    paddingVertical: SPACING.s,
                    backgroundColor: COLORS.primary,
                    marginHorizontal: SPACING.l,
                    marginVertical: SPACING.xl * 2,
                    borderRadius: SIZES.radius,
                    alignItems: "center",
                }}
                onPress={handleReviews}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: "SukhumvitSet-Bold",
                        color: COLORS.white,
                    }}
                >
                    ให้คะแนนแพ็คเกจ
                </Text>
            </TouchableOpacity>
        </View >
    )
}

export default ReviewInputScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    textFont: {
        fontSize: 14,
        fontFamily: "SukhumvitSet-SemiBold",
    },
    addPhoto: {
        marginVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 1,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius - 5
    }
})