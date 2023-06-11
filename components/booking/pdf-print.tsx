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
  tirpname: string;
  date: any;
  adults: any;
  children: any;
  hotelsName: any
  singleBad: any
  doubleBed: any
  threeBeds: any
}

const PdfPrint = ({
  fistname,
  lastname,
  phonnumber,
  email,
  price,
  tirpname,
  date,
  adults,
  children,
  hotelsName,
  singleBad,
  doubleBed,
  threeBeds
}: Props) => {
  const [selectedPrinter, setSelectedPrinter] = useState<
    undefined | Print.Printer
  >(undefined);

  let priceWithoutComma = price.replace(",", "");

  const payload = generatePayload("1101801137151", {
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

      <h3 style="">Aumanan Junket</h3>
      </div>

      <h5>วันที่จอง ${date}</h5>
      </div>

      <div style="display: flex; margin: 0px 60px 0px 30px;" > <h3>ข้อมูลผู้จอง </h3></div>
      <div style="margin: 0px 30px 0px 30px;">
      <h5>ชิ่อ:  ${fistname}</h5>
      <h5>นามสกุล:  ${lastname}</h5>
      <h5>เบอร์โทรทัพท์:  ${phonnumber}</h5>
      <h5>อีเมล:  ${email}</h5>
      <h5>${adults !== 0 ? `ผู้ใหญ่: ${adults} คน`  : ''}</h5>
      <h5>${children !== 0 ? `เด็ก: ${children} คน`  : ''}</h5>
      <h5>ที่พัก:  ${hotelsName} คน</h5>
      <h5>${singleBad !== 0 ? `เตี่ยงเดี่ยว: ${singleBad} เตียง`  : ''}</h5>
      <h5>${doubleBed !== 0 ? `เตี่ยงคู่: ${doubleBed} คู่`  : ''} </h5>
      <h5>${threeBeds !== 0 ? `เตี่ยงสาม: ${threeBeds} เตียง`  : ''}</h5>
      </div>
      
     <div style="margin: 0px 30px 0px 30px;">
     <table>
     <tr>
       <th>แพคเกจทัวร์</th>
       <th>ราคา</th>
     </tr>
     <tr>
      <td>${tirpname}</td>
      <td>฿ ${price}</td>
     </tr>

   </table>
     </div>
      </body>
      <footer>
         <div style={
          display: flex; 
          justify-content: center;}>
         
         <div style={}>
         <img src=${qrCodeUrl} alt="promptpay-qr" width="130" height="130">
         
         <h6 style={font-size: 20px; text-align: center; }>สแกนเพื่อชำระเงิน</h6>
        
         
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

export default PdfPrint;

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
