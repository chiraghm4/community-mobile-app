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
  const [authorName, setAuthorName] = useState<string>("Deleted User");
  const [authorPhoto, setAuthorPhoto] = useState<string>("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y");

  useEffect(() => {
    const fetchPost = async (id: string) => {
      try {
        const postRef = collection(db, "posts");
        const getPostQuery = query(postRef, where("__name__", "==", id));
        const postSnapshot = await getDocs(getPostQuery);
  
        if (!postSnapshot.empty) {
          const post = postSnapshot.docs[0];
          const postData = { id: id, ...post.data() };
          if (postData?.userID) {
            try {
              const userRef = collection(db, "users");
              const q = query(userRef, where("userId", "==", postData.userID));
              const querySnapshot = await getDocs(q);
              
              if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const profileUrl = userDoc.data().profileImage;
                const userName = userDoc.data().username;
                
                // Only set values if they exist
                if (userName) setAuthorName(userName);
                if (profileUrl) setAuthorPhoto(profileUrl);
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
              // Keep default values if user fetch fails
            }
          }
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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{post?.title}</Text>
          <View style={styles.authorContainer}>
            <Animated.Image 
              source={{uri: authorPhoto}} 
              style={styles.authorImage}
            />
            <Text style={styles.authorName}>{authorName}</Text>
          </View>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Animated.Image 
            source={{uri: post?.imageURL}} 
            style={styles.mainImage}
          />
        </View>

        {/* Tags Section */}
        <View style={styles.divider} />
        <View style={styles.tagsContainer}>
          {post?.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{post?.desc}</Text>
        </View>
      </Animated.ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => toggleLike(post?.isLiked, post?.id)}
        >
          <MaterialCommunityIcons
              name={post?.isLiked ? 'thumb-up' : 'thumb-up-outline'}
              size={20}
              color={post?.isLiked ? 'black' : 'gray'}
          />
          <Text style={styles.actionText}>{post?.numberOfLikes || 0}</Text>
        </TouchableOpacity>

        <View style={styles.actionDivider} />

        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="comments-o" size={20} color="black" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    fontFamily: 'manro-b',
    flexWrap : 'wrap'
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  authorImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'manro',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F8F8F8',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
    marginHorizontal: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    color: '#666',
    fontFamily: 'manro',
  },
  descriptionContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'manro',
  },
  bottomActions: {
    flexDirection: 'row',
    borderTopWidth: 1.2,
    borderTopColor: '#e3e1e1',
    height: 64,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
    height: '100%',
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'manro',
  },
});

export default PostItem