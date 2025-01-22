import { Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
   <Stack screenOptions={{contentStyle: {backgroundColor: Colors.foamWhite}}}>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
    <Stack.Screen name="(modals)/equipments/[id]" options={{ presentation: 'modal'  }}  />
   </Stack>
  )
}

export default Layout

