const USERS = {
  1: {
    id: 1,
    username: "Alexia Jane",
    avatar:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-512%2Favatar-367-456319.png&f=1&nofb=1&ipt=e4606a914b937210150514ffa329ecb38f00a9a4e60ce6903de5f767077d0f96&ipo=images",
  },
  2: {
    id: 2,
    username: "Jacky Depp",
    avatar:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fbig%2F133-1331433_free-user-avatar-icons-happy-flat-design-png.png&f=1&nofb=1&ipt=e60d1c95a493622812e4874a52822e1e9b8ed5656cfcbfaed1271c9635e11a7b&ipo=images",
  },
};

const REVIEWS = {
  1: {
    id: 1,
    date: "21 May, 2022",
    author: USERS[1],
    rating: 7,
    text: "Lorem ipsum dolor sit amet. Iusto nihil et porro soluta ut labore nesciunt sed dolor nihil qui laudantium consequatur",
  },
  2: {
    id: 2,
    date: "14 July, 2021",
    author: USERS[2],
    rating: 9.1,
    text: "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
  },
  3: {
    id: 3,
    date: "14 July, 2021",
    author: USERS[2],
    rating: 9.1,
    text: "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
  },
  4: {
    id: 4,
    date: "14 July, 2021",
    author: USERS[2],
    rating: 9.1,
    text: "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
  },
  5: {
    id: 5,
    date: "14 July, 2021",
    author: USERS[2],
    rating: 9.1,
    text: "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
  },
};

