import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
   <Stack
   
   screenOptions={{
     headerShadowVisible: false,
     contentStyle: { backgroundColor: Colors.foamWhite },
   }}>
      <Stack.Screen options={{ headerShown: false }} name='index' />
   </Stack>
   )
}