import {
    Button,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { COLORS, SIZES, images } from "../../constants";
import { Octicons } from "@expo/vector-icons";
import { SPACING } from "../../constants/theme";
const generatePayload = require("promptpay-qr");

interface Props {
    fistname: string;
    lastname: string;
    phonnumber: string;
    email: string;
    price: any;
    hotelsName: string;
    checkInDate: any;
    checkOutDate: any;
    selectRoom: any;
}

const PdfPrintHotels = ({
    fistname,
    lastname,
    phonnumber,
    email,
    price,
    hotelsName,
    checkInDate,
    checkOutDate,
    selectRoom
}: Props) => {
    const [selectedPrinter, setSelectedPrinter] = useState<
        undefined | Print.Printer
    >(undefined);

    let priceWithoutComma = price.replace(",", "");

    const payload = generatePayload("0638288463", {
        amount: Number(priceWithoutComma),
    });

    const size = 200;
    const color = "#000000";
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        payload
    )}&color=${encodeURIComponent(color)}`;

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    };

    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });

        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
           
          }
           th {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 8px;
            
          }
          td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          td:nth-child(1) {
            width: 70%;
          }
          td:nth-child(2) {
            width: 30%;
            text-align: center;
            
            font-weight: bold;
          }
          footer {
            position: fixed;
            bottom: 0;
            right: 0;
           
            
          }
        </style>
        </head>
        <body>
        
        <div style="display: flex; justify-content: space-between;">
        <div style="display: flex; flex-direction: row;  margin-left: 10px; align-items: center;">
        <img
        src="https://media.discordapp.net/attachments/1023477355160813693/1097894279625592923/Logo.png?width=468&height=468"
        style="width: 15vw;" />
  
        <h3 style="">travel.com</h3>
        </div>
  
       
        </div>
  
        <div style="display: flex; margin: 0px 60px 0px 30px;" > <h3>ข้อมูลผู้จอง </h3></div>
        <div style="margin: 0px 30px 0px 30px;">
        <h5>วันที่เช็คอิน: <span style="font-size: 0.750rem;" >${checkInDate}</span></h5>
        <h5>วันที่เช็คเอาท์: <span style="font-size: 0.750rem;" >${checkOutDate}</span></h5>
        <h5>ชิ่อ:  <span style="font-size: 0.750rem;" >${fistname}</span></h5>
        <h5>นามสกุล:  <span style="font-size: 0.750rem;" >${lastname}</span></h5>
        <h5>เบอร์โทรทัพท์:  <span style="font-size: 0.750rem;" >${phonnumber}</span></h5>
        <h5>อีเมล:  <span style="font-size: 0.750rem;" >${email}</span></h5>
        <h5>ประเภทห้อง:  <span style="font-size: 0.750rem;" >${selectRoom}</span></h5>
        </div>
        
       <div style="margin: 0px 30px 0px 30px;">
       <table>
       <tr>
         <th>โรงแรม</th>
         <th>ราคา</th>
       </tr>
       <tr>
        <td>${hotelsName}</td>
        <td>฿ ${price}</td>
       </tr>
  
     </table>
       </div>
        </body>
        <footer>
           <div style={
            display: flex; 
            justify-content: center;}>
           
           <div style={margin: 0px 30px 0px 30px;}>
           <img src=${qrCodeUrl} alt="promptpay-qr" width="100" height="100">
           <h6 style={font-size: 15px; text-align: center;}>สแกนเพื่อชำระเงิน</h6>
           
           </div>
           </div>
          </footer>
      </html>
        `;

    return (
        <TouchableOpacity
            style={[
                styles.btnAdd,
                {
                    marginLeft: SPACING.s,
                    borderColor: COLORS.yellow,
                    flexDirection: "row",
                    alignItems: "center",
                },
            ]}
            onPress={print}
        >
            <Octicons name="hubot" size={14} color={COLORS.yellow} />
            <Text
                style={[
                    styles.detailTextTitle,
                    { fontSize: 12, color: COLORS.yellow, marginLeft: 5 },
                ]}
            >
                pdf
            </Text>
        </TouchableOpacity>
    );
};

export default PdfPrintHotels;

const styles = StyleSheet.create({
    btnAdd: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 3,
        backgroundColor: "#ffffff",
        borderRadius: SIZES.radius,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        marginTop: SPACING.s,
    },
    detailTextTitle: {
        fontSize: 14,
        fontFamily: "SukhumvitSet-SemiBold",
    },
});
