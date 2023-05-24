import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import Divider from "../shared/divider";
import { COLORS, SPACING } from "../../constants/theme";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { format, startOfToday } from "date-fns";

type Props = {
  bottomSheetRef: any;
  setDate: any;
  date: any;
  toDate: any;
  setActiveIndex: any;
};

const BottomSheetSelectDay = ({
  bottomSheetRef,
  setDate,
  date,
  toDate,
  setActiveIndex,
}: Props) => {

  const handleClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const had = (p: any) => {
    const dateString = p.replace(/\//g, '-');
    const isoDateString = dateString + 'T00:00:00.000Z';
    setDate(isoDateString);
    const days = format(new Date(isoDateString), "dd MMM");
    setActiveIndex(days);
    handleClose();
  };

  const renderHeader = () => (
    <>
      <View style={{ marginHorizontal: SPACING.l, marginVertical: SPACING.s }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View />
          <Text
            style={{
              fontSize: 13,
              fontFamily: "SukhumvitSet-SemiBold",
              textAlign: "center",
            }}
          >
            เลือกวันที่
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <MaterialIcons name="close" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Divider enabledSpacing={false} />
    </>
  );

  const snapPoints = useMemo(() => ["1%", "100%"], []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleComponent={renderHeader}
      backgroundStyle={{ backgroundColor: "#fdfdfd" }}
    >
      <View>
        <DatePicker
          mode="calendar"
          minimumDate={toDate}
          maximumDate="2023/12/1"
          options={{
            textHeaderColor: COLORS.primary,
            textDefaultColor: COLORS.black,
            selectedTextColor: "#fff",
            mainColor: COLORS.primary,
            textSecondaryColor: COLORS.black,
            textFontSize: 12,
            defaultFont: "SukhumvitSet-SemiBold",
            headerFont: "SukhumvitSet-Bold",
          }}
          selected={date}
          onDateChange={had}
          locale="th"
        />
      </View>
    </BottomSheet>
  );
};

export default BottomSheetSelectDay;

const styles = StyleSheet.create({
  detailsBookingText: {
    fontFamily: "SukhumvitSet-SemiBold",
  },
  textBold: {
    fontFamily: "SukhumvitSet-Bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
