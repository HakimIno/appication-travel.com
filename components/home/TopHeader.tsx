import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

const TopHeader: React.FC<{title: string, scrollY: any}> = ({title, scrollY}) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View>
        <Text>{title}</Text>
      </View>
    </>
  );
};

export default TopHeader;

const styles = StyleSheet.create({});
