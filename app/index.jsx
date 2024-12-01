import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import{ Link}  from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
    // <SafeAreaView>
    <View className="flex-1 items-center justify-center bg-blue">
      <Text className="text-3xl font-pblack">MHS</Text>
      <Link href="/home" style={{ color: 'blue'}}>Go to home</Link>
      <StatusBar style="auto" />
    </View>
    // </SafeAreaView>
  );
}
