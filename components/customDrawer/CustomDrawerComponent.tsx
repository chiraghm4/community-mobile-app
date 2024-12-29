import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getAuth } from 'firebase/auth'
import {getUserCommunities} from '@/helpers/hGetUsersPosts'
import {signMeOut} from '@/helpers/hSignout' 

const CustomDrawerComponent = (props:any) => {
  const router = useRouter();
  const {top, bottom} = useSafeAreaInsets();

  const auth = getAuth()
  const currUser = auth.currentUser

  const [username, setUsername] = useState("")

  useEffect(() => {
    const getUserData = async () => {
        const {userData} = await getUserCommunities();
        setUsername(userData[0].username)
    };
    getUserData();
  }, [])

  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle = {{backgroundColor : '#f0f0f0'}}>
            <View style = {{padding : 50}}>
                <Image
                    source={{ uri: "https://cdn-images-1.medium.com/max/1024/1*xYYZwY2MNMUUMv6nvZOooA.png" }}
                    style={{ width: 150, height: 150, alignSelf: 'center', borderRadius:75, resizeMode:'cover' }}
                />
                <Text style={{fontSize:18, alignSelf:'center', fontFamily:'manro-sb', padding : 8}}>{username}</Text>
            </View>
            <DrawerItemList {...props} />
                <DrawerItem label={"Logout"} icon={({ color, size }) => (
                    <Feather name='log-out' size={16} color={color} />
                )} onPress={() => signMeOut()}  />
        </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawerComponent