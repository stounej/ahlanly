import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from "@/utils/cache";
import Colors from "@/constants/Colors";
import { useEffect, Suspense } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}


const InitialLayout = () => {
  
const router = useRouter();
const { isLoaded, isSignedIn } = useAuth();
const segments = useSegments();
const pathname = usePathname();
useEffect(() => {
  if (!isLoaded) return;
  const inAuthGroup = segments[0] === '(authenticated)';

  // if (isSignedIn && !inAuthGroup) {
  if (true) {
    router.replace('/(authenticated)/(tabs)/dashboard');
  } else if (!isSignedIn && pathname !== '/') {
    router.replace('/');
  }
}, [isSignedIn]);

if (!isLoaded) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.midnightOcean} />
    </View>
  );
}

  return (
    <GestureHandlerRootView >
    <BottomSheetModalProvider>
    <Stack
    screenOptions={{
      contentStyle: {
        backgroundColor: Colors.sandBeige,
      },
    }}>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
  </Stack>
  </BottomSheetModalProvider>
  </GestureHandlerRootView>

  );
}
function RootLayoutNav() {

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout/>
      </ClerkLoaded>
    </ClerkProvider>
  )
}

export default RootLayoutNav;
