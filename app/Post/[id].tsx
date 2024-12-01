import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import PostData from '@/assets/Data/fakeData.json';
import Animated from 'react-native-reanimated';
import { PostInf } from '@/Components/Posts';

const PostItem = () => {
  const { id } = useLocalSearchParams<{id : string}>();
  const PostFound : PostInf = (PostData.dataMedium as any[]).find((post) => post.id == id);
  return (
    <View style = {styles.container}>
      <Animated.ScrollView>
        <Animated.View style = {styles.authorDetails}>
          <Animated.Image source={{uri : PostFound.image}} style = {styles.authorImage}></Animated.Image>
        </Animated.View>
        <Animated.Text style = {styles.Title}>{[PostFound.title]}</Animated.Text>
        <Animated.View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </Animated.View>
        <Animated.Image source = {{uri : PostFound.image}} style = {styles.ImageStyle}/>
        <Animated.View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </Animated.View>
        <Animated.View style = {styles.DescContainer}>
          <Text style = {styles.Description}>{PostFound.description}</Text>
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
    backgroundColor : 'red'
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
  },
  Title : {
    fontFamily : 'manro-b',
    paddingVertical : '5%',
    paddingHorizontal : '7%',
    fontSize : 22,
  }
});

export default PostItem