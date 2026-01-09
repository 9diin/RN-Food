import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="restaurant/[id]"
                options={{
                    headerShown: false,
                    presentation: "card", // 기본 오른쪽에서 왼쪽으로 이동
                }}
            />
        </Stack>
    );
}
