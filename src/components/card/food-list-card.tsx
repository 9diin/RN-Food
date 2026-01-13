import { useRouter } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

// 1. Props 타입 정의: data 객체와 좋아요 상태(isLiked)를 명시적으로 받음
export function FoodListCard({ data, isLiked = false }: { data: any; isLiked?: boolean }) {
    const router = useRouter();

    // 2. 방어 코드: 데이터가 넘어오지 않았을 경우 렌더링하지 않음 (런타임 에러 방지)
    if (!data) return null;

    // 3. 데이터 구조 분해 할당: 값이 없을 경우를 대비해 기본값(Default Value) 설정
    const { name = "정보 없음", category = "일반", location = "위치 정보 없음", score = 0, reviewCount = 0, isOpen = false, img = "", id } = data;

    return (
        <Pressable
            className="flex-row mb-6 items-start gap-4 active:opacity-70" // 클릭 시 시각적 피드백 추가
            onPress={() =>
                router.push({
                    pathname: "/restaurant/[id]",
                    params: { id, item: JSON.stringify(data) },
                })
            }
        >
            {/* 이미지 영역 */}
            <View>
                {/* 4. 이미지 경로 예외 처리: URL이 없을 경우 대비 */}
                <View className="w-24 h-24 rounded-2xl bg-neutral-100 overflow-hidden border border-neutral-100">
                    <Image source={img ? { uri: img } : { uri: "https://via.placeholder.com/150" }} className="w-full h-full" />
                </View>
                {!isOpen && (
                    <View className="absolute inset-0 bg-black/40 rounded-2xl items-center justify-center">
                        <Text className="text-white text-[12px] font-bold">영업 전</Text>
                    </View>
                )}
            </View>

            {/* 정보 영역 */}
            <View className="flex-1 h-24 justify-between py-0.5">
                <View>
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-neutral-900 text-[17px] font-bold flex-1" numberOfLines={1}>
                            {name}
                        </Text>
                        {/* 5. 좋아요 상태에 따른 하트 색상 분기 처리 */}
                        <Heart size={18} color={isLiked ? "#EF4444" : "#CBD5E1"} fill={isLiked ? "#EF4444" : "none"} />
                    </View>
                    <Text className="text-neutral-500 text-[13px]" numberOfLines={1}>
                        {category} 전문점
                    </Text>
                </View>

                {/* 하단 정보 라인 */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1 mr-2">
                        <Star size={14} color="#F97316" fill="#F97316" />
                        <Text className="ml-1 text-neutral-900 font-bold text-[13px]">{score}</Text>
                        <Text className="ml-1 text-neutral-400 text-[12px]">({reviewCount})</Text>
                        <View className="mx-2 w-px h-3 bg-neutral-200" />
                        <Text className="text-neutral-500 text-[12px] flex-1" numberOfLines={1}>
                            {location}
                        </Text>
                    </View>

                    <View className={`px-2 py-1 rounded ${isOpen ? "bg-green-50" : "bg-neutral-50"}`}>
                        <Text className={`text-[10px] font-bold ${isOpen ? "text-green-600" : "text-neutral-500"}`}>{isOpen ? "영업 중" : "영업 전"}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
