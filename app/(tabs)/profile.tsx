import { useRouter } from "expo-router";
import { Bell, ChevronRight, CreditCard, Heart, Info, LogOut, MessageSquare, Settings, ShieldCheck, ShoppingBag, Star, Ticket } from "lucide-react-native";
import React from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
            { text: "취소", style: "cancel" },
            { text: "확인", onPress: () => console.log("Logout") },
        ]);
    };

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            {/* Header: 경계선 없는 깔끔한 헤더 */}
            <View className="px-6 py-4 flex-row justify-between items-center">
                <Text className="text-[22px] font-bold text-neutral-900">내 정보</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Settings size={22} color="#171717" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* [섹션 1] 프로필: FoodListCard 레이아웃 계승 */}
                <View className="px-6 py-8 flex-row items-start gap-5">
                    <View className="relative">
                        <Image source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" }} className="w-24 h-24 rounded-xl bg-neutral-100" />
                        <View className="absolute -bottom-1 -right-1 bg-neutral-900 px-2 py-0.5 rounded-lg border-2 border-white">
                            <Text className="text-[9px] text-white font-black italic">VIP</Text>
                        </View>
                    </View>

                    <View className="flex-1 h-24 justify-between py-1">
                        <View>
                            <View className="flex-row items-center">
                                <Text className="text-neutral-900 text-[22px] font-bold" numberOfLines={1}>
                                    미식이형
                                </Text>
                                <View className="ml-2 bg-neutral-100 px-2 py-0.5 rounded-md">
                                    <Text className="text-neutral-500 text-[10px] font-bold">프로 미식가</Text>
                                </View>
                            </View>
                            <Text className="text-neutral-400 text-[13px] mt-1 font-medium">gourmet_bro@example.com</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Star size={14} color="#F97316" fill="#F97316" />
                                <Text className="ml-1 text-neutral-900 font-bold text-[14px]">4.9</Text>
                                <View className="mx-2 w-px h-3 bg-neutral-200" />
                                <Text className="text-neutral-500 text-[12px]">리뷰 124개</Text>
                            </View>
                            <TouchableOpacity className="bg-neutral-50 px-3 py-1.5 rounded-xl" onPress={() => router.push("/profile/edit")}>
                                <Text className="text-neutral-500 text-[11px] font-bold">수정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* [섹션 2] 퀵 메뉴: 카드 배경 없이 아이콘 위주로 깔끔하게 */}
                <View className="px-6 mb-10 flex-row justify-around">
                    <QuickItem label="즐겨찾기" count="12" icon={<Heart size={20} color="#FF4B4B" fill="#FF4B4B" />} />
                    <QuickItem label="내 리뷰" count="5" icon={<MessageSquare size={20} color="#3B82F6" fill="#3B82F6" />} />
                    <QuickItem label="쿠폰함" count="2" icon={<Ticket size={20} color="#F59E0B" fill="#F59E0B" />} />
                </View>

                {/* 섹션 구분선: 더 얇고 깔끔하게 (bg-neutral-50) */}
                <View className="h-[8px] bg-neutral-50 w-full" />

                {/* [섹션 3] 나의 활동: 카드 형태 제거, 텍스트와 라인으로만 구성 */}
                <View className="py-6">
                    <Text className="px-6 text-[14px] font-bold text-neutral-400 mb-2">나의 활동</Text>
                    <MenuRow icon={<ShoppingBag size={20} color="#404040" />} label="예약 및 주문 내역" badge="3" />
                    <MenuRow icon={<CreditCard size={20} color="#404040" />} label="결제수단 관리" />
                    <MenuRow icon={<Bell size={20} color="#404040" />} label="알림 설정" />
                </View>

                {/* [섹션 4] 서비스 정보 */}
                <View className="py-6 border-t border-neutral-50">
                    <Text className="px-6 text-[14px] font-bold text-neutral-400 mb-2">서비스 정보</Text>
                    <MenuRow icon={<Info size={20} color="#404040" />} label="자주 묻는 질문" />
                    <MenuRow icon={<ShieldCheck size={20} color="#404040" />} label="약관 및 정책" />
                </View>

                {/* 로그아웃 및 푸터 */}
                <View className="mt-12 mb-20 items-center">
                    <TouchableOpacity onPress={handleLogout} className="flex-row items-center py-2 px-4">
                        <LogOut size={14} color="#D4D4D4" />
                        <Text className="ml-2 text-neutral-300 font-bold text-[14px]">로그아웃</Text>
                    </TouchableOpacity>
                    <Text className="text-neutral-200 text-[11px] mt-1">버전 1.2.4 (최신)</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// 퀵 메뉴 컴포넌트 (미니멀 스타일)
function QuickItem({ label, count, icon }: any) {
    return (
        <TouchableOpacity activeOpacity={0.6} className="items-center px-4">
            <View className="w-12 h-12 bg-neutral-50 rounded-full items-center justify-center mb-2">{icon}</View>
            <Text className="text-neutral-900 font-bold text-[16px]">{count}</Text>
            <Text className="text-neutral-400 text-[11px] font-medium mt-1">{label}</Text>
        </TouchableOpacity>
    );
}

// 메뉴 로우 컴포넌트 (카드 박스 제거 버전)
function MenuRow({ icon, label, badge }: any) {
    return (
        <TouchableOpacity activeOpacity={0.5} className="flex-row items-center px-6 py-4">
            <View className="mr-4">{icon}</View>
            <Text className="flex-1 text-neutral-800 font-medium text-[16px]">{label}</Text>
            <View className="flex-row items-center">
                {badge && (
                    <View className="bg-red-500 px-1.5 py-0.5 rounded-full mr-2">
                        <Text className="text-white text-[10px] font-bold">{badge}</Text>
                    </View>
                )}
                <ChevronRight size={18} color="#E5E5E5" strokeWidth={2} />
            </View>
        </TouchableOpacity>
    );
}
