import { FoodListCard } from "@/src/components/card";
import { supabase } from "@/src/lib/supabase";
import { useFocusEffect, useRouter } from "expo-router"; // Expo Router의 포커스 훅 추가
import { HeartOff, Map, SlidersHorizontal } from "lucide-react-native";
import React, { useCallback, useState } from "react"; // useCallback 추가
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WishListScreen() {
    const [wishItems, setWishItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    // 데이터 불러오기 함수
    const fetchWishlist = async () => {
        try {
            // 로딩 상태는 처음 진입할 때만 표시 (새로고침 시엔 refreshing으로 대체)
            const { data, error } = await supabase.from("wishlist").select("*").order("created_at", { ascending: false });

            if (error) throw error;

            if (data) {
                const formattedData = data.map((item) => ({
                    id: item.place_id,
                    name: item.name,
                    category: item.category,
                    location: item.location,
                    score: item.score,
                    img: item.img_url,
                    isLiked: true,
                }));
                setWishItems(formattedData);
            }
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    /**
     * [핵심 해결책] useFocusEffect
     * 이 훅은 사용자가 이 탭 화면을 볼 때마다 실행됩니다.
     * useCallback으로 감싸주어야 불필요한 재렌더링을 방지할 수 있습니다.
     */
    useFocusEffect(
        useCallback(() => {
            fetchWishlist();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchWishlist();
    };

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            {/* 상단 헤더 영역 */}
            <View className="px-5 py-4 flex-row justify-between items-center border-b border-neutral-50">
                <View className="flex-row items-center">
                    <Text className="text-[24px] font-black text-neutral-900">즐겨찾기</Text>
                    {!loading && wishItems.length > 0 && (
                        <View className="ml-2 bg-red-500 w-6 h-6 rounded-full items-center justify-center">
                            <Text className="text-white text-[12px] font-black">{wishItems.length}</Text>
                        </View>
                    )}
                </View>
                <Pressable className="w-10 h-10 items-center justify-center bg-neutral-50 rounded-full active:bg-neutral-200">
                    <SlidersHorizontal size={20} color="#1e293b" />
                </Pressable>
            </View>

            {/* 메인 리스트 영역 */}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#171717" />
                </View>
            ) : wishItems.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-6" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#171717" />}>
                    {wishItems.map((item) => (
                        <FoodListCard key={item.id} data={item} isLiked={true} />
                    ))}
                    <View className="h-28" />
                </ScrollView>
            ) : (
                /* 데이터가 없을 때 정중앙 UI */
                /* 데이터가 없을 때 정중앙 UI */
                <View className="flex-1 justify-center items-center px-10">
                    {/* 아이콘 영역: 부드러운 원형 배경과 함께 배치 */}
                    <View className="w-24 h-24 bg-neutral-50 rounded-full items-center justify-center mb-8">
                        <View className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-sm">
                            <HeartOff size={32} color="#D1D5DB" strokeWidth={1.5} />
                        </View>
                        {/* 장식용 작은 원들 (선택 사항) */}
                        <View className="absolute top-2 right-2 w-3 h-3 bg-red-100 rounded-full" />
                        <View className="absolute bottom-4 left-1 w-2 h-2 bg-blue-50 rounded-full" />
                    </View>

                    {/* 텍스트 영역: 타이틀과 설명의 위계 분리 */}
                    <Text className="text-neutral-900 font-black text-[22px] mb-3 text-center tracking-tight">찜한 장소가 없습니다</Text>

                    <Text className="text-neutral-400 text-center text-[15px] leading-6 font-medium mb-10">
                        아직 비어있네요!{"\n"}
                        마음에 드는 맛집의 하트를 눌러{"\n"}
                        나만의 미식 리스트를 채워보세요.
                    </Text>

                    {/* 탐색 유도 버튼 (선택 사항: 홈으로 이동 등) */}
                    <Pressable
                        onPress={() => router.push("/")} // 홈 탭으로 이동
                        className="bg-neutral-900 px-8 py-4 rounded-2xl shadow-md active:opacity-80"
                    >
                        <Text className="text-white font-bold text-[15px]">맛집 탐색하러 가기</Text>
                    </Pressable>
                </View>
            )}

            {/* 하단 플로팅 버튼 */}
            {wishItems.length > 0 && (
                <View className="absolute bottom-10 w-full items-center">
                    <Pressable className="bg-neutral-900 flex-row items-center px-6 py-3.5 rounded-full shadow-lg shadow-black/30 active:opacity-80">
                        <Map size={18} color="white" />
                        <Text className="text-white font-bold ml-2 text-[15px]">지도보기</Text>
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
}
