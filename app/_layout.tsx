import { supabase } from "@/src/lib/supabase";
import { useAuthStore } from "@/src/stores/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import "./global.css";

export default function RootLayout() {
    const { isLoggedIn, setAuth } = useAuthStore();
    const segments = useSegments();
    const router = useRouter();

    // 내비게이션 시스템이 준비되었는지 확인하는 상태
    const [isNavigationReady, setIsNavigationReady] = useState(false);

    // 1. 수파베이스 세션 체크 및 리스너 등록
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setAuth(session?.user ?? null);
            setIsNavigationReady(true); // 세션 확인 완료
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setAuth(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // 2. 인증 상태에 따른 자동 리다이렉션 (안전 가드 추가)
    useEffect(() => {
        // 내비게이션 준비가 안 되었거나, 초기 세션 체크 전이면 실행 안 함
        if (!isNavigationReady) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!isLoggedIn && !inAuthGroup) {
            // 로그인이 안 되어 있는데 인증 그룹이 아니면 로그인으로
            router.replace("/(auth)/sign-in");
        } else if (isLoggedIn && inAuthGroup) {
            // 로그인이 되었는데 인증 그룹 안에 있으면 메인으로
            router.replace("/(tabs)");
        }
    }, [isLoggedIn, segments, isNavigationReady]);

    // 초기 로딩 시 레이아웃 렌더링 지연 (에러 방지 핵심)
    if (!isNavigationReady) return null;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
            <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
            <Stack.Screen name="restaurant/[id]" options={{ presentation: "card" }} />
            <Stack.Screen name="profile/edit" options={{ presentation: "modal" }} />
        </Stack>
    );
}
