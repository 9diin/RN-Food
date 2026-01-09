import { Bell, ChevronRight, CreditCard, Heart, Info, LogOut, MessageSquare, Settings, ShieldCheck, ShoppingBag, Ticket } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            {/* Header */}
            <View className="px-5 py-4 flex-row justify-between items-center">
                <Text className="text-[24px] font-black text-neutral-900">내 정보</Text>
                <Pressable className="w-10 h-10 items-center justify-center bg-neutral-50 rounded-full">
                    <Settings size={20} color="#1e293b" />
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* 섹션 1: 프로필 상단 (라운디드 스퀘어 적용) */}
                <View className="px-5 py-8 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="relative">
                            {/* 카카오톡 스타일 라운디드 스퀘어: rounded-[26px] 정도가 가장 예쁨 */}
                            <Image source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" }} className="w-[72px] h-[72px] rounded-[26px] bg-neutral-100" />
                            {/* VIP 배지 위치 및 디자인 미세 조정 */}
                            <View className="absolute -bottom-1 -right-1 bg-neutral-900 px-1.5 py-0.5 rounded-lg border-2 border-white">
                                <Text className="text-[9px] text-white font-black italic">VIP</Text>
                            </View>
                        </View>

                        <View className="ml-5">
                            <View className="flex-row items-center">
                                <Text className="text-[20px] font-black text-neutral-900">미식이형</Text>
                                {/* 프로 미식가 배지: 더 통통하게(py-1.5) 수정 */}
                                <View className="ml-2 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200/50 mt-0.5">
                                    <Text className="text-neutral-500 text-[10px] font-extrabold">프로 미식가</Text>
                                </View>
                            </View>
                            <Text className="text-neutral-400 text-[13px] mt-2 font-semibold">gourmet_bro@example.com</Text>
                        </View>
                    </View>

                    <Pressable className="w-10 h-10 bg-neutral-50 rounded-full items-center justify-center border border-neutral-100">
                        <ChevronRight size={20} color="#CBD5E1" strokeWidth={2.5} />
                    </Pressable>
                </View>

                {/* 섹션 2: 퀵 메뉴 (카드 배경색 + 아이콘 박스 조화) */}
                <View className="px-5 mb-8">
                    <View className="flex-row gap-x-3">
                        <QuickCard label="즐겨찾기" count="12" icon={<Heart size={18} color="#FF4B4B" fill="#FF4B4B" />} bgColor="bg-red-50/50" />
                        <QuickCard label="내 리뷰" count="5" icon={<MessageSquare size={18} color="#4B9DFF" fill="#4B9DFF" />} bgColor="bg-blue-50/50" />
                        <QuickCard label="쿠폰함" count="2" icon={<Ticket size={18} color="#FF9F4B" fill="#FF9F4B" />} bgColor="bg-orange-50/50" />
                    </View>
                </View>

                <View className="h-[10px] bg-neutral-50 w-full" />

                {/* 섹션 3: 나의 활동 */}
                <View className="px-5 py-8">
                    <Text className="text-[18px] font-extrabold text-neutral-900 mb-4">나의 활동</Text>
                    <View className="bg-neutral-50 rounded-[28px] px-2 py-1">
                        <MenuRow icon={<ShoppingBag size={18} color="#64748B" />} label="예약 및 주문 내역" badge="3" />
                        <View className="mx-4 h-[1px] bg-white/50" />
                        <MenuRow icon={<CreditCard size={18} color="#64748B" />} label="결제수단 관리" />
                        <View className="mx-4 h-[1px] bg-white/50" />
                        <MenuRow icon={<Bell size={18} color="#64748B" />} label="알림 설정" />
                    </View>

                    <Text className="text-[18px] font-extrabold text-neutral-900 mt-10 mb-4">서비스 정보</Text>
                    <View className="bg-neutral-50 rounded-[28px] px-2 py-1">
                        <MenuRow icon={<Info size={18} color="#64748B" />} label="자주 묻는 질문" />
                        <View className="mx-4 h-[1px] bg-white/50" />
                        <MenuRow icon={<ShieldCheck size={18} color="#64748B" />} label="약관 및 정책" />
                    </View>

                    {/* 섹션 5: 로그아웃 */}
                    <View className="mt-12 items-center mb-10">
                        <Pressable className="flex-row items-center px-6 py-3">
                            <LogOut size={14} color="#CBD5E1" />
                            <Text className="ml-2 text-neutral-300 font-bold text-[14px]">로그아웃</Text>
                        </Pressable>
                        <Text className="text-neutral-200 text-[11px] mt-1 font-medium">버전 정보 1.2.4 (최신)</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const QuickCard = ({ label, count, icon, bgColor }: any) => (
    <Pressable className={`flex-1 ${bgColor} border border-neutral-100/50 rounded-[28px] p-5 items-center`}>
        <View className="bg-white w-10 h-10 rounded-full items-center justify-center mb-3 shadow-sm shadow-neutral-100">{icon}</View>
        <Text className="text-neutral-900 font-black text-[18px] mb-0.5">{count}</Text>
        <Text className="text-neutral-400 text-[11px] font-bold">{label}</Text>
    </Pressable>
);

const MenuRow = ({ icon, label, badge }: any) => (
    <Pressable className="flex-row items-center px-4 py-5">
        {icon && <View className="mr-3.5">{icon}</View>}
        <Text className="flex-1 text-neutral-800 font-bold text-[15px]">{label}</Text>
        <View className="flex-row items-center">
            {badge && (
                <View className="bg-red-500 w-5 h-5 rounded-full items-center justify-center mr-2 shadow-sm shadow-red-200">
                    <Text className="text-white text-[10px] font-black">{badge}</Text>
                </View>
            )}
            <View className="mt-[2px]">
                <ChevronRight size={16} color="#CBD5E1" strokeWidth={2.5} />
            </View>
        </View>
    </Pressable>
);
