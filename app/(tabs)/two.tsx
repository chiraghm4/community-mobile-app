import { StyleSheet, Image, Text } from 'react-native';
import React, { useMemo } from 'react';
import { View } from '@/components/Themed';
import PostData from '@/assets/Data/fakeData.json';
import Posts from '@/components/Posts/Posts';


export default function two() {
  const getPosts = useMemo(() => PostData.dataMedium, []);
  
  return (
    <View>
      <Posts Postings={getPosts} community="abc" />
    </View>
  );
}

const styles = StyleSheet.create({
  
});



