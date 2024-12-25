import { View, Text, FlatList, StyleSheet, ListRenderItem, ListRenderItemInfo, Image, Button, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';

export interface CommunitiesIntf {
    id: number;
    title: string;
    image: string;
    noOfMembers : number;
}
interface Props {
    CommunitiesInfo : CommunitiesIntf[];
}

const CommunitiesComp = ({CommunitiesInfo} : Props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, []);

    const renderRow: ListRenderItem<CommunitiesIntf> = ({ item }: ListRenderItemInfo<CommunitiesIntf>) => {
        return (
            
            <BlurView intensity={90} tint="light" style={styles.card}>
                <View style = {styles.container}>
                    <View style = {styles.imageContainer}>
                        <Image source={{uri : item.image}} style = {styles.communityImage} />
                    </View>
                    <View style = {styles.infoContainer}>
                            <View style = {styles.InfoUpper}>
                                <Text style = {styles.communityTitle}>{item.title}</Text>
                            </View>
                            <View style = {styles.InfoLower}>
                                <Feather name = {'users'} size={16}></Feather>
                                <Text style = {styles.noOfMembers}>{item.noOfMembers}</Text>
                            </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={() => {console.log("Join button clicked")}}>
                            <Text style={styles.buttonText}>Join</Text>
                        </Pressable>
                    </View>
                </View>
            </BlurView>
        );
    };
    
    const communitiesRef = useRef<FlatList>(null);
    //Custom Seperator component
    const renderSeparator = () => (
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </View>
    );
  return (
    <View>
      <FlatList
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        ref={communitiesRef}
        data={loading ? [] : CommunitiesInfo}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />

    </View>
  )
}

export default CommunitiesComp;

const styles = StyleSheet.create({
    separatorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    separator: {
      width: '60%', 
      height: 1,   
      backgroundColor: '#ddd', 
    },
    card: {
      padding: 13,
      flexDirection: 'row', // Horizontal layout for three sections
      alignItems: 'center',
      backgroundColor: '#FFFFFF', // Flat white background
    },
    container: {
      flex: 1,
      flexDirection: 'row', // Three sections
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1, // First section for the image
      alignItems: 'center',
      justifyContent: 'center',
    },
    communityImage: {
      width: 50,
      height: 50,
      borderRadius: 25, // Circular image
      resizeMode: 'cover',
    },
    infoContainer: {
      flex: 2, // Middle section for info
      flexDirection: 'column', // Stack title and members vertically
      justifyContent: 'center',
      paddingHorizontal: 12,
    },
    InfoUpper: {
      marginBottom: 5, // Space below the title
    },
    InfoLower: {
      flexDirection: 'row', // Align icon and member count horizontally
      alignItems: 'center',
    },
    communityTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#2C2C2C', // Dark gray for text
    },
    noOfMembers: {
      fontSize: 13,
      color: '#6D6D6D', // Muted gray for less emphasis
      marginLeft: 4,
    },
    buttonContainer: {
      flex: 1, // Last section for the button
      alignItems: 'flex-end', // Align button to the right
    },
    button: {
      backgroundColor: '#f0f0f0', // Flat blue button
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20, // Smooth edges
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#00000', // White text on blue button
    },
  });
  