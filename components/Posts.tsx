import { View, Text, FlatList, StyleSheet, ListRenderItem, ListRenderItemInfo, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import  Animated, { FadeInRight, FadeOutLeft }  from 'react-native-reanimated';
import { setPostAsFavourite } from '@/helpers/hSetFavouritePosts';
import { likePost, removeLikeFromPost } from '@/helpers/hLikeUnlikePosts';


export interface PostInf {
    id: number;
    title: string;
    date: string;
    link: string;
    image: string | null;
    desc: string;
    tags: string[];
    docID : string;
    isFavourite : boolean;
    isLiked : boolean;
    noOfLikes : number
}

interface Props {
    Postings: PostInf[];
    community: string;
    onUpdatePost?: (updatedPost: PostInf) => void;  // Add this
}

const router = useRouter();


const Posts = ({ Postings, community, onUpdatePost }: Props) => {
    const [loading, setLoading] = useState(false);
    const postsRef = useRef<FlatList>(null);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [community]);
    //Custom Seperator component
    const renderSeparator = () => (
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </View>
    );

    const renderRow: ListRenderItem<PostInf> = ({ item }: ListRenderItemInfo<PostInf>) => {
        const maxLength = 100;
        const truncatedDescription = item.desc.length > maxLength 
            ? `${item.desc.substring(0, maxLength)}...` 
            : item.desc;
        return (
                    <TouchableOpacity onPress={() => router.push(`/Post/${item.id}`)}>
                        <Animated.View style={styles.row} entering={FadeInRight} exiting={FadeOutLeft}>
                            <Text style = {styles.titleTxt}>{item.title}</Text>
                            <View style = {styles.descContainer}>
                                <Text style = {styles.description}>
                                    {truncatedDescription}
                                </Text>
                                <Image source={{uri: item.image}} style = {styles.sideImg}/>
                            </View>
                            <View style={styles.tagsContainer}>
                                    {item.tags.map((tag, index) => (
                                        <Text key={index} style={styles.tag}>
                                            {tag}
                                        </Text>
                                    ))}
                            </View>
                            <View style = {styles.bottomContainer}>
                                <View style={styles.likeContainer}>
                                    <TouchableOpacity onPress={() => toggleLike(item.isLiked,item.docID)}>
                                        <MaterialCommunityIcons
                                            name={item.isLiked ? 'thumb-up' : 'thumb-up-outline'}
                                            size={18}
                                            color={item.isLiked ? 'black' : 'gray'}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.likeCount}>{item.numberOfLikes}</Text>
                                </View>
                                <TouchableOpacity onPress={() => console.log('Comments clicked')}>
                                    <FontAwesome name="comments-o" size={18} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleStar(item.id,item.docID)}>
                                    <AntDesign
                                            name={item.isFavourite ? 'star' : 'staro'} 
                                            size={18}
                                            color={item.isFavourite ? 'goldenrod' : 'gray'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
        );
    };

    // Toggle Like
    const toggleLike = async (isLiked : boolean, id: string) => {
        if(isLiked){
            await removeLikeFromPost(id);
        }
        else{
            await likePost(id);
        }
    };

    const toggleStar = async (id: number, postId: string) => {
        try {
            // Find the post and create updated version
            const postToUpdate = Postings.find(post => post.docID === postId);
            if (!postToUpdate) return;
    
            const updatedPost = {
                ...postToUpdate,
                isFavourite: !postToUpdate.isFavourite
            };
            
            // Update Firebase
            await setPostAsFavourite(postId);
    
            // Update parent component state
            onUpdatePost?.(updatedPost);
            
        } catch (error) {
            console.error("Error updating favorite status:", error);
            // Optionally show an error message to the user
        }
    };

    return (
        
        <View style={defaultStyles.container}>
            <FlatList
                renderItem={renderRow}
                showsVerticalScrollIndicator={false}
                ref={postsRef}
                data={loading ? [] : Postings}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleTxt : {
        fontFamily : 'manro-b',
        fontSize : 20,
        padding : 5,
    },
    row: {
        padding: 20,
        borderColor: '#ddd',
    },
    sideImg : {
        width : '20%',
        height : '80%',
        alignItems : 'center',
        justifyContent : 'center',
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeCount: {
        fontFamily: 'manro-sb',
        fontSize: 14,
        color: 'black',
        marginLeft: 8,
    },
    descContainer : {
        padding : 5,
        flexDirection : 'row',
        width : '100%',
        paddingTop : 10,
    },
    description :{
        width : '80%',
        fontFamily : 'manro-sb',
        paddingRight : 10,
        fontSize : 12,
    },
    bottomContainer : {
        flexDirection : 'row',
        gap : 80,
        justifyContent : 'center',
        paddingTop : 20,
    },
    separatorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    separator: {
      width: '60%', 
      height: 1,   
      backgroundColor: '#ddd', 
    },
    tagsContainer: {
        flexDirection: 'row', 
        flexWrap: 'nowrap',     
        overflow: 'hidden',     
        marginTop: 10,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 12,         
        fontSize: 12,
        color: '#555',            
    },
});

export default Posts;