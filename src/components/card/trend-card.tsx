import { useRouter } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import { ImageBackground, Pressable, Text, View } from "react-native";

// 상단 가로 스크롤형 카드
export const TrendCard = ({ data }: { data: any }) => {
    const router = useRouter();
    const { name, category, score, img, id } = data;

    return (
        <Pressable
            className="mr-4 w-[260px] rounded-3xl overflow-hidden bg-white shadow-sm border border-neutral-100"
            // AS-IS (에러 발생 가능)
            onPress={() =>
                router.push({
                    pathname: "/restaurant/[id]",
                    params: {
                        id: data.id,
                        item: JSON.stringify(data), // 전체 데이터를 문자열로 변환
                    },
                })
            }
        >
            <ImageBackground source={{ uri: img }} className="w-full h-40">
                <View className="flex-1 bg-black/30 p-4 justify-between">
                    <View className="flex-row justify-end">
                        <Heart size={22} color="white" />
                    </View>
                    <View>
                        <View className="flex-row items-center mb-1">
                            <Star size={12} color="#FBBF24" fill="#FBBF24" />
                            <Text className="text-white font-bold text-xs ml-1">{score}</Text>
                        </View>
                        <Text className="text-white text-[18px] font-bold leading-tight" numberOfLines={1}>
                            {name}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <View className="p-3.5 flex-row flex-wrap gap-1.5">
                <View className="bg-neutral-50 px-2.5 py-1.5 rounded-md">
                    <Text className="text-xs font-semibold text-neutral-500">#{category}</Text>
                </View>
            </View>
        </Pressable>
    );
};
