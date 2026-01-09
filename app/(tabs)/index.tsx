import { FoodListCard, TrendCard } from "@/src/components/card";
import { useRouter } from "expo-router";
import { BellRing, ChevronRight, Map, MapPin, Search } from "lucide-react-native";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GourmetDetailScreen() {
    const router = useRouter();

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            {/* Header: 정밀한 여백 조절 */}
            <View className="px-5 py-3 flex-row justify-between items-center border-b border-neutral-50">
                <View>
                    <Pressable className="flex-row items-center">
                        <Text className="text-[22px] font-extrabold text-neutral-900 mr-1">서초구 방배동</Text>
                        <ChevronRight size={18} color="#1e293b" />
                    </Pressable>
                    <View className="flex-row items-center mt-0.5">
                        <MapPin size={12} color="#64748B" />
                        <Text className="text-neutral-500 text-[12px] ml-1">현재 설정된 위치</Text>
                    </View>
                </View>
                <Pressable className="w-10 h-10 rounded-full items-center justify-center bg-neutral-50">
                    <BellRing size={22} color="#334155" />
                    <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Search Bar: 더 깊은 라운딩과 그림자 제거로 모던함 강조 */}
                {/* 2. 검색 & 퀵 필터 */}
                <View className="pt-6 pb-2">
                    {/* 검색바는 좌우 여백 유지 */}
                    <View className="px-5">
                        <View className="h-12 flex-row items-center px-4 bg-neutral-100 rounded-xl">
                            <Search size={18} color="#94A3B8" />
                            <TextInput placeholder="맛집, 메뉴, 지역 검색" placeholderTextColor="#94A3B8" className="flex-1 h-full ml-2 text-neutral-900 font-medium text-[15px]" />
                        </View>
                    </View>

                    {/* 필터 영역: 부모의 px-5를 제거하고 ScrollView 내부에서 여백 조절 */}
                    <View className="mt-4">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            // 이 패딩이 헤더/검색바의 px-5(20)와 일치해야 라인이 딱 맞습니다.
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                        >
                            <View className="flex-row items-center gap-x-2">
                                {["🍽️ 전체", "🍣 일식", "🍝 양식", "🥩 고기", "☕️ 카페", "🍺 술집"].map((item, index) => (
                                    <Pressable key={index} className={`px-4 py-2.5 rounded-full border ${index === 0 ? "bg-neutral-900 border-neutral-900" : "bg-white border-neutral-200"}`}>
                                        <Text className={`font-semibold text-[13px] ${index === 0 ? "text-white" : "text-neutral-600"}`}>{item}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                {/* Trending Section: 카드 비율 조정 */}
                <View className="mt-8">
                    <View className="px-5 flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-[20px] font-bold">실시간 인기 급상승</Text>
                            <View className="bg-red-50 px-2.5 py-1 rounded">
                                <Text className="text-red-500 text-xs font-bold">HOT</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5 mb-2">
                        <TrendCard title="무오키 (MUOKI)" tags={["미쉐린 2024", "파인다이닝"]} rating="4.9" img="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600" />
                        <TrendCard title="오복수산시장" tags={["카이센동", "웨이팅맛집"]} rating="4.7" img="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600" />
                    </ScrollView>
                </View>

                {/* Vertical List: 가독성 중심 리디자인 */}
                <View className="px-5 mt-10 mb-28">
                    <Text className="text-[20px] font-bold text-neutral-900 mb-5">내 주변 추천 맛집</Text>
                    <FoodListCard name="을지다락 강남" desc="오므라이스와 매콤 크림 파스타" location="역삼역 도보 5분" score="4.8" reviewCount="2.4k" isOpen={true} img="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=400" />
                    <FoodListCard
                        name="다운타우너"
                        desc="인생 버거라고 불리는 수제 프리미엄 버거"
                        location="강남역 도보 3분"
                        score="4.5"
                        reviewCount="1.8k"
                        isOpen={false}
                        img="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400"
                    />
                </View>
            </ScrollView>

            {/* Floating Action Button: 가독성 높은 대비 */}
            <View className="absolute bottom-10 w-full items-center">
                <Pressable className="bg-neutral-900 flex-row items-center px-6 py-3.5 rounded-full shadow-lg shadow-black/30">
                    <Map size={18} color="white" />
                    <Text className="text-white font-bold ml-2 text-[15px]">지도보기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
