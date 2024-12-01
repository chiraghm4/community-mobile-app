import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import PostData from '@/assets/Data/fakeData.json';
import Posts from '@/Components/Posts';


export default function PostsPage() {
  const getPosts = useMemo(() => PostData.dataMedium, []);
  return (
    <View>
      <Posts Postings={getPosts} community="abc" />
    </View>
  )
}