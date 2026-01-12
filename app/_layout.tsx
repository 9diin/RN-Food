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
            <Stack.Screen
                name="profile/edit"
                options={{
                    title: "프로필 수정",
                    headerShown: false, // 커스텀 헤더를 쓸 것이므로 false
                    presentation: "modal", // 모달 스타일로 등장
                }}
            />
        </Stack>
    );
}
