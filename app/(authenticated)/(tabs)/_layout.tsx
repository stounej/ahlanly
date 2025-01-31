import { Tabs } from "@/components/Tabs";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
  
    <Tabs >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: () => require('../../../assets/images/tab-icons/dashboard.png') 
        }}
      />
       <Tabs.Screen
        name="properties"
        options={{
          title: "Properties",
          tabBarIcon: () => require('../../../assets/images/tab-icons/property.png') 
        }}
      />
       <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: () => require('../../../assets/images/tab-icons/calendar.png') 
        }}
      />
        <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: () => require('../../../assets/images/tab-icons/calendar.png') 
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // S'assurer que le conteneur occupe tout l'écran
    backgroundColor: 'blue',
  },
  contentContainer: {
    padding: 36,
    alignItems: 'center',
  },
});
