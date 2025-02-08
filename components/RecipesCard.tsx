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
import RecipeModal from "./RecipeModal";
export interface RecipeInf {
  id: number;
  title: string;
  desc: string;
  imgURL: string
}

interface Props {
  Recipes: RecipeInf[];
  // community: string;
  // onUpdatePost?: (updatedPost: PostInf) => void;  // Add this
}

// const router = useRouter();

const RecipeCard = ({ Recipes }: Props) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeInf | null>(null);

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
    const hasImage = item.hasOwnProperty("imgURL") && item.imgURL.length > 0;

    return (
      <TouchableOpacity onPress={() => setSelectedRecipe(item)}>
        <Animated.View
          style={styles.row}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Text style={styles.titleTxt}>{item.title}</Text>
          <View style={styles.descContainer}>
            <Text style={styles.description}>{truncatedDescription}</Text>
            {hasImage && (
              <Image source={{ uri: item?.imgURL }} style={styles.sideImg} />
            )}
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
        data={Recipes}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />

      <RecipeModal
        isVisible={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe || { title: "", desc: "", imgURL: "" }}
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
    height: "100%",
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
