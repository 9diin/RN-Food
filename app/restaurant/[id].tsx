import { supabase } from "@/src/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, Clock, Heart, MapPin, Phone, Share2, Star } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Clipboard, Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function RestaurantDetailScreen() {
    const { item } = useLocalSearchParams();
    const router = useRouter();
    const data = item ? JSON.parse(item as string) : null;

    // UI 반영을 위한 상태
    const [liked, setLiked] = useState(false);

    // [중요] 초기 로드 시 DB에 해당 데이터가 있는지 체크하여 하트 불을 켭니다.
    useEffect(() => {
        const checkLikedStatus = async () => {
            if (!data?.id) return;
            const { data: existingItem } = await supabase.from("wishlist").select("*").eq("place_id", String(data.id)).single();

            if (existingItem) setLiked(true);
        };
        checkLikedStatus();
    }, [data?.id]);

    if (!data) return null;

    const toggleWishlist = async () => {
        try {
            // 1. 현재 유저 정보 확인 (로그인 기능 연동 시)
            const {
                data: { user },
            } = await supabase.auth.getUser();

            // 2. 이미 찜한 상태라면 삭제 진행
            if (liked) {
                const { error: deleteError } = await supabase.from("wishlist").delete().eq("place_id", String(data.id));

                if (deleteError) throw deleteError;
                setLiked(false);
                return;
            }

            // 3. 찜하지 않은 상태라면 추가 진행
            const { error: insertError } = await supabase.from("wishlist").insert([
                {
                    place_id: String(data.id),
                    name: data.name,
                    category: data.category,
                    location: data.location,
                    img_url: data.img,
                    score: data.score,
                    user_id: user?.id || null, // 로그인 안했으면 null (DB 설정에 따라 허용 필요)
                },
            ]);

            if (insertError) {
                // 중복 에러(23505) 발생 시 예외 처리
                if (insertError.code === "23505") {
                    setLiked(true);
                    return;
                }
                throw insertError;
            }

            setLiked(true);
            Alert.alert("알림", "나만의 맛집 리스트에 추가되었습니다.");
        } catch (error: any) {
            if (error.code === "42501") {
                Alert.alert("보안 에러", "Supabase DB의 RLS 설정을 확인하거나 로그인이 필요합니다.");
            } else {
                Alert.alert("에러", "작업을 처리할 수 없습니다.");
            }
            console.error("Wishlist Toggle Error:", error);
        }
    };

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        Alert.alert("알림", "주소가 복사되었습니다.");
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView edges={["top"]} className="absolute z-10 w-full flex-row justify-between px-5 items-center mt-2">
                <Pressable onPress={() => router.back()} className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
                    <ArrowLeft size={22} color="white" />
                </Pressable>
                <Pressable className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
                    <Share2 size={20} color="white" />
                </Pressable>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <Image source={{ uri: data.img }} style={{ width: width, height: 350 }} resizeMode="cover" />

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
                        {data.name}은(는) 방배동에 위치한 {data.category} 전문점입니다.
                    </Text>
                </View>

                {/* 매장 정보 섹션 */}
                <View className="px-5 py-9 border-b-[8px] border-neutral-50">
                    <Text className="text-[19px] font-bold text-neutral-900 mb-6">매장 정보</Text>
                    <View className="gap-y-7">
                        <View className="flex-row items-start">
                            <MapPin size={18} color="#64748B" className="mt-0.5" />
                            <View className="ml-3 flex-1">
                                <Text className="text-neutral-900 font-bold text-[15px] leading-5">{data.fullAddress || data.location}</Text>
                            </View>
                            <Pressable className="bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100" onPress={() => copyToClipboard(data.fullAddress || data.location)}>
                                <Text className="text-neutral-600 text-[12px] font-bold">복사</Text>
                            </Pressable>
                        </View>
                        <View className="flex-row items-start">
                            <Clock size={18} color="#64748B" className="mt-0.5" />
                            <View className="ml-3 flex-1">
                                <Text className="text-neutral-900 font-bold text-[15px]">오늘 11:30 - 22:00</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            <Phone size={18} color="#64748B" />
                            <Text className="ml-3 text-neutral-900 font-bold text-[15px]">{data.telephone || "번호 정보 없음"}</Text>
                        </View>
                    </View>
                </View>

                {/* 추천 메뉴 */}
                <View className="px-5 py-9 pb-40">
                    <Text className="text-[19px] font-bold text-neutral-900 mb-6">추천 메뉴</Text>
                    <View className="flex-row mb-8 items-start">
                        <View className="flex-1 pr-5">
                            <Text className="font-bold text-neutral-900 text-[17px] leading-5">{data.name} 대표 메뉴</Text>
                            <Text className="text-neutral-400 text-[13px] mt-2 leading-5 font-medium" numberOfLines={2}>
                                {data.category} 장인이 선보이는 시그니처 메뉴입니다.
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

            {/* 하단 바 */}
            <View className="absolute bottom-0 w-full bg-white border-t border-neutral-50 px-5 pt-3 pb-10 shadow-lg">
                <View className="flex-row items-center gap-x-3">
                    <Pressable onPress={toggleWishlist} className={`w-14 h-14 rounded-2xl items-center justify-center border ${liked ? "bg-red-50 border-red-100" : "bg-neutral-50 border-neutral-100"}`}>
                        <Heart size={24} color="#EF4444" fill={liked ? "#EF4444" : "transparent"} />
                    </Pressable>
                    <Pressable className="flex-1 h-14 bg-neutral-900 rounded-2xl items-center justify-center">
                        <Text className="text-white font-bold text-[16px]">실시간 예약하기</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
