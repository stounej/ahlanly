import { Tabs } from "@/components/Tabs";

export default function Layout() {
  return (
    <Tabs>
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
    </Tabs>
  );
}