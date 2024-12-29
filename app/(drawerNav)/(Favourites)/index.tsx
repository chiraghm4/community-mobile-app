import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { db } from '@/firestore'
import Posts from "@/components/Posts";
import { hGetFavouritePostsData } from '@/helpers/hGetFavouritePostsData'
const FavouritesPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  // Function to update a single post's data

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
    const getPosts = async () => {
      try {
        const postsData = await hGetFavouritePostsData();
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (e) {
        console.log("error fetching docs", e);
      }
    };
    getPosts();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
      <View style = {styles.searchContainer}>
        <Feather name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style = {styles.searchField}
          placeholder='Search Posts....'
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIconContainer}>
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