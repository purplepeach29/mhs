import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { deleteVideo , getUserPosts} from '../lib/appwrite';
import useAppwrite from '../lib/useAppwrite';
import { icons } from "../constants";
import { useGlobalContext } from '../context/GlobalProvider'; 


const VideoCard = ({ video:{title, $id, thumbnail, video, creator:{ username, avatar}}, isProfile }) => {
  const [play, setPlay] = useState(false);
  const {user}= useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  
  // const deleteVid = async ($id) => {
  //   if (onDelete) {
  //     await onDelete($id);  // Trigger the delete function passed as prop
  //   }
  // };
  const deleteVid=async($id)=>{
    // console.log($id);
    await deleteVideo($id);
    await refetch();
  }

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          {isProfile?
          (
          <TouchableOpacity onPress={()=>deleteVid($id)}>
          <Image source={icons.deleteIcon} className="w-5 h-5" resizeMode="contain" />
          </TouchableOpacity>
          )
          :
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />

            }
        </View>
      </View>

      {play ? (
        <Video
        source={{
          uri: video,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate",
            Connection: "keep-alive",
          },
        }}
        style={{
          width: '100%',
          height: 288,
          borderRadius: 35,
          marginTop: 12,
          backgroundColor: "#000",
        }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) setPlay(false);
        }}
       />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
