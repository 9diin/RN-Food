import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import "./global.css";

export default function RootLayout() {
    const segments = useSegments();
    const router = useRouter();

    // 1. 인증 상태 (테스트를 위해 우선 false로 설정)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // 초기화 로직 (예: 세션 체크)
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!isLoggedIn && !inAuthGroup) {
            // 로그인 안 됐는데 인증 밖이면 로그인으로
            router.replace("/(auth)/sign-in");
        } else if (isLoggedIn && inAuthGroup) {
            // 로그인 됐는데 인증 안이면 메인으로
            router.replace("/(tabs)");
        }
    }, [isLoggedIn, segments, isReady]);

    if (!isReady) return null;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Expo Router의 Stack은 .Group 속성을 지원하지 않습니다.
                대신 조건부로 Screen을 렌더링하여 구조를 분리합니다.
            */}
            {!isLoggedIn ? (
                // [인증되지 않은 사용자 세트]
                <Stack.Screen
                    name="(auth)"
                    options={{
                        animation: "fade",
                    }}
                />
            ) : (
                // [인증된 사용자 세트]
                <>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen
                        name="restaurant/[id]"
                        options={{
                            presentation: "card",
                        }}
                    />
                    <Stack.Screen
                        name="profile/edit"
                        options={{
                            presentation: "modal",
                        }}
                    />
                </>
            )}
        </Stack>
    );
}
