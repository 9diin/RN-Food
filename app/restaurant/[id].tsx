import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, Clock, Heart, MapPin, Phone, Share2, Star } from "lucide-react-native";
import { Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function RestaurantDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* 상단 헤더: 미니멀 투명 헤더 */}
            <SafeAreaView edges={["top"]} className="absolute z-10 w-full flex-row justify-between px-5 items-center mt-2">
                <Pressable onPress={() => router.back()} className="w-10 h-10 bg-black/15 rounded-full items-center justify-center">
                    <ArrowLeft size={22} color="white" />
                </Pressable>
                <Pressable className="w-10 h-10 bg-black/15 rounded-full items-center justify-center">
                    <Share2 size={20} color="white" />
                </Pressable>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* 메인 비주얼 */}
                <Image source={{ uri: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000" }} style={{ width: width, height: 320 }} resizeMode="cover" />

                {/* 섹션 1: 타이틀 정보 */}
                <View className="px-5 pt-8 pb-7 border-b-[8px] border-neutral-50">
                    <View className="flex-row items-center mb-3">
                        {/* 배지 패딩 통일: px-2.5 py-1.5 */}
                        <View className="bg-red-50 px-2.5 py-1.5 rounded">
                            <Text className="text-red-500 text-[11px] font-bold">미쉐린 가이드 2024</Text>
                        </View>
                        <View className="flex-row items-center ml-3">
                            <Star size={14} color="#F97316" fill="#F97316" />
                            <Text className="ml-1 font-bold text-neutral-900 text-[15px]">4.9</Text>
                            <Text className="ml-1 text-neutral-400 text-[14px]">(245)</Text>
                        </View>
                    </View>

                    <Text className="text-[28px] font-extrabold text-neutral-900 mb-3 leading-tight">무오키 (MUOKI)</Text>
                    <Text className="text-neutral-500 text-[15px] leading-6 font-medium">박무현 셰프의 독창적인 해석이 담긴 컨템포러리 다이닝입니다. 재료 본연의 맛을 살린 섬세한 요리를 경험해보세요.</Text>
                </View>

                {/* 섹션 2: 매장 정보 (아이콘 강약 및 정렬 최적화) */}
                <View className="px-5 py-9 border-b-[8px] border-neutral-50">
                    <Text className="text-[19px] font-bold text-neutral-900 mb-6">매장 정보</Text>

                    <View className="gap-y-7">
                        {/* 위치 */}
                        <View className="flex-row items-start">
                            <View className="mt-0.5">
                                <MapPin size={18} color="#64748B" />
                            </View>
                            <View className="ml-3 flex-1">
                                <Text className="text-neutral-900 font-bold text-[15px] leading-5">서울 강남구 학동로 55길 12-1</Text>
                                <Text className="text-neutral-400 text-[13px] mt-1.5 font-medium">강남구청역 4번 출구에서 300m</Text>
                            </View>
                            <Pressable className="bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100">
                                <Text className="text-neutral-600 text-[12px] font-bold">복사</Text>
                            </Pressable>
                        </View>

                        {/* 영업시간 */}
                        <View className="flex-row items-start">
                            <View className="mt-0.5">
                                <Clock size={18} color="#64748B" />
                            </View>
                            <View className="ml-3 flex-1">
                                <View className="flex-row items-center">
                                    <Text className="text-neutral-900 font-bold text-[15px]">오늘 12:00 - 22:00</Text>
                                    <View className="ml-2 bg-green-50 px-2.5 py-1.5 rounded">
                                        <Text className="text-green-600 text-[10px] font-bold">영업중</Text>
                                    </View>
                                </View>
                                <Text className="text-neutral-400 text-[13px] mt-1.5 font-medium">브레이크 타임 15:00 - 17:30</Text>
                            </View>
                        </View>

                        {/* 전화 */}
                        <View className="flex-row items-center">
                            <Phone size={18} color="#64748B" />
                            <View className="ml-3">
                                <Text className="text-neutral-900 font-bold text-[15px]">02-1234-5678</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 섹션 3: 메뉴 영역 */}
                <View className="px-5 py-9 pb-40">
                    <Text className="text-[19px] font-bold text-neutral-900 mb-6">추천 메뉴</Text>

                    {[1, 2].map((item, index) => (
                        <View key={index} className="flex-row mb-8 items-start">
                            <View className="flex-1 pr-5">
                                <Text className="font-bold text-neutral-900 text-[17px] leading-5">무오키 테이스팅 코스</Text>
                                <Text className="text-neutral-400 text-[13px] mt-2 leading-5 font-medium" numberOfLines={2}>
                                    계절별 최상의 식재료를 사용한 8가지 테이스팅 코스로 구성된 셰프 오마카세입니다.
                                </Text>
                                <Text className="text-neutral-900 font-extrabold mt-3 text-[16px]">185,000원</Text>
                            </View>
                            <Image source={{ uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200" }} className="w-[90px] h-[90px] rounded-2xl bg-neutral-100" />
                        </View>
                    ))}

                    {/* 메뉴 전체보기 버튼: 트렌드 카드와 통일감 있는 디자인 */}
                    <Pressable className="w-full h-14 flex-row items-center justify-center bg-neutral-50 rounded-2xl border border-neutral-100">
                        <Text className="text-neutral-600 font-bold text-[15px]">메뉴 전체보기</Text>
                        <ChevronRight size={16} color="#94A3B8" className="ml-1" />
                    </Pressable>
                </View>
            </ScrollView>

            {/* 하단 고정 예약 바 */}
            <View className="absolute bottom-0 w-full bg-white border-t border-neutral-50 px-5 pt-3 pb-10 shadow-lg">
                <View className="flex-row items-center gap-x-3">
                    <Pressable className="w-14 h-14 bg-neutral-50 rounded-2xl items-center justify-center border border-neutral-100">
                        <Heart size={24} color="#EF4444" fill="#EF4444" />
                    </Pressable>
                    <Pressable className="flex-1 h-14 bg-neutral-900 rounded-2xl items-center justify-center shadow-md">
                        <Text className="text-white font-bold text-[16px]">실시간 예약하기</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