export const HOTELS = {
  1: {
    id: 1,
    title: "Argos in Cappadocia",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/cp-1.jpeg?raw=true",
    location: "Turkey, Cappadocia",
    description: "อารามแห่งนี้ได้รับรางวัลเมื่อได้รับอารามห้องพักที่ได้รับการตกแต่งอย่างมีเอกลักษณ์เฉพาะตัว ให้บริการที่พักกระจายอยู่ทั่วอาคารหินธรรมชาติหลายแห่ง ห้องพักแต่ละห้องมีบริการอินเทอร์เน็ตไร้สาย (Wi-Fi) ฟรี ห้องพักบางห้องมีวิวทิวทัศน์อันน่าทึ่งของ Pigeon Valley หรือพื้นที่กลางแจ้งส่วนตัว ห้องพักทุกห้องมีรูปแบบดั้งเดิมรวมทั้งงานแกะสลักหินอันปราณีตและเฟอร์นิเจอร์โบราณ ห้องพักมีห้องน้ำส่วนตัว ห้องพักหลายห้องมีเตาผิงแบบเปิดและแท่นวาง iPod ห้องพักบางห้องสามารถเข้าถึงได้โดยใช้อุโมงค์ใต้ดินและมีเพดานโค้ง ห้องอาหาร Seki Restaurant ของโรงแรมให้บริการอาหารท้องถิ่นและอาหารนานาชาติหลากหลายรายการทั้งในร่มหรือกลางแจ้งพร้อมวิวของ Güvercinlik Vallet และวิว Erciyes Mountain มีบริการไวน์หลากหลายชนิดซึ่งผลิตจากไร่องุ่นของโรงแรมและเก็บไว้ในถังใต้ดิน ที่พักมีบริการรถรับส่งสนามบินจากสนามบินที่อยู่ใกล้ที่สุดโดยมีค่าธรรมเนียมเพิ่มเติม ผู้เข้าพักสามารถเที่ยวชมสถานที่ต่าง ๆ ได้ และมีกิจกรรมขี่บอลลูนลมร้อน",
    rating: 9,
    pricePeerDay: "130",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],
  },
  2: {
    id: 2,
    title: "Sultan Cave Suites",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/cp-2.jpeg?raw=true",
    location: "Turkey, Cappadocia",
    description: "",
    rating: 9.3,
    pricePeerDay: "230",
    reviews: [REVIEWS[2], REVIEWS[4], REVIEWS[5]],
  },
  3: {
    id: 3,
    title: "Villa Brunella",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/capri-1.jpeg?raw=true",

    location: "Italy, Capri",
    description: "",
    rating: 9.4,
    pricePeerDay: "280",
    reviews: [REVIEWS[2], REVIEWS[5]],
  },
  4: {
    id: 4,
    title: "Hotel La Floridiana",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/capri-2.jpeg?raw=true",
    location: "Italy, Capri",
    description: "",
    rating: 9.3,
    pricePeerDay: "190",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3],],
  },
  5: {
    id: 5,
    title: "Le Taha'a by Pearl Resorts",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/polynesia-1.jpeg?raw=true",
    location: "Polynesia, Bora Bora",
    description: "",
    rating: 9.2,
    pricePeerDay: "250",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],
  },
  6: {
    id: 6,
    title: "Le Meridien Bora Bora",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/polynesia-2.jpeg?raw=true",
    location: "Polynesia, Bora Bora",
    description: "",
    rating: 9.4,
    pricePeerDay: "270",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],
  },
  7: {
    id: 7,
    title: "InterContinental Phuket Resort",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/phuket-1.jpg?raw=true",
    location: "Thailand, Phuket",
    description: "",
    rating: 9.2,
    pricePeerDay: "210",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],
  },
  8: {
    id: 8,
    title: "The Nai Harn",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/phuket-2.jpeg?raw=true",
    location: "Thailand, Phuket",
    description: "",
    rating: 9.4,
    pricePeerDay: "430",
    reviews: [REVIEWS[2], REVIEWS[5]],
  },
  9: {
    id: 9,
    title: "Hotel Poseidon",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/ac-1.jpeg?raw=true",
    location: "Italy, Amalfi Coast",
    description: "",
    rating: 9.2,
    pricePeerDay: "330",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],
  },
  10: {
    id: 10,
    title: "Le Agavi Hotel",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/ac-2.jpeg?raw=true",
    location: "Italy, Amalfi Coast",
    description: "",
    rating: 9.4,
    pricePeerDay: "350",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],
  },
  11: {
    id: 11,
    title: "Hotel Casa 1800 Granada",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/granada-1.jpeg?raw=true",
    location: "Spain, Granada",
    description: "",
    rating: 9.2,
    pricePeerDay: "230",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],

  },
  12: {
    id: 12,
    title: "Parador de Granada",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/granada-2.jpeg?raw=true",
    location: "Spain, Granada",
    description: "",
    rating: 9.4,
    pricePeerDay: "120",
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[4], REVIEWS[5]],
  },

  13: {
    id: 13,
    title: "Konansou",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/cp-1.jpeg?raw=true",
    location: "Japan, Cherry blossoms",
    description: "",
    rating: 9.2,
    pricePeerDay: "740",
    reviews: [REVIEWS[3], REVIEWS[4], REVIEWS[5]],
  },
  14: {
    id: 14,
    title: "Shuhokaku Kogetsu",
    image:
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/cb-2.jpeg?raw=true",
    location: "Japan, Cherry blossoms",
    description: "",
    rating: 9.4,
    pricePeerDay: "240",
    reviews: [REVIEWS[2], REVIEWS[1],],
  },
};

