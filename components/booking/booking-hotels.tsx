import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Display from '../../utils/Display'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, SPACING } from '../../constants/theme'

interface Props {
    singleBed: any
    setSingleBed: any;
    setDoubleBed: any;
    doubleBed: any
    setThreeBeds: any;
    threeBeds: any;
    hotelsName: any
    singleBadPrice: any
    doubleBedPrice: any
    threeBedsPrice: any
}

const BookingHotels = ({
    setDoubleBed,
    singleBed,
    setSingleBed,
    doubleBed,
    setThreeBeds,
    threeBeds,
    hotelsName,
    singleBadPrice,
    doubleBedPrice,
    threeBedsPrice

}: Props) => {
    return (
        <View
            style={{
                paddingHorizontal: Display.setWidth(2),
                height: Display.setHeight(22),
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#dddcdc",
                marginTop: SPACING.m,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    margin: SPACING.s,
                    alignItems: "center",
                }}
            >
                <MaterialIcons name="hotel" size={15} color="#707070" />

                <Text
                    style={[
                        styles.detailsBookingText,
                        {
                            marginLeft: SPACING.s / 2, color: "#707070",
                            fontSize: Display.setWidth(2.5),
                            fontFamily: "SukhumvitSet-SemiBold",
                        },
                    ]}
                >
                    โรงแรม/พัก {hotelsName}
                </Text>
            </View>
            <View
                style={{
                    borderBottomWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#e2e2e2",
                }}
            />
            <Text
                style={[
                    styles.detailsBookingText,
                    {
                        marginLeft: SPACING.s, color: COLORS.black,
                        fontSize: Display.setWidth(2.5),
                        fontFamily: "SukhumvitSet-SemiBold",

                    },
                ]}
            >
                เลือกประเภทห้องพัก
            </Text>
            <View
                style={[
                    styles.containerFdRow,
                    {
                        justifyContent: "space-between",
                        marginHorizontal: SPACING.m,
                        paddingTop: Display.setHeight(1),
                    },
                ]}
            >
                <Text style={[styles.detailsBookingText, { fontSize: 12 }]}>
                    พักเตียงเดี่ยว <Text style={{ fontSize: 10, color: COLORS.primary }}>({singleBadPrice}฿)</Text>
                </Text>
                <View style={[styles.containerFdRow]}>
                    <TouchableOpacity
                        style={[
                            styles.buttonAddRemove,
                            singleBed === 0 ? { backgroundColor: "#fcfcfd" } : null,
                        ]}
                        disabled={singleBed === 0}
                        onPress={() => setSingleBed(singleBed - 1)}
                    >
                        <MaterialIcons
                            name="remove"
                            size={20}
                            color={singleBed === 0 ? "#333" : "#333"}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.detailsBookingText,
                            { fontSize: 12, marginHorizontal: SPACING.s },
                        ]}
                    >
                        {singleBed}
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonAddRemove}
                        onPress={() => setSingleBed(singleBed + 1)}
                    >
                        <MaterialIcons name="add" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={[
                    styles.containerFdRow,
                    {
                        justifyContent: "space-between",
                        marginHorizontal: SPACING.m,
                        paddingTop: Display.setHeight(1),
                    },
                ]}
            >
                <Text style={[styles.detailsBookingText, { fontSize: 12 }]}>
                    พักเตียงคู่ <Text style={{ fontSize: 10, color: COLORS.primary }}>({doubleBedPrice}฿)</Text>
                </Text>
                <View style={[styles.containerFdRow]}>
                    <TouchableOpacity
                        style={[
                            styles.buttonAddRemove,
                            doubleBed === 0 ? { backgroundColor: "#fcfcfd" } : null,
                        ]}
                        disabled={doubleBed === 0}
                        onPress={() => setDoubleBed(doubleBed - 1)}
                    >
                        <MaterialIcons
                            name="remove"
                            size={20}
                            color={doubleBed === 0 ? "#333" : "#333"}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.detailsBookingText,
                            { fontSize: 12, marginHorizontal: SPACING.s },
                        ]}
                    >
                        {doubleBed}
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonAddRemove}
                        onPress={() => setDoubleBed(doubleBed + 1)}
                    >
                        <MaterialIcons name="add" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={[
                    styles.containerFdRow,
                    {
                        justifyContent: "space-between",
                        marginHorizontal: SPACING.m,
                        paddingTop: Display.setHeight(1),
                    },
                ]}
            >
                <Text style={[styles.detailsBookingText, { fontSize: 12 }]}>
                    พักเตียงสาม <Text style={{ fontSize: 10, color: COLORS.primary }}>({threeBedsPrice}฿)</Text>
                </Text>
                <View style={[styles.containerFdRow]}>
                    <TouchableOpacity
                        style={[
                            styles.buttonAddRemove,
                            threeBeds === 0 ? { backgroundColor: "#fcfcfd" } : null,
                        ]}
                        disabled={threeBeds === 0}
                        onPress={() => setThreeBeds(threeBeds - 1)}
                    >
                        <MaterialIcons
                            name="remove"
                            size={20}
                            color={threeBeds === 0 ? "#333" : "#333"}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.detailsBookingText,
                            { fontSize: 12, marginHorizontal: SPACING.s },
                        ]}
                    >
                        {threeBeds}
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonAddRemove}
                        onPress={() => setThreeBeds(threeBeds + 1)}
                    >
                        <MaterialIcons name="add" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default BookingHotels

const styles = StyleSheet.create({
    detailsBookingText: {
        fontSize: Display.setWidth(2.3),
        fontFamily: "SukhumvitSet-SemiBold",
    },
    containerFdRow: {
        flexDirection: "row",
    },
    buttonAddRemove: {
        alignSelf: "flex-start",
        backgroundColor: "#eeeef1",
        borderRadius: 5,
        paddingHorizontal: 3,
        paddingVertical: 3,
    },
})