import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Animated from 'react-native-reanimated';
import { PostInf } from '@/components/Posts';
import { db } from '@/firestore';
import { collection,getDocs, query, where } from 'firebase/firestore';

const PostItem = () => {
  const { id } = useLocalSearchParams<{id : string}>();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async (id: string) => {
      try {
        const postRef = collection(db, "posts");
        const getPostQuery = query(postRef, where("__name__", "==", id));
        const postSnapshot = await getDocs(getPostQuery);
  
        if (!postSnapshot.empty) {
          const post = postSnapshot.docs[0];
          return { id: id, ...post.data() };
        } else {
          console.log("No Matching Post Found");
          return null;
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        return null;
      }
    };
  
    const getAndSetPost = async () => {
      try {
        const postData = await fetchPost(id);
        setPost(postData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getAndSetPost();
  },[id])

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style = {styles.container}>
      <Animated.ScrollView>
        <Animated.View style = {styles.authorDetails}>
          <Animated.Image source={{uri : post?.image}} style = {styles.authorImage}></Animated.Image>
        </Animated.View>
        <Animated.Text style = {styles.Title}>{[post?.title]}</Animated.Text>
        <Animated.View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </Animated.View>
        <Animated.Image source = {{uri : post?.image}} style = {styles.ImageStyle}/>
        <Animated.View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </Animated.View>
        <View style={styles.tagsContainer}>
                {post?.tags.map((tag, index) => (
                    <Text key={index} style={styles.tag}>
                        {tag}
                    </Text>
                ))}
        </View>
        <Animated.View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </Animated.View>
        <Animated.View style = {styles.DescContainer}>
          <Text style = {styles.Description}>{post?.desc}</Text>
        </Animated.View>
      </Animated.ScrollView >
    </View>
  )
}

const styles = StyleSheet.create({
  authorImage : {
    height : '150%',
    aspectRatio : 1,
    borderRadius : 50,
    resizeMode : 'cover',
    marginLeft : '7%',
  },
  authorDetails : {
    flexDirection : 'column',
    paddingVertical : '5%',
    height : '6%',
  },
  container : {
    flex : 1,
    flexDirection : 'column',
    backgroundColor : "#FFFFFF",
  },
  ImageStyle : {
    width : '90%',
    height : 240,
    resizeMode : 'contain',
    alignSelf : 'center',
  },
  separatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '60%', 
    height: 2,   
    backgroundColor: '#ddd', 
  },
  DescContainer : {
    fontSize : 18,
    fontWeight : 500, 
    padding : '7%'
  },
  Description : {
    fontFamily : 'manro',
    fontSize : 16,
    fontWeight : 600
  },
  Title : {
    fontFamily : 'manro-b',
    paddingVertical : '5%',
    paddingHorizontal : '7%',
    fontSize : 22,
  },
  tagsContainer: {
    flexDirection: 'row', 
    flexWrap: 'nowrap',     
    overflow: 'hidden',     
    marginTop: 10,
    alignSelf : 'center'
},
tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 12,         
    fontSize: 16,
    color: '#555',            
},
});

export default PostItem