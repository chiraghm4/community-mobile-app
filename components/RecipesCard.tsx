import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ListRenderItemInfo,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { setPostAsFavourite } from "@/helpers/hSetFavouritePosts";
export interface RecipeInf {
  id: number;
  title: string;
  desc: string;
}

interface Props {
  Postings: RecipeInf[];
  // community: string;
  // onUpdatePost?: (updatedPost: PostInf) => void;  // Add this
}

// const router = useRouter();

const RecipeCard = ({ Postings }: Props) => {
  const postsRef = useRef<FlatList>(null);

  //Custom Seperator component
  const renderSeparator = () => (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );

  const renderRow: ListRenderItem<RecipeInf> = ({
    item,
  }: ListRenderItemInfo<RecipeInf>) => {
    const maxLength = 100;
    const truncatedDescription =
      item.desc.length > maxLength
        ? `${item.desc.substring(0, maxLength)}...`
        : item.desc;
    return (
      <TouchableOpacity
      // onPress={() => router.push(`/Post/${item.id}`)}
      >
        <Animated.View
          style={styles.row}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Text style={styles.titleTxt}>{item.title}</Text>
          <View style={styles.descContainer}>
            <Text style={styles.description}>{truncatedDescription}</Text>
            {item.hasOwnProperty("image") ? (
              <Image source={{ uri: item?.image }} style={styles.sideImg} />
            ) : null}
          </View>
            
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        ref={postsRef}
        data={Postings}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: "manro-b",
    fontSize: 20,
    padding: 5,
  },
  row: {
    padding: 20,
    borderColor: "#ddd",
  },
  sideImg: {
    width: "20%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  descContainer: {
    padding: 5,
    flexDirection: "row",
    width: "100%",
    paddingTop: 10,
  },
  description: {
    width: "80%",
    fontFamily: "manro-sb",
    paddingRight: 10,
    fontSize: 12,
  },
  bottomContainer: {
    flexDirection: "row",
    gap: 80,
    justifyContent: "center",
    paddingTop: 20,
  },
  separatorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "60%",
    height: 1,
    backgroundColor: "#ddd",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "hidden",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 12,
    fontSize: 12,
    color: "#555",
  },
});

export default RecipeCard;
