import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'

import { COLORS } from '../constants'
import { SIZES, SPACING } from '../constants/theme'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../types'

import { format } from "date-fns";
import BottomSheetSelectDay from '../components/booking/bottomSheet-select-day'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'

import { calculateDuration } from '../utils/utils'

type BookingTripsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "BookingHotels"
>;

const HotelsBookingScreen = () => {
    const navigation = useNavigation<BookingTripsScreenNavigationProp>();

    const route = useRoute<RouteProp<RootStackParamList, "BookingHotels">>();
    const { title, price, hotelsId, types, image, option_room } = route.params;

    const details = ["ยกเลิกฟรี (ล่วงหน้า 24 ชั่วโมง)", "ยืนยัน", "WiFi ฟรี"];

    const options = ['ห้องพิเศษ เตียงเดียว', 'ห้องพิเศษ เตียงคู่', 'ห้องธรรมดา เตียงเดียว', 'ห้องธรรมดา เตียงคู่'];

    const today = new Date();
    let toDate = format(today, "yyyy/MM/dd");


    const [selectedValue, setSelectedValue] = useState('เลือกห้องพัก');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');


    const duration = calculateDuration(checkInDate, checkOutDate)


    const bottomSheetRef_in = useRef<BottomSheet>(null);
    const bottomSheetRef_Out = useRef<BottomSheet>(null);

    const handleOptionSelect = (value: any) => {
        setSelectedValue(value);
    };

    const handlePress_in = () => {
        bottomSheetRef_in.current?.snapToIndex(1);
    };
    const handlePress_out = () => {
        bottomSheetRef_Out.current?.snapToIndex(1);
    };
    return (
        <View style={styles.container}>
            {/* <Divider enabledSpacing={false} elevations={false} /> */}
            <View style={styles.subContainer}>
                <Text
                    numberOfLines={2}
                    style={[styles.detailsBookingText, { fontSize: 14 }]}
                >
                    {title}
                </Text>

                <View style={{ flexDirection: "row", marginVertical: SPACING.s }}>
                    {details.map((item, index) => (
                        <View
                            style={[
                                styles.detailsBooking,
                                { marginLeft: index === 0 ? 0 : SPACING.s },
                            ]}
                            key={index}
                        >
                            <Text style={styles.detailsBookingText}>{item}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: SPACING.m }}>
                    <TouchableOpacity onPress={handlePress_in} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.detailsBookingText, { fontSize: 15, color: COLORS.primary }]}>เช็คอิน: </Text>
                        <Text style={[styles.detailsBookingText, { fontSize: 13 }]}>{checkInDate}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePress_out} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.detailsBookingText, { fontSize: 15, color: COLORS.primary }]}>เช็คเอาท์: </Text>
                        <Text style={[styles.detailsBookingText, { fontSize: 13 }]}>{checkOutDate}</Text>
                    </TouchableOpacity>
                </View>
                {!isNaN(duration.durationInDays) && duration.durationInDays !== 0 && (
                    <Text
                        style={[styles.detailsBookingText, { fontSize: 13, marginTop: SPACING.m }]}>ระยะเวลา:
                        <Text style={{ fontSize: 12 }}> {duration.durationInDays} วัน {duration.durationInNights} คืน</Text>
                    </Text>
                )}

                <View style={{ marginTop: SPACING.m }}>
                    <TouchableOpacity onPress={() => handleOptionSelect('')}>
                        <Text style={[styles.detailsBookingText, { fontSize: 15, color: COLORS.primary }]}>{selectedValue || 'เลือกห้องพัก'}</Text>
                    </TouchableOpacity>

                    {selectedValue === '' && (
                        <View>
                            {option_room.map((option: string) => (
                                <TouchableOpacity key={option} onPress={() => handleOptionSelect(option)} style={{ marginVertical: SPACING.s, backgroundColor: COLORS.primary, alignSelf: "flex-start", padding: 2, borderRadius: 5, paddingHorizontal: 5 }}>
                                    <Text style={[styles.detailsBookingText, { fontSize: 13, color: COLORS.white }]}>-{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <TouchableOpacity style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 8,
                    borderRadius: SIZES.radius,
                    marginHorizontal: SPACING.s,
                    alignItems: 'center',
                    marginTop: SPACING.xl
                }} onPress={() => {
                    if (checkInDate !== "" && (checkOutDate !== "" && selectedValue !== "เลือกห้องพัก")) {
                        navigation.navigate("BookingInformation", {
                            hotelsId: hotelsId,
                            title: title,
                            image: image,
                            price: price,
                            checkInDate: checkInDate,
                            checkOutDate: checkOutDate,
                            selectRoom: selectedValue,
                            types: types
                        });
                    }
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 13,
                        fontFamily: "SukhumvitSet-Bold",
                    }}>ดำเนินการจอง</Text>
                </TouchableOpacity>
            </View>
            <BottomSheetSelectDay
                bottomSheetRef={bottomSheetRef_in}
                date=""
                setDate={setCheckInDate}
                toDate={toDate}
                setActiveIndex={setCheckInDate}
            />
            <BottomSheetSelectDay
                bottomSheetRef={bottomSheetRef_Out}
                date=""
                setDate={setCheckOutDate}
                toDate={toDate}
                setActiveIndex={setCheckOutDate}
            />


        </View >

    )
}

export default HotelsBookingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    subContainer: {
        marginHorizontal: SPACING.m,
        marginTop: SPACING.l,
    },
    detailsBooking: {
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 5,
        backgroundColor: "#eeeef1",
        alignSelf: "flex-start",
    },
    detailsBookingText: {
        fontSize: 10,
        fontFamily: "SukhumvitSet-SemiBold",
    },

})