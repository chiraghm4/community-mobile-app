import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import CommunitiesData from "@/assets/Data/fakeCommunitiesData.json";
import CommunitiesComp from "@/components/Communities";
import { getAllCommunities } from "@/helpers/hSubscribeToComm";

const CommunitiesPage = () => {
  // const allCommunities = useMemo(() => CommunitiesData.dataMedium, []);
  const [allCommunities, setAllCommunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCommunities, setFilteredCommunities] =
    useState(allCommunities);

  useEffect(() => {
    const fetchAllComms = async () => {
      try {
        const allCommsData = await getAllCommunities();

        setAllCommunities(allCommsData);
        setFilteredCommunities(allCommsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllComms();
  }, []);

  const handleSearch = (text: any) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredCommunities(allCommunities);
    } else {
      const filtered = allCommunities.filter((community) =>
        community.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCommunities(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredCommunities(allCommunities);
  };

  console.log(allCommunities, "all comms");

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={24}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchField}
          placeholder="Search communities..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={clearSearch}
            style={styles.clearIconContainer}
          >
            <AntDesign name="closecircle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.container}>
        <CommunitiesComp CommunitiesInfo={filteredCommunities} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 6,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchField: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  clearIconContainer: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
  },
});

export default CommunitiesPage;
