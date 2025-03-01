import { Stack, useRouter } from "expo-router";
import { useEffect, Suspense, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import  supabase from '../supabaseClient'; // Assurez-vous d'avoir configuré Supabase
import { Session } from "@supabase/supabase-js";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';



const InitialLayout = () => {
  

  return (
    <GestureHandlerRootView >
    <ActionSheetProvider>
    <BottomSheetModalProvider>
    <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
  </Stack>
  </BottomSheetModalProvider>
  </ActionSheetProvider>

  </GestureHandlerRootView>

  );
}
function RootLayoutNav() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {      
      setSession(session)
    })

  }, [])

  useEffect(() => {
    if(session) getProfile()
    

  }, [session])

  const getProfile =  async () =>  {    
    try{
      if(!session?.user) { 
          router.replace('/');   
          throw new Error('No user on the session') 
      }
      else{
        router.replace('/(authenticated)/(tabs)/dashboard');
      }
    }
    catch(err){
      console.log(err);  
    }
  }

  return (
        <InitialLayout/>
  )
}

export default RootLayoutNav;