export const TOP_PLACES = [
  {
    id: 1,
    image:
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/2082f59465c39094ce90bebd0fcf8fa7.jpeg?raw=true",
    title: "Amalfi",
    location: "Italy",
    description:
      "",
    gallery: [
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875631.jpg&f=1&nofb=1&ipt=b878ae891b31dc4f0877e4a27df1c27b77352145c6f680e70596705dfbf78904&ipo=images",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    ],
    tripsDay: "5 วัน 3 คืน",
    rating: 9.2,
    detailsTripsDay: [
      "กรุงเทพฯ",
      "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
      "กรุงเทพฯ",
      "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
      "กรุงเทพฯ",
    ],
    hotels: [HOTELS[9], HOTELS[10]],
    reviews: [REVIEWS[2], REVIEWS[1], REVIEWS[3], REVIEWS[4], REVIEWS[5]],
    price: '32322',
    type: "PLACE",
  },
  {
    id: 2,
    image:
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
    title: "Granada",
    location: "Spain",
    rating: 9.2,
    description:
      "Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain",
    gallery: [
      "https://github.com/azdravchev/Travel-App/blob/details_screen_bottom_sheet/assets/images/hotels/cp-1.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875631.jpg&f=1&nofb=1&ipt=b878ae891b31dc4f0877e4a27df1c27b77352145c6f680e70596705dfbf78904&ipo=images",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    ],
    tripsDay: "2 วัน 1 คืน",
    detailsTripsDay: [
      "กรุงเทพฯ",
      "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
    ],
    hotels: [HOTELS[11], HOTELS[12]],
    reviews: [REVIEWS[1], REVIEWS[2]],
    price: '42662',
    type: "PLACE",
  },
  {
    id: 3,
    image:
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/e57a2a310330ee1d8928eb75d416a53d.jpeg?raw=true",
    title: "Cherry blossoms",
    location: "Japan",
    rating: 9.2,
    description:
      "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    gallery: [
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875631.jpg&f=1&nofb=1&ipt=b878ae891b31dc4f0877e4a27df1c27b77352145c6f680e70596705dfbf78904&ipo=images",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    ],
    tripsDay: "5 วัน 3 คืน",
    detailsTripsDay: [
      "กรุงเทพฯ",
      "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
      "กรุงเทพฯ",
      "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
      "กรุงเทพฯ",
    ],
    hotels: [HOTELS[13], HOTELS[14]],
    reviews: [REVIEWS[2], REVIEWS[1]],
    price: '22662',
    type: "PLACE",
  },
];

export const PLACES = [
  {
    id: 4,
    image:
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/645d5f28e26c7de2a280f71db15c2141.jpeg?raw=true",
    title:
      "ทัวร์ตุรกี อิสตันบูล ชานัคคาเล่ ปามุคคาเล by Turkish Airlines 9 วัน 6 คืน",
    location: "ตุรกี",
    description:
      "นำชมสุเหร่าสีน้ำเงิน ถ่ายภาพที่ฮิปโปโดรม นำชมสุเหร่าเซนต์โซเฟีย พระราชวังทอปกาปี ม้าไม้จำลอยเมืองทรอยริมทะเล ปราสาทปุยฝ้าย เมืองคอนย่า คัปปาโดเกีย ชานัคคาเล่ ปามุคคาเล่ นครใต้ดินชาดัค หุบเขาแห่งรัก พิพิทธภัณฑ์กลางแจ้ง ปราสาทหินอุซิซาร์ สุสานอตาเติร์ก ทะเลสาบเกลือ ชมเมืองอิสตันบูล Salt Bae ลิ้มรสสเต็กรสเด็ด ชื่อดัง",
    rating: 8.0,
    gallery: [
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2875631.jpg&f=1&nofb=1&ipt=b878ae891b31dc4f0877e4a27df1c27b77352145c6f680e70596705dfbf78904&ipo=images",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    ],
    tripsDay: "9 วัน 6 คืน",
    detailsTripsDay: [
      "กรุงเทพฯ",
      "อิสตันบูล - สุเหร่าสีน้ำเงิน – ฮิปโปโดรม - สุเหร่าฮาเกีย โซเฟีย –พระราชวังทอปกาปิ – เมืองชานัคคาเล่",
      "ม้าไม้จำลองเมืองทรอยริมทะเล – เมืองปามุคคาเล – เมืองโบราณเฮียราโพลิส –ปราสาทปุยฝ้าย",
      "เมืองคอนย่า – ที่พักคาราวานเซราย – พิพิธภัณฑ์เมฟลานา – เมืองคัปปาโดเกีย",
      "นครใต้ดินชาดัค – หุบเขานกพิราบ – หุบเขาแห่งรัก -  พิพิธภัณฑ์กลางแจ้ง –โรงงานเซรามิค",
      "เมืองอังการา – สุสานอตาเติร์ก – ทะเลสาบเกลือ",
      "เมืองอิสตันบูล - เมืองซาแฟรนโบลู– spice bazaar – จตุรัสทักซิมสแควร์",
      "Balat old houses – หอคอยกาลาตา-Galata Port-สนามบินอิสตันบูล",
      "สนามบินสุวรรณภูมิ",
    ],
    hotels: [HOTELS[1], HOTELS[2], HOTELS[3]],
    reviews: [REVIEWS[1], REVIEWS[2]],
    price: '12662',
    type: "PLACE",
  },
  {
    id: 5,
    image:
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",

    title:
      "ทัวร์อิตาลี มิลาน เกาะเวนิส เกาะคาปรี โรม by Qatar Airways 9 วัน 6 คืน",
    location: "อิตาลี",
    description:
      "มหาวิหารดูโอโม ปราสาทสฟอร์เซสโก้ เวโรน่า ล่องเรือกอนโดล่า จตุรัสซานมาโค ฟลอเรนซ์ โบสถ์ซานตา มาเรีย LA REGGIA DESGNER OUTLET หอเอนปิซ่า เซียน่า นาโปลี ปอมเปอี วาติกัน มหาวิหารเซ็นต์ปีเตอร์ โคลอสเซียม น้ำพุเทรวี่ วิหารแพนธีออน บันไดสเปน",
    rating: 9.1,
    gallery: [
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/2082f59465c39094ce90bebd0fcf8fa7.jpeg?raw=true",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    ],
    tripsDay: "8 วัน 6 คืน",
    hotels: [HOTELS[3], HOTELS[4]],
    reviews: [REVIEWS[2], REVIEWS[1]],
    price: '52662',
    type: "PLACE",
  },
  {
    id: 6,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    title: "แพ็คเกจทัวร์เวียดนาม เวียดนามเหนือ ฮานอย ลาวไก ซาปา 3 วัน 2 คืน",
    location: "เวียดนาม",
    description:
      "ไม่รวมตั๋วเครื่องบิน - 2 ท่านก็เดินทางได้ #เที่ยวเวียดนาม #เที่ยวเวียดนามเหนือ",
    rating: 8.9,
    gallery: [
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/2082f59465c39094ce90bebd0fcf8fa7.jpeg?raw=true",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    ],
    tripsDay: "10 วัน 7 คืน",
    hotels: [HOTELS[5], HOTELS[6]],
    reviews: [REVIEWS[2], REVIEWS[1]],
    price: '10662',
    type: "PLACE",
  },
  {
    id: 7,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4609638.jpg&f=1&nofb=1&ipt=ade7833a0b74c6f0ebf6234b6b4af4e30a8b23b92296f5ca21dd6baef1b967ea&ipo=images",
    title: "แพ็คเกจในประเทศ ภูเก็ต เกาะเฮ หาดกล้วย",
    location: "ไทย",
    description:
      "Phuket is the largest island in Thailand. It is located in the Andaman Sea in southern Thailand",
    rating: 8.9,
    gallery: [
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/eea622430834cb64b900c2f03e5be6b8.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/922a0cb274208ccd234f6c14f2174b8b.jpeg?raw=true",
      "https://github.com/azdravchev/Travel-App/blob/home_screen/assets/images/2082f59465c39094ce90bebd0fcf8fa7.jpeg?raw=true",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravel.mthai.com%2Fapp%2Fuploads%2F2019%2F06%2FSAPA-1024x684.jpg&f=1&nofb=1&ipt=f0205a60d71702a4a1f7477c129fb02c6d487f7e3db0c460259e0683833dd6f9&ipo=images",
    ],
    tripsDay: "3 วัน 2 คืน",
    hotels: [HOTELS[7], HOTELS[8]],
    reviews: [REVIEWS[2], REVIEWS[1]],
    price: '12662',
    type: "PLACE",
  },
];

export const PROMOTION = [
  { id: 1, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.2gees.com%2Fwp-content%2Fuploads%2F2018%2F07%2Fagoda_banner.jpg&f=1&nofb=1&ipt=3867dbe77a9400df072b5eea4f617189523bf823a22d018b4ed117154e951fbd&ipo=images" },
  { id: 2, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hashcorner.com%2Fwp-content%2Fuploads%2F2022%2F01%2FWelcomeback-agoda-asia.jpg&f=1&nofb=1&ipt=1bb24db4d061254821dea7623a233b6ac0ea9fb14b9aa1bfca686a236117052d&ipo=images" },

]

export const SEARCH_PLACES = [...PLACES, ...TOP_PLACES].map((item) => ({
  ...item,
  id: Math.random().toString(),
}));

export const SEARCH_HOTELS = [...Object.values(HOTELS)].map((item) => ({
  ...item,
  id: Math.random().toString(),
}));

export const SEARCH_ALL = [...SEARCH_PLACES, ...SEARCH_HOTELS];
