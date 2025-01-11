import { View, Text, StyleSheet, TextInput, TouchableOpacity } from
'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { db } from '@/firestore'
import Posts from "@/components/Posts";
import { hGetFavouritePostsData } from '@/helpers/hGetFavouritePostsData'
import { query, collection, onSnapshot, documentId, getDocs, where }
from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { fetchPostsByCommunities } from '@/helpers/hGetUsersPosts';
const FavouritesPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  // Function to update a single post's data

  
  const fetchLikedPostsByUsers = async () => {
    try {
      const auth = getAuth();
      const currUser = auth.currentUser;
      
      if (!currUser) {
        throw new Error("No authenticated user found");
      }

      const refToGetLikedPosts = collection(db, "likes");
      const queryToGetLikedPosts = query(
        refToGetLikedPosts,
        where("userid", "==", currUser.uid)
      );
      const likedPostsSnapshot = await getDocs(queryToGetLikedPosts);
      console.log(currUser.uid);
      return likedPostsSnapshot.docs.map(doc => {
        return doc.data().postid;
      });
    } catch (error) {
      console.error("Error fetching liked posts:", error);
      throw error;
    }
  };

  const handleSearch = (text : any) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredPosts(posts);
  };

  const handleUpdatePost = (updatedPost : any) => {
  setPosts(currentPosts =>
      currentPosts.map(post =>
        post.docID === updatedPost.docID ? updatedPost : post
      )
    );
  };


  useEffect(() => {
    const auth = getAuth();
    const currUser = auth.currentUser;

    if (!currUser) return;

    // Listen to changes in user's favorites
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("userId", "==", currUser.uid));

    const unsubscribe = onSnapshot(userQuery, async (userSnapshot) => {
      try {
        // Get favorite post IDs from user document
        const favouritePosts = userSnapshot.docs[0]?.data()?.favourites || [];

        if (!favouritePosts.length) {
          setPosts([]);
          setFilteredPosts([]);
          return;
        }

        // Filter valid IDs
        const validFavorites = favouritePosts.filter(id => id &&
typeof id === 'string' && id.length > 0);

        if (!validFavorites.length) {
          setPosts([]);
          setFilteredPosts([]);
          return;
        }

        // Get posts data
        const postsRef = collection(db, "posts");
        const favPostsDataQuery = query(postsRef, where(documentId(),
"in", validFavorites));
        const favPostsData = await getDocs(favPostsDataQuery);
        const likedPostsList = await fetchLikedPostsByUsers();
        const favorites = favPostsData.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          docID: doc.id,
          isFavourite: true,
          isLiked : likedPostsList?.includes(doc.id)
        }));

        setPosts(favorites);
        setFilteredPosts(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const query = collection(db,"likes");

    const unsubscribe = onSnapshot(query, async (querySnapshot) => {
      try{
        const postsData = await fetchPostsByCommunities();
        const favoritePostsOnly = postsData?.filter(post => post.isFavourite === true);
        setPosts(favoritePostsOnly);

        if (searchQuery.trim() === '') {
          setFilteredPosts(favoritePostsOnly);
        } else {
          const filtered = favoritePostsOnly.filter((post : any) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredPosts(filtered);
        }
      }
      catch(e){
        console.log(e);
      }
    }) 
    return () => unsubscribe();
  },[])



  return (
    <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
      <View style = {styles.searchContainer}>
        <Feather name="search" size={24} color="gray"
style={styles.searchIcon} />
        <TextInput
          style = {styles.searchField}
          placeholder='Search Posts....'
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}
style={styles.clearIconContainer}>
            <AntDesign name="closecircle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <Posts
        Postings={filteredPosts}
        community="abc"
        onUpdatePost={handleUpdatePost}  // Pass down the update function
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 6,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchField : {
    flex : 1,
    fontSize : 16,
    color : 'black',
  },
  clearIconContainer: {
    marginLeft: 10,
  },
})

export default FavouritesPage

