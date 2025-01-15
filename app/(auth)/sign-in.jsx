import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context' 
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:''
  })
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false)
  const submit = async () => {
    if(form.email === "" || form.password === ""){
      Alert.alert('Error', 'Please fill in all the fields')
      } 
      setSubmitting(true);
      try {

        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLogged(true);
        Alert.alert("Success", "User signed in successfully");
        router.replace('/home')
      }catch (error){
        Alert.alert('Error', error.message)
      } finally {
        setSubmitting(false)
      }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="flex-row items-center"><Image 
            source={images.logo}
            className="w-[80px] h-[50px]"
            resizeMode='contain'
          />
          <Text className="text-white text-xl font-bold bg-red-700 rounded-md px-2">PHYSIOCARE</Text>
          </View>
          <Text className="text-2xl text-white font-psemibold mt-10 
          text-semibold">Login in to MHS</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email:e})}
            otherStyles="mt-7"
            keyboardType="email-address"

          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password:e})}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            />
            <View className="flex justify-center pt-10 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link href="/sign-up"
                className="text-lg font-psemibold text-secondary"
                >Sign up
              </Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn