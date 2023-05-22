import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
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
    const { tripsId, title, hotelsId, orderId } = route.params;



    const [reviewText, setReviewText] = useState('');
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: any) => {
        setRating(newRating);
    };

    const currentUser = auth.currentUser;
    const userId = currentUser?.uid;

    useEffect(() => {
        const userDocRef = doc(db, 'users', String(userId));

        const unsubscribe = onSnapshot(userDocRef, (documentSnapshot) => {
            if (documentSnapshot.exists()) {
                const userData = documentSnapshot.data();
                setUserData(userData);
            } else {
                console.log('User document does not exist');
            }
        });

        return () => unsubscribe();
    }, [userId]);

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

            const dates = new Date();
            const date = format(dates, "dd MMM");

            const currentUser = auth.currentUser;
            const userId = currentUser?.uid;

            if (tripsId) {
                const newReviews = {
                    tripsId: tripsId,
                    usersId: userId,
                    orderId: orderId,
                    profileUrl: userData?.profileUrl,
                    date: date,
                    author: `${userData?.firstName} ${userData?.lastName}`,
                    imageReview: uploadedImageUrls,
                    rating: `${rating * 2}`,
                    text: reviewText,
                    type: 'PLACE'
                };

                await addDoc(collection(db, "reviews"), newReviews)
                // await setDoc(doc(db, "reviews", `reviews-ID-${reviewsData.length + 1}`), newReviews);
                navigation.goBack()
            } else {
                const newReviews = {
                    hotelsId: hotelsId,
                    usersId: userId,
                    orderId: orderId,
                    date: date,
                    author: `${userData?.firstName} ${userData?.lastName}`,
                    imageReview: uploadedImageUrls,
                    profileUrl: userData?.profileUrl,
                    rating: `${rating * 2}`,
                    text: reviewText,
                    type: "HOTELS"
                };

                await addDoc(collection(db, "reviews"), newReviews)

                //await setDoc(doc(db, "reviews", `reviews-ID-${reviewsData.length + 1}`), newReviews);

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
                    <Text style={[styles.textFont, { fontSize: 12 }]}>เขียนรีวิวเกี่ยวกับแพ็คเกจนี้ได้ 256 ตัวอักษร</Text>

                    <View
                        style={{
                            backgroundColor: COLORS.white,
                            borderColor: COLORS.gray,
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            padding: 10,
                            borderRadius: SIZES.radius,
                            marginVertical: SPACING.s
                        }}>
                        <TextInput
                            placeholder='เล่าประสบการณ์ของคุณให้ฟังหน่อย'
                            style={[styles.textFont, { fontSize: 12, height: 100, textAlignVertical: 'top', }]}
                            maxLength={256}
                            value={reviewText}
                            onChangeText={(e) => setReviewText(e)}
                            multiline
                        />
                    </View>


                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                        <TouchableOpacity onPress={pickImage} style={styles.addPhoto}>
                            <MaterialIcons name="add-photo-alternate" size={30} color={COLORS.primary} />
                        </TouchableOpacity>
                        {imageAll.map((item, index) => (
                            <React.Fragment key={index}>
                                {item && (
                                    <>
                                        <Image
                                            source={{ uri: item }}
                                            style={{ width: 100, height: 100, borderRadius: SIZES.radius, marginVertical: 5, marginLeft: index === 2 ? SPACING.s : 0 }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleDeleteImage(index)}
                                            style={{ right: 15, top: 0, marginTop: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 17, paddingLeft:2, borderRadius: 2 }}>
                                            <Octicons name="x" size={18} color={COLORS.white} />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </React.Fragment>
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
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderStyle: 'dashed',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        marginHorizontal: SPACING.s
    }
})