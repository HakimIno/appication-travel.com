import { FlatList, Image, Pressable, SectionList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { Octicons } from '@expo/vector-icons';
import { SIZES, SPACING } from '../constants/theme';
import { auth, db } from '../config/config';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { DocumentData, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackground from '../components/trip-details/TripDetailsCard/custom-background';
import Divider from '../components/shared/divider';
import * as ImagePicker from 'expo-image-picker';
import { updateImageProfile } from '../api/upload-image.api';
import { FontAwesome } from '@expo/vector-icons';


type NavigationProps = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const SettingsScreen = ({ navigation }: NavigationProps) => {
    const insets = useSafeAreaInsets();
    const [userData, setUserData] = useState<DocumentData | null>(null);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["1%", "100%"], []);


    const handleLogout = () => {
        auth.signOut().
            then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch(error => {
                console.log(error);
            });

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

    const handleClose = () => {
        bottomSheetRef.current?.snapToIndex(0);
    };

    const handlePress = () => {
        bottomSheetRef.current?.snapToIndex(1);

    };


    const renderHeader = () => (
        <>
            <View style={{ marginHorizontal: SPACING.l, marginVertical: SPACING.s }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View />
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: "SukhumvitSet-Bold",
                            textAlign: "center",
                        }}
                    >
                        แก้ไขข้อมูลส่วนตัว
                    </Text>
                    <TouchableOpacity onPress={handleClose}>
                        <MaterialIcons name="close" size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <Divider enabledSpacing={false} />
        </>
    );


    const setFirstName = (text: string) => {
        setUserData({ ...userData, firstName: text });
    };

    const setLastName = (text: string) => {
        setUserData({ ...userData, lastName: text });
    };

    const setEmail = (text: string) => {
        setUserData({ ...userData, email: text });
    };

    const setPhoneNumber = (text: string) => {
        setUserData({ ...userData, phoneNumber: text });
    };

    const EditProfile = async () => {
        try {

            const usersCollectionRef = collection(db, 'users');
            const userDocRef = doc(usersCollectionRef, userId);


            await updateDoc(userDocRef, userData);
            handleClose()

            console.log('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const currentUser = auth.currentUser;
            const userId = currentUser?.uid || '';
            updateImageProfile(userId, imageUri);
        }

        return null;

    };

    const data = [
        { title: "รายการที่บันทึกไว้", icon: "heart", routeName: 'Favorite' },
        { title: "รีวิวทั้งหมด", icon: "rocket", routeName: '' },
        { title: "การแจ้งเตือน", icon: "bell", routeName: 'Notification' },
        { title: "เกี่ยวกับ Aumanan Juket", icon: "question", routeName: 'About' },
    ]

    type IconName = "heart" | "question" | "rocket" | "bell"


    return (
        <>

            <View style={[styles.container, { marginTop: insets.top + 10 }]}>
                <View>
                    <View style={{ padding: SPACING.l, flexDirection: 'row' }}>
                        <TouchableWithoutFeedback>
                            <TouchableOpacity onPress={pickImage}>
                                {userData?.profileUrl && userData?.profileUrl.trim() !== '' ? (
                                    <Image
                                        source={{ uri: userData?.profileUrl }}
                                        style={{ borderWidth: 3, borderColor: "#f9fafb", width: 65, height: 65, borderRadius: 52 }}
                                    />
                                ) : (
                                    <View style={{ borderWidth: 3, borderColor: "#f9fafb", width: 65, height: 65, borderRadius: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightGray }}>
                                        <FontAwesome name="user" size={55} color={COLORS.white} style={{}} />
                                    </View>
                                )}

                                <View style={{ position: 'absolute', right: 2, bottom: 4, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 18, height: 18, borderRadius: 52, alignItems: 'center', justifyContent: 'center' }}>
                                    <MaterialIcons name="edit" size={12} color={COLORS.white} />
                                </View>
                            </TouchableOpacity>
                        </TouchableWithoutFeedback>

                        <View style={{ justifyContent: 'center', marginHorizontal: SPACING.s + 3 }}>

                            <Text style={styles.textName}>
                                {userData?.firstName === "" || userData?.lastName === "" ? `+66${userData?.phoneNumber}` : (userData?.firstName + ' ' + userData?.lastName)}
                            </Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handlePress}>
                                <Text style={[styles.textName, { fontSize: 11, color: COLORS.primary }]}>แก้ไขข้อมูลส่วนตัว</Text>
                                <MaterialIcons name="arrow-forward-ios" size={14} color={COLORS.primary} style={{ marginHorizontal: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={{ height: 230, backgroundColor: COLORS.white, marginHorizontal: SPACING.m + 5, borderRadius: SIZES.radius + 5, marginTop: SPACING.m }}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => (
                            <>
                                <Pressable
                                   onPress={() => navigation.navigate(item.routeName as keyof RootStackParamList, {} as never)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 10,
                                        marginHorizontal: SPACING.m,
                                        justifyContent: 'space-between',
                                        marginTop: 8,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Octicons name={item.icon as IconName} size={18} color={COLORS.black} />
                                        <Text style={[styles.fontText, { fontSize: 13 }]}>{item.title}</Text>
                                    </View>
                                    <MaterialIcons name="arrow-forward-ios" size={14} color={COLORS.primary} />
                                </Pressable>
                                {index !== data.length - 1 && <Divider enabledSpacing />}
                            </>
                        )}
                        keyExtractor={(item) => item.icon}
                    />
                </View>

                <TouchableOpacity onPress={handleLogout}>
                    <Text style={[styles.fontText, { textAlign: 'center', marginVertical: SPACING.l, color: COLORS.primary }]}>ออกจากระบบ</Text>
                </TouchableOpacity>

                <BottomSheet
                    snapPoints={snapPoints}
                    ref={bottomSheetRef}
                    enablePanDownToClose={true}
                    handleComponent={renderHeader}
                    backgroundComponent={CustomBackground}
                >
                    <Text style={styles.detailTextInfo}>
                        ชื่อ <Text style={{ color: COLORS.red }}>*</Text>
                    </Text>
                    <View style={[styles.containerInput]}>
                        <TextInput
                            style={[styles.InputStyle]}
                            value={userData?.firstName}
                            keyboardType="default"
                            placeholder="ไม่ได้ละบุ"
                            onChangeText={setFirstName}
                        />

                    </View>
                    <Text style={styles.detailTextInfo}>
                        นามสกุล <Text style={{ color: COLORS.red }}>*</Text>
                    </Text>
                    <View style={[styles.containerInput]}>

                        <TextInput
                            style={[styles.InputStyle]}
                            value={userData?.lastName}
                            keyboardType="default"
                            placeholder="ไม่ได้ละบุ"
                            onChangeText={setLastName}
                        />

                    </View>
                    <Text style={styles.detailTextInfo}>
                        อีเมล <Text style={{ color: COLORS.red }}>*</Text>
                    </Text>
                    <View style={[styles.containerInput]}>
                        <TextInput
                            style={[styles.InputStyle]}
                            value={userData?.email}
                            keyboardType="default"
                            placeholder="ไม่ได้ละบุ"
                            onChangeText={setEmail}
                        />

                    </View>
                    <Text style={styles.detailTextInfo}>
                        เบอร์โทรศัพทร์ <Text style={{ color: COLORS.red }}>*</Text>
                    </Text>
                    <View style={[styles.containerInput]}>
                        <TextInput
                            style={[styles.InputStyle]}
                            value={userData?.phoneNumber}
                            keyboardType="default"
                            placeholder="ไม่ได้ละบุ"
                            onChangeText={setPhoneNumber}
                        />

                    </View>

                    <TouchableOpacity
                        style={{
                            paddingVertical: SPACING.s,
                            backgroundColor: COLORS.primary,
                            marginHorizontal: SPACING.l,
                            marginBottom: SPACING.s,
                            borderRadius: SIZES.radius,
                            alignItems: "center",
                            marginVertical: SPACING.l + SPACING.l + 20
                        }}
                        onPress={EditProfile}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: "SukhumvitSet-Bold",
                                color: COLORS.white,
                            }}
                        >
                            ยืนยันแก้ไข
                        </Text>
                    </TouchableOpacity>
                </BottomSheet>
            </View>
        </>

    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    sectionHeader: {
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    fontText: {
        marginHorizontal: SPACING.s + 3,
        fontSize: 14,
        fontFamily: "SukhumvitSet-SemiBold",
    },
    textName: {
        fontSize: 16,
        fontFamily: "SukhumvitSet-Bold",
    },
    containerInput: {
        flexDirection: "row",
        marginHorizontal: SPACING.l,
        paddingHorizontal: SPACING.m,
        borderRadius: SIZES.radius + 5,
        backgroundColor: COLORS.white,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: COLORS.slate,

    },
    InputStyle: {
        flex: 1,

        height: 45,
        color: COLORS.slate,
        fontFamily: "SukhumvitSet-Medium",
        fontSize: 13
    },
    detailTextInfo: {
        fontSize: 14,
        fontFamily: "SukhumvitSet-SemiBold",
        color: COLORS.black,
        marginTop: SPACING.l,
        marginHorizontal: SPACING.l + 5
    },
})