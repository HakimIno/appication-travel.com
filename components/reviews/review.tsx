import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Divider from "../shared/divider";
import Rating from "../shared/Rating/rating";
import { COLORS, SIZES, SPACING } from "../../constants/theme";
import { TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TripDetails"
>;

const Review = ({ review }: any) => {

  const navigation = useNavigation<CurrentScreenNavigationProp>();
  
  return (
    <>

      <View style={styles.container}>
        <View style={styles.header}>

          <View style={styles.userBox}>
            <Image
              source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fbig%2F133-1331433_free-user-avatar-icons-happy-flat-design-png.png&f=1&nofb=1&ipt=0144a5bb7e8aa21c3a723dae791c2a20313de739c232baceb048ce5c7930f350&ipo=images' }}
              style={{ width: 40, height: 40, borderRadius: 30 }} />
            <View style={{ marginHorizontal: SPACING.s }}>
              <Text style={styles.user}>{review.author.username ? review.author.username : review.author}</Text>
              <Text style={styles.date}>{review.date}</Text>
            </View>
          </View>
          <Rating rating={Number(review.rating)} showLabelTop />
        </View>
        <Text style={styles.text}>{review.text}</Text>


        {review.imageReview && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {review.imageReview.map((item: string, index: number) => (
              <View key={index}>
                {item && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('FullScreenImage', { imageUrl: [...review.imageReview] })}
                  >
                    <SharedElement id={`image.${item}`}>
                      <Image
                        key={index}
                        source={{ uri: item }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: SIZES.radius,
                          marginVertical: 5,
                          marginHorizontal: 5,
                        }}
                      />
                    </SharedElement>
                  </TouchableOpacity>
                )}
              </View>
            ))}

          </View>
        )}
      </View>
      <Divider enabledSpacing={false} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.l,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  avatar: {
    height: 35,
    width: 35,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: SPACING.s,
  },
  userBox: {
    flex: 1,
    marginRight: SPACING.s,
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
    color: COLORS.gray,
    fontSize: 13,
    fontFamily: "SukhumvitSet-SemiBold",
  },
  date: {
    fontSize: 11,
    color: COLORS.lightGray,
  },
  text: {
    color: COLORS.gray,
    fontSize: 12,
    fontFamily: "SukhumvitSet-Medium",
    marginHorizontal: SPACING.s
  },
});

export default Review;
