import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SPACING } from "../../constants/theme";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Display from "../../utils/Display";

type Props = {
  adults: any;
  setAdults: any;
  children: any;
  setChildren: any;
  activeIndex: any;
  price: any
  childrenPrice: any
  setPersonThree: any;
  personThree: any
};

const BookingMany = ({
  adults,
  setAdults,
  children,
  setChildren,
  activeIndex,
  price,
  childrenPrice,

}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View
        style={{
          paddingHorizontal: Display.setWidth(2),
          height: Display.setHeight(16),
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
          <Octicons name="person" size={15} color="#707070" />
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
            ผู้ใหญ่/เด็ก (บาท/ท่าน)
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderStyle: "dashed",
            borderColor: "#e2e2e2",
          }}
        />

        <View
          style={[
            styles.containerFdRow,
            {
              justifyContent: "space-between",
              marginHorizontal: SPACING.m,
              paddingVertical: Display.setHeight(1),
            },
          ]}
        >
          <Text style={[styles.detailsBookingText, { fontSize: 12 }]}>
            ผู้ใหญ่ <Text style={{ fontSize: 10, color: COLORS.primary }}>({price}฿)</Text>
          </Text>
          <View style={[styles.containerFdRow]}>
            <TouchableOpacity
              style={[
                styles.buttonAddRemove,
                adults === 0 ? { backgroundColor: "#fcfcfd" } : null,
              ]}
              disabled={adults === 0}
              onPress={() => setAdults(adults - 1)}
            >
              <MaterialIcons
                name="remove"
                size={20}
                color={adults === 0 ? "#333" : "#333"}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.detailsBookingText,
                { fontSize: 12, marginHorizontal: SPACING.s },
              ]}
            >
              {adults}
            </Text>
            <TouchableOpacity
              style={styles.buttonAddRemove}
              onPress={() => {
                if (activeIndex === "") {
                  setModalVisible(true);
                } else {
                  setAdults(adults + 1);
                }
              }}
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
              paddingVertical: Display.setHeight(1),
            },
          ]}
        >
          <Text style={[styles.detailsBookingText, { fontSize: 12 }]}>
            เด็ก <Text style={{ fontSize: 10, color: COLORS.primary }}>({childrenPrice}฿)</Text>
          </Text>
          <View style={[styles.containerFdRow]}>
            <TouchableOpacity
              style={[
                styles.buttonAddRemove,
                children === 0 ? { backgroundColor: "#fcfcfd" } : null,
              ]}
              disabled={children === 0}
              onPress={() => setChildren(children - 1)}
            >
              <MaterialIcons name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <Text
              style={[
                styles.detailsBookingText,
                { fontSize: 12, marginHorizontal: SPACING.s },
              ]}
            >
              {children}
            </Text>
            <TouchableOpacity
              style={styles.buttonAddRemove}
              onPress={() => {
                if (activeIndex === "") {
                  setModalVisible(true);
                } else {
                  setChildren(children + 1);
                }
              }}
            >
              <MaterialIcons name="add" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              style={styles.modalContainer}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text
                  style={[
                    styles.detailsBookingText,
                    { fontSize: 10, color: "#fff" },
                  ]}
                >
                  โปรดเลือกวันที่
                </Text>
              </View>
            </Pressable>
          </Modal>
        </View>
      </View>
    </>
  );
};

export default BookingMany;

const styles = StyleSheet.create({
  containerFdRow: {
    flexDirection: "row",
  },
  detailsBookingText: {
    fontSize: 10,
    fontFamily: "SukhumvitSet-SemiBold",
  },
  buttonAddRemove: {
    alignSelf: "flex-start",
    backgroundColor: "#eeeef1",
    borderRadius: 5,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1f1f1f",
    padding: 10,
    borderRadius: 5,
  },
});
