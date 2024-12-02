import { View, Text, FlatList, StyleSheet, ListRenderItem, ListRenderItemInfo, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import  Animated, { FadeInRight, FadeOutLeft }  from 'react-native-reanimated';

export interface PostInf {
    id: number;
    title: string;
    date: string;
    link: string;
    image: string;
    description: string;
    tags: string[];
}

interface Props {
    Postings: PostInf[];
    community: string;
}

const router = useRouter();

const Posts = ({ Postings, community }: Props) => {
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

    //Cu
    const renderRow: ListRenderItem<PostInf> = ({ item }: ListRenderItemInfo<PostInf>) => {
        const maxLength = 100;
        const truncatedDescription = item.description.length > maxLength 
            ? `${item.description.substring(0, maxLength)}...` 
            : item.description;
        const isLiked = likedPosts[item.id] || false;
        const isStarred = starredPosts[item.id] || false;
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
                                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                                <MaterialCommunityIcons
                                    name={isLiked ? 'thumb-up' : 'thumb-up-outline'}
                                    size={18}
                                    color={isLiked ? 'black' : 'gray'}
                                />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Comments clicked')}>
                                    <FontAwesome name="comments-o" size={18} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleStar(item.id)}>
                                    <AntDesign
                                            name={isStarred ? 'star' : 'staro'} 
                                            size={18}
                                            color={isStarred ? 'goldenrod' : 'gray'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
        );
    };
    const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
    const [starredPosts, setStarredPosts] = useState<Record<number, boolean>>({});

    // Toggle Like
    const toggleLike = (id: number) => {
        setLikedPosts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Toggle Star
    const toggleStar = (id: number) => {
        setStarredPosts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
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