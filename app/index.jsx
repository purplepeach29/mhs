
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import{ Link}  from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images }from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {

  const {isLoading, isLogged} = useGlobalContext();
  if(!isLoading && isLogged) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height:'100%'}}>
        <View className="w-full flex flex-col items-center justify-center min-h-[85vh] px-4">
          <View className="flex-row items-center"><Image 
            source={images.logo}
            className="w-[90px] h-[60px] zIndex-3"
            resizeMode='contain'
          />
          <Text className="text-white text-2xl font-bold bg-red-700 rounded-md px-2">PHYSIOCARE</Text>
          </View>
          <Image 
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold 
            text-center">Explore Endless Possibilities with{' '}
              <Text className="text-secondary-200">MHS</Text>
            </Text>
            <Image 
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode='contain'
          />
          </View>
          <Text  className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with MHS
          </Text>
          <CustomButton 
            title="Continue with Email"
            handlePress={()=> router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622'
            style='light'/>
    </SafeAreaView>
  );
}
