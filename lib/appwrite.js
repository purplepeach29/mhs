import { Platform } from "react-native";
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.prachi.mhs',
    projectId: '6752b373000494c6df9a',
    databaseId: '67535180003c1b9c9714',
    userCollectionId: '6757bf500030e6d20870',
    videoCollectionId: '6757c004000813464ee6',
    storageId:'67587b190029a9a1487a',
}

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser =async (email, password, username) => {
    try{

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId:newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;
    }catch (error){
        console.log(error);
        throw new Error(error);
    }
}
export const signIn = async (email, password) => {
    try{
        const session = await account.createEmailPasswordSession(email, password)
        console.log("logged in")
        return session;
    } catch (error){
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }