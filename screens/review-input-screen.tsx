import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../config/config';
import { COLORS } from '../constants';
import { SIZES, SPACING } from '../constants/theme';
import { AirbnbRating } from "react-native-ratings";
import { TextInput } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type ReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReviewInput'>;

const ReviewInputScreen = () => {

    const navigation = useNavigation<ReviewScreenNavigationProp>()
    const route = useRoute<RouteProp<RootStackParamList, "ReviewInput">>();
    const { tripsId, title } = route.params;

    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [image, setImage] = useState<ImagePicker.ImagePickerSuccessResult | null>(null);


    const [rating, setRating] = useState(6);

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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result)

        if (!result.canceled) {
            setImage(result);
        }
    };



    const handleReviews = async () => {
        try {
            const tripsCollectionRef = collection(db, 'reviews');
            const querySnapshot = await getDocs(tripsCollectionRef);
            const dates = new Date();
            const date = format(dates, "dd MMM");

            const reviewsData = querySnapshot.docs.map((doc) => doc.data());

            const newReviews = {
                id: reviewsData.length + 1,
                tripsId: tripsId,
                date: date,
                author: `${userData?.firstName} ${userData?.firstName}`,
                rating: rating,
                text: reviewText
            };

            await setDoc(doc(db, "reviews", `reviews-ID-${reviewsData.length + 1}`), newReviews)

            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }



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
                </View>


            </View>
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