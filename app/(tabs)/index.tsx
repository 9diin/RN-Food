import { FoodListCard, TrendCard } from "@/src/components/card";
import { useRouter } from "expo-router";
import { BellRing, ChevronRight, MapPin, Search, SearchX } from "lucide-react-native"; // SearchX 아이콘 추가
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVER_CLIENT_ID = "TXApLT0NR_FnMQCM4WNv";
const NAVER_CLIENT_SECRET = "cFv6X1d6T2";

const decodeHTML = (text: string) => {
    if (!text) return "";
    return text
        .replace(/<[^>]*>?/gm, "")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'");
};

export default function GourmetMainScreen() {
    const router = useRouter();
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchNaverImage = async (query: string) => {
        try {
            const res = await fetch(`https://openapi.naver.com/v1/search/image.json?query=${encodeURIComponent(query)}&display=1&sort=sim`, {
                headers: { "X-Naver-Client-Id": NAVER_CLIENT_ID, "X-Naver-Client-Secret": NAVER_CLIENT_SECRET },
            });
            const data = await res.json();
            return data.items && data.items.length > 0 ? data.items[0].link : null;
        } catch (e) {
            return null;
        }
    };

    const fetchAllData = async (query: string = "방배동 맛집") => {
        try {
            setIsLoading(true);
            const res = await fetch(`https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=15&sort=comment`, {
                headers: { "X-Naver-Client-Id": NAVER_CLIENT_ID, "X-Naver-Client-Secret": NAVER_CLIENT_SECRET },
            });
            const localData = await res.json();

            // 검색 결과가 없을 경우 빈 배열로 초기화
            if (!localData.items || localData.items.length === 0) {
                setRestaurants([]);
                return;
            }

            const formatted = await Promise.all(
                localData.items.map(async (item: any, index: number) => {
                    const name = decodeHTML(item.title);
                    const fullAddr = decodeHTML(item.roadAddress || item.address);
                    const image = await fetchNaverImage(`${name} 방배동`);
                    return {
                        id: `res-${index}-${name}`,
                        name,
                        category: item.category.split(">").pop() || "식당",
                        location: fullAddr.split(" ")[2] || "방배동",
                        fullAddress: fullAddr,
                        score: (4.2 + (index % 7) * 0.1).toFixed(1),
                        reviewCount: 100 + index * 54,
                        isOpen: index % 5 !== 0,
                        img: image || `https://picsum.photos/seed/${name}/400/400`,
                        telephone: item.telephone,
                    };
                })
            );
            setRestaurants(formatted);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            {/* 헤더 영역 */}
            <View className="px-5 py-3 flex-row justify-between items-center border-b border-neutral-50">
                <View>
                    <Pressable className="flex-row items-center">
                        <Text className="text-[22px] font-extrabold text-neutral-900 mr-1">방배동</Text>
                        <ChevronRight size={18} color="#1e293b" />
                    </Pressable>
                    <View className="flex-row items-center mt-0.5">
                        <MapPin size={12} color="#64748B" />
                        <Text className="text-neutral-500 text-[12px] ml-1">현재 설정된 위치</Text>
                    </View>
                </View>
                <View className="w-10 h-10 rounded-full items-center justify-center bg-neutral-50">
                    <BellRing size={22} color="#334155" />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* 검색 바 */}
                <View className="pt-6 px-5">
                    <View className="h-12 flex-row items-center px-4 bg-neutral-100 rounded-xl">
                        <Search size={18} color="#94A3B8" />
                        <TextInput placeholder="맛집 검색 (예: 돈까스, 파스타)" className="flex-1 ml-2 font-medium" value={searchQuery} onChangeText={setSearchQuery} onSubmitEditing={() => fetchAllData(`${searchQuery} 방배동`)} />
                    </View>
                </View>

                {isLoading ? (
                    <View className="mt-20">
                        <ActivityIndicator color="#000" />
                    </View>
                ) : restaurants.length > 0 ? (
                    <>
                        {/* 인기 맛집 섹션 */}
                        <View className="mt-8">
                            <Text className="px-5 text-[20px] font-bold mb-4">실시간 인기 맛집</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5">
                                {restaurants.slice(0, 10).map((item) => (
                                    <TrendCard key={item.id} data={item} />
                                ))}
                            </ScrollView>
                        </View>

                        {/* 리스트 섹션 */}
                        <View className="px-5 mt-10 mb-28">
                            <Text className="text-[20px] font-bold text-neutral-900 mb-5">추천 맛집 리스트</Text>
                            {restaurants.map((item) => (
                                <FoodListCard key={item.id} data={item} />
                            ))}
                        </View>
                    </>
                ) : (
                    /* ✨ 수정된 부분: 검색 결과가 없을 때의 UI */
                    <View className="flex-1 items-center justify-center pt-28 px-10">
                        <View className="bg-neutral-50 w-20 h-20 rounded-full items-center justify-center mb-6">
                            <SearchX size={32} color="#D1D5DB" />
                        </View>
                        <Text className="text-neutral-900 font-bold text-[18px] mb-2 text-center">찾으시는 맛집이 없나요?</Text>
                        <Text className="text-neutral-400 text-center text-[14px] leading-6">
                            입력하신 검색어에 대한 결과가 없습니다.{"\n"}
                            다른 검색어나 지역명을 입력해보세요!
                        </Text>
                        <Pressable
                            onPress={() => {
                                setSearchQuery("");
                                fetchAllData();
                            }}
                            className="mt-8 bg-neutral-900 px-6 py-3 rounded-xl"
                        >
                            <Text className="text-white font-bold">전체 목록 보기</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
