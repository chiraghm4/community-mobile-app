import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CommunitiesData from "@/assets/Data/fakeCommunitiesData.json";
import CommunitiesComp from "@/components/Communities";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firestore";

const CommunitiesPage = () => {
  const getComunities = useMemo(() => CommunitiesData.dataMedium, []);

  const [allComms, setAllComms] = useState([]);

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const query = getDocs(collection(db, "communities"));
        const communities = (await query).docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllComms(communities)
      } catch (e) {
        console.log(e);
      }
    };

    getCommunities()
  }, []);

  return (
    <View>
      <CommunitiesComp CommunitiesInfo={allComms} />
    </View>
  );
};

export default CommunitiesPage;

