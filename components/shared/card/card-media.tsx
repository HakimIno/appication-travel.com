import { Image, StyleSheet, View } from "react-native";

interface Props {
  source: string;
  borderBottomRadius?: boolean;
}

const CardMedia = ({ source, borderBottomRadius = false }: Props) => {

  return (
    <View
      style={[
        styles.media,
        borderBottomRadius
          ? styles.borderBottomRadius
          : null,
      ]}
    >
      {source && (
        <Image
          style={styles.image}
          source={{
            uri: source,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  borderBottomRadius: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default CardMedia;
