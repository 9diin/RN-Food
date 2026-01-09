import { Map, SlidersHorizontal } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// 순환 참조 방지를 위해 직접 경로로 import!
import { FoodListCard } from "@/src/components/card";

export default function WishListScreen() {
    const wishItems = [
        { id: 1, name: "무오키 (MUOKI)", desc: "박무현 셰프의 독창적인 컨템포러리 다이닝", location: "강남구청역", score: "4.9", reviewCount: "245", isOpen: true, img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400" },
        { id: 2, name: "을지다락 강남", desc: "오므라이스와 매콤 크림 파스타", location: "역삼역", score: "4.8", reviewCount: "2.4k", isOpen: true, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=400" },
    ];

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            <View className="px-5 py-4 flex-row justify-between items-center border-b border-neutral-50">
                <View className="flex-row items-center">
                    <Text className="text-[24px] font-black text-neutral-900">즐겨찾기</Text>
                    <View className="ml-2 bg-red-500 w-6 h-6 rounded-full items-center justify-center">
                        <Text className="text-white text-[12px] font-black">{wishItems.length}</Text>
                    </View>
                </View>
                <Pressable className="w-10 h-10 items-center justify-center bg-neutral-50 rounded-full">
                    <SlidersHorizontal size={20} color="#1e293b" />
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-6">
                {wishItems.map((item) => (
                    <FoodListCard
                        key={item.id}
                        {...item}
                        isLiked={true} // 👈 여기서 하트를 꽉 채워줌!
                    />
                ))}
                <View className="h-28" />
            </ScrollView>

            <View className="absolute bottom-10 w-full items-center">
                <Pressable className="bg-neutral-900 flex-row items-center px-6 py-3.5 rounded-full shadow-lg shadow-black/30">
                    <Map size={18} color="white" />
                    <Text className="text-white font-bold ml-2 text-[15px]">지도보기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
