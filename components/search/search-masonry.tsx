import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { COLORS, SPACING } from "../../constants/theme";
import SearchCard from "./search-card";
import LottieView from "lottie-react-native";

interface SearchMasonryProps {
  list: any[];
}

const SearchMasonry = ({ list }: { list: any[] }) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleOnEndReached = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      onScroll={handleOnEndReached}
    >
      <View>
        <MasonryList
          data={list}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.masonry}
          renderItem={({ item, i }) => <SearchCard item={item} index={i} />}
        />

        {loadingMore && (
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={styles.loadingMore}>
              <LottieView
                style={{ height: 45 }}
                source={require("../../assets/images/Boating.json")}
                autoPlay
                loop
              />
              <Text style={styles.loadingText}>กำลังโหลด...</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  masonry: {
    paddingHorizontal: SPACING.m,
  },
  loadingMore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
   
  },
  loadingText: {
    fontSize: 11,
    color: COLORS.slate,
    marginLeft: 5
  },
});

export default SearchMasonry;
