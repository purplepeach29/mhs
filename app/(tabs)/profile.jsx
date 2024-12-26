import React, { useEffect, useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoBox from '../../components/InfoBox';
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider'; 
import { icons } from '../../constants';
import { router } from 'expo-router';

const Profile = () => {

  const {user, setUser, setIsLogged }= useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false);
 
  const onRefresh = async () => {
      setRefreshing(true)
      await refetch();
      setRefreshing(false)
  }
  const logout = async () =>{
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace('/sign-in')
  }

  return (
      <SafeAreaView className="bg-primary h-full">
          <FlatList 
              data={posts}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) =>(
                <VideoCard video={item}
                  isProfile={true}
                  
                />
              )}
              ListHeaderComponent={()=> (
                  <View className="w-full justify-center items-center mt-6 mb-12 px-4"> 
                    <TouchableOpacity className="w-full items-end mb-10"
                      onPress={logout}>
                       <Image source={ icons.logout }
                        resizeMode='contain'
                        className="w-6 h-6"
                       /> 
                    </TouchableOpacity>
                    <View className="w-16 h-16 rounded-lg border border-secondary justify-center items-center">
                        <Image 
                          source={{uri: user?.avatar}}
                          className="w-[90%] h-[90%] rounded-lg"
                          resizeMode='contain'
                        />
                    </View>
                    <InfoBox 
                      title={user?.username}
                      containerStyles="mt-5"
                      titleStyles="text-lg"
                    />
                    <View className="mt-5 flex-row">
                    <InfoBox 
                      title={posts.length || 0}
                      subtitle="Posts"
                      containerStyles="mr-10"
                      titleStyles="text-xl"
                    />
                    <InfoBox 
                      title="1.2k"
                      subtitle="Followers"
                      titleStyles="text-xl"
                    />
                    </View>
                  </View>
                )}
              ListEmptyComponent={() => (
                  <EmptyState 
                      title="No Videos Found"
                      subtitle="No video found for this search query"
                  />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

          />
          {/* {posts.map((post)=>console.log(post.$id)
          )} */}
      </SafeAreaView>
    );
}
export default Profile;
