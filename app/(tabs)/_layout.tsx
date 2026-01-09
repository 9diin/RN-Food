import { Tabs } from "expo-router";
import { Compass, Heart, User, Utensils } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#000000" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "맛집찾기",
                    tabBarIcon: ({ color }) => <Utensils size={20} color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "주변탐색",
                    tabBarIcon: ({ color }) => <Compass size={20} color={color} />,
                }}
            />
            <Tabs.Screen
                name="wish-list"
                options={{
                    title: "나만의 리스트",
                    tabBarIcon: ({ color }) => <Heart size={20} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "내 정보",
                    tabBarIcon: ({ color }) => <User size={20} color={color} />,
                }}
            />
        </Tabs>
    );
}
