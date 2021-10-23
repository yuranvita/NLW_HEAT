import React , { createContext , useContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';



const CLIENT_ID = '228886aaf71ff86a97db';
const scope = 'read:user';
const user_storage = '@nlwheat:user';
const token_storage = '@nlwheat:token';

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData = {
    user: User | null;
    isSigning: boolean;
    signIn: () => Promise<void>;
    signOut: ()=> Promise<void>;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

type AuthResponse ={
    token : string,
    user : User;
}

type AuthorizationResponse ={
    params:{
        code?: string;
        error?:string;
    },
    type?: string;
}

export const AuthContext = createContext({} as AuthContextData);



function AuthProvider( {children} : AuthProviderProps ) {

    const [isSigning , setIsSigning] = useState(true); 
    const [user , setUser] = useState<User | null>(null);

   

 

    async function signIn() {

        try {

            setIsSigning(true);
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${scope}`;
    
            const authSessionResponse = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
    
            if(authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied'){
                const AuthResponse = await api.post("/authenticate" , { code : authSessionResponse.params.code });
                const { user , token } = AuthResponse.data as AuthResponse;
    
                 api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
                 await AsyncStorage.setItem(user_storage , JSON.stringify(user));
                 await AsyncStorage.setItem(token_storage , token );
    
                 setUser(user);
            }
    
            
        } catch (error) {
            alert(error);
        }finally{
            setIsSigning(false);
        }
    }
    
    async function signOut() {
        setUser(null);

        await AsyncStorage.removeItem(user_storage);
        await AsyncStorage.removeItem(token_storage);
    }

    useEffect(()=>{
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(user_storage);
            const tokenStorage = await AsyncStorage.getItem(token_storage);

            if(userStorage && tokenStorage){

                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;

                setUser(JSON.parse(userStorage));
            }

            setIsSigning(false);
        }

        loadUserStorageData();
    } , [])
            
    

    return(
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user,
            isSigning
        }}>
            {children}
        </AuthContext.Provider>
       
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider , useAuth }