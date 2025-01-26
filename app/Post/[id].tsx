import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Animated from 'react-native-reanimated';
import { PostInf } from '@/components/Posts';
import { db } from '@/firestore';
import { collection,getDocs, query, where } from 'firebase/firestore';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { likePost, removeLikeFromPost } from '@/helpers/hLikeUnlikePosts';
import { getAuth } from "firebase/auth";

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
          const postData = { id: id, ...post.data() };
    
          // Check if post is liked by current user
          const auth = getAuth();
          const currUser = auth.currentUser;
          
          const likesRef = collection(db, "likes");
          const likedPostQuery = query(
            likesRef, 
            where("userid", "==", currUser?.uid),
            where("postid", "==", id)
          );
          const likedPostSnapshot = await getDocs(likedPostQuery);
    
          // Count total likes for this post
          const allLikesQuery = query(likesRef, where("postid", "==", id));
          const allLikesSnapshot = await getDocs(allLikesQuery);
    
          return {
            ...postData,
            isLiked: !likedPostSnapshot.empty,
            numberOfLikes: allLikesSnapshot.size
          };
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

  const toggleLike = async (isLiked : boolean, id: string) => {
    if(isLiked){
        await removeLikeFromPost(id);
        setPost(prevPost => ({
          ...prevPost,
          isLiked: false,
          numberOfLikes: (prevPost?.numberOfLikes || 1) - 1
        }));
    }
    else{
        await likePost(id);
        setPost(prevPost => ({
          ...prevPost,
          isLiked: true,
          numberOfLikes: (prevPost?.numberOfLikes || 0) + 1
        }));
    }
  };  


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
      <View style={styles.bottomContainer}>
            <View style={styles.likeContainer}>
              <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(post?.isLiked,post?.id)}>
                    <MaterialCommunityIcons
                        name={post?.isLiked ? 'thumb-up' : 'thumb-up-outline'}
                        size={20}
                        color={post?.isLiked ? 'black' : 'gray'}
                    />
                    <Text style={styles.likeCount}>
                      {post?.numberOfLikes}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.commentContainer}>
              <TouchableOpacity onPress={() => console.log('Comments clicked')}>
                  <FontAwesome name="comments-o" size={20} color="black" />
              </TouchableOpacity>
            </View>
      </View>
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
    flexWrap: 'wrap',     
    overflow: 'hidden',     
    marginTop: 10,
    alignSelf : 'center',
    justifyContent: 'center',
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
  bottomContainer : {
    width : '100%',
    height : '8%',
    //backgroundColor : 'red',
    flexDirection : 'row',
    fontFamily : 'manro',
    fontSize : 16,
    fontWeight : 600,
    borderTopColor : '#f0f0f0',
    borderTopWidth : 2,
  },
  likeContainer : {
    width : '50%',
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row',
    //backgroundColor : 'green',
    borderRightColor : '#f0f0f0',
    borderRightWidth : 2,
  },
  commentContainer : {
    width : '50%',
    alignItems : 'center',
    justifyContent : 'center'
    //backgroundColor : 'blue',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
});

export default PostItem