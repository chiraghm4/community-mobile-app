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
  return (
    <View>
      <FlatList
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        ref={communitiesRef}
        data={loading ? [] : CommunitiesInfo}
        keyExtractor={(item) => item.id.toString()}
        //ItemSeparatorComponent={renderSeparator}
      />

    </View>
  )
}

export default CommunitiesComp;

const styles = StyleSheet.create({
    card: {
        width: '95%',
        height: 80,
        alignSelf: 'center',
        marginVertical: '3%',
        borderRadius: 50, // Capsule shape with 50px border-radius
        overflow: 'hidden', // Ensures content stays within rounded corners
        backgroundColor: '#ffffff', // White background for the card
        shadowColor: '#bebebe', // Light shadow color for inner shadow effect
        shadowOffset: { width: 4, height: 4 }, // Shadow to create raised effect
        shadowOpacity: 0.5, // Light shadow opacity
        shadowRadius: 10, // Soft shadow
        elevation: 5, // Elevation for Android
        borderWidth: 1,
        borderColor: '#ffffff', // Light border for contrast
        boxShadow: 'inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff', // Inset shadow effect for neumorphism
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10, // Add horizontal padding
    },
    imageContainer: {
        flex: 1, // 1/5 of the row
        justifyContent: 'center',
        alignItems: 'center',
    },
    communityImage: {
        width: 50, // Ensure the image size is small and consistent
        height: 50,
        borderRadius: 25, // Full round shape
        borderWidth: 2,
        borderColor: '#fff', // Light border for the image
        shadowColor: '#a3b1c6',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    infoContainer: {
        flex: 3, // 3/5 of the row
        justifyContent: 'center',
        paddingHorizontal: 10, // Spacing around text
    },
    communityTitle: {
        fontWeight: '600',
        fontSize: 14,
        color: '#333', // Dark text for contrast
    },
    InfoUpper: {
        justifyContent: 'center',
    },
    InfoLower: {
        paddingTop : '4%',
        flexDirection : 'row',
        gap : 5,
    },
    noOfMembers: {
        fontSize: 12,
        color: '#555', // Subtle gray
    },
    buttonContainer: {
        flex: 1, // 1/5 of the row
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#e0e0e0', // Soft gray to match neumorphic style
        paddingHorizontal: 14, // Add padding for better button size
        paddingVertical: 7,
        borderRadius: 25, // Pill-shaped button
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#bebebe', // Inset shadow to simulate "pressed" effect
        shadowOffset: { width: 4, height: 4 }, // Shadow to make it look "pressed"
        shadowOpacity: 0.5, // Darker shadow for depth
        shadowRadius: 6, // Slightly larger radius for shadow
        elevation: 4, // Elevation for Android devices
        boxShadow: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff', // Pushed-in shadow effect
    },
    buttonText: {
        color: '#333', // Text color for better visibility
        fontSize: 14,
        fontWeight: 'bold',
    },
});