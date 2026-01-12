import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, Clock, Heart, MapPin, Phone, Share2, Star } from "lucide-react-native";
import { Alert, Clipboard, Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function RestaurantDetailScreen() {
    const { item } = useLocalSearchParams();
    const router = useRouter();

    // JSON 문자열로 전달된 데이터를 객체로 복구
    const data = item ? JSON.parse(item as string) : null;

    if (!data) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>데이터를 불러올 수 없습니다.</Text>
                <Pressable onPress={() => router.back()} className="mt-4 bg-neutral-900 px-4 py-2 rounded-lg">
                    <Text className="text-white">뒤로가기</Text>
                </Pressable>
            </View>
        );
    }

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        Alert.alert("알림", "주소가 복사되었습니다.");
    };

    return (
        <View className="flex-1 bg-white">
            {/* 상단 헤더: 이미지 위 투명 버튼 */}
            <SafeAreaView edges={["top"]} className="absolute z-10 w-full flex-row justify-between px-5 items-center mt-2">
                <Pressable onPress={() => router.back()} className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
                    <ArrowLeft size={22} color="white" />
                </Pressable>
                <Pressable className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
                    <Share2 size={20} color="white" />
                </Pressable>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* 1. 메인 이미지 (바인딩) */}
                <Image source={{ uri: data.img }} style={{ width: width, height: 350 }} resizeMode="cover" />

                {/* 2. 타이틀 섹션 (바인딩) */}
                <View className="px-5 pt-8 pb-7 border-b-[8px] border-neutral-50">
                    <View className="flex-row items-center mb-3">
                        <View className="bg-red-50 px-2.5 py-1.5 rounded">
                            <Text className="text-red-500 text-[11px] font-bold">{data.category}</Text>
                        </View>
                        <View className="flex-row items-center ml-3">
                            <Star size={14} color="#F97316" fill="#F97316" />
                            <Text className="ml-1 font-bold text-neutral-900 text-[15px]">{data.score}</Text>
                            <Text className="ml-1 text-neutral-400 text-[14px]">({data.reviewCount})</Text>
                        </View>
                    </View>
                    <Text className="text-[28px] font-extrabold text-neutral-900 mb-3 leading-tight">{data.name}</Text>
                    <Text className="text-neutral-500 text-[15px] leading-6 font-medium">
                        {data.name}은(는) 서초구 방배동에 위치한 {data.category} 전문점입니다. 네이버 방문자 리뷰와 평점이 증명하는 현지 맛집을 경험해보세요.
                    </Text>
                </View>

                {/* 3. 매장 상세 정보 (바인딩) */}
                <View className="px-5 py-9 border-b-[8px] border-neutral-50">
                    <Text className="text-[19px] font-bold text-neutral-900 mb-6">매장 정보</Text>
                    <View className="gap-y-7">
                        {/* 주소 */}
                        <View className="flex-row items-start">
                            <MapPin size={18} color="#64748B" className="mt-0.5" />
                            <View className="ml-3 flex-1">
                                <Text className="text-neutral-900 font-bold text-[15px] leading-5">{data.fullAddress}</Text>
                                <Text className="text-neutral-400 text-[13px] mt-1.5 font-medium">{data.location} 인근</Text>
                            </View>
                            <Pressable className="bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100" onPress={() => copyToClipboard(data.fullAddress)}>
                                <Text className="text-neutral-600 text-[12px] font-bold">복사</Text>
                            </Pressable>
                        </View>

                        {/* 영업시간 (더미+영업상태 바인딩) */}
                        <View className="flex-row items-start">
                            <Clock size={18} color="#64748B" className="mt-0.5" />
                            <View className="ml-3 flex-1">
                                <View className="flex-row items-center">
                                    <Text className="text-neutral-900 font-bold text-[15px]">오늘 11:30 - 22:00</Text>
                                    <View className={`ml-2 px-2.5 py-1 rounded ${data.isOpen ? "bg-green-50" : "bg-neutral-50"}`}>
                                        <Text className={`text-[10px] font-bold ${data.isOpen ? "text-green-600" : "text-neutral-500"}`}>{data.isOpen ? "영업중" : "준비중"}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* 전화번호 (바인딩 시도 - API 필드 있을 경우) */}
                        <View className="flex-row items-center">
                            <Phone size={18} color="#64748B" />
                            <View className="ml-3">
                                <Text className="text-neutral-900 font-bold text-[15px]">{data.telephone || "번호 정보 없음"}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 4. 추천 메뉴 섹션 (더미 이미지 + 가게명 바인딩) */}
                <View className="px-5 py-9 pb-40">
                    <Text className="text-[19px] font-bold text-neutral-900 mb-6">추천 메뉴</Text>
                    <View className="flex-row mb-8 items-start">
                        <View className="flex-1 pr-5">
                            <Text className="font-bold text-neutral-900 text-[17px] leading-5">{data.name} 대표 메뉴</Text>
                            <Text className="text-neutral-400 text-[13px] mt-2 leading-5 font-medium" numberOfLines={2}>
                                {data.category} 장인이 선보이는 {data.name}만의 시그니처 메뉴입니다. 신선한 재료의 맛을 느껴보세요.
                            </Text>
                            <Text className="text-neutral-900 font-extrabold mt-3 text-[16px]">가격 변동</Text>
                        </View>
                        <Image source={{ uri: data.img }} className="w-[90px] h-[90px] rounded-2xl bg-neutral-100" />
                    </View>

                    <Pressable className="w-full h-14 flex-row items-center justify-center bg-neutral-50 rounded-2xl border border-neutral-100">
                        <Text className="text-neutral-600 font-bold text-[15px]">전체 메뉴 및 리뷰 보기</Text>
                        <ChevronRight size={16} color="#94A3B8" />
                    </Pressable>
                </View>
            </ScrollView>

            {/* 하단 고정 바 */}
            <View className="absolute bottom-0 w-full bg-white border-t border-neutral-50 px-5 pt-3 pb-10 shadow-lg">
                <View className="flex-row items-center gap-x-3">
                    <Pressable className="w-14 h-14 bg-neutral-50 rounded-2xl items-center justify-center border border-neutral-100">
                        <Heart size={24} color="#EF4444" fill={data.isLiked ? "#EF4444" : "transparent"} />
                    </Pressable>
                    <Pressable className="flex-1 h-14 bg-neutral-900 rounded-2xl items-center justify-center">
                        <Text className="text-white font-bold text-[16px]">실시간 예약하기</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
