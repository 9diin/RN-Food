import { useRouter } from "expo-router";
import { Camera, ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileEditScreen() {
    const router = useRouter();

    const [name, setName] = useState("미식이형");
    const [bio, setBio] = useState("전국 방방곡곡 맛집을 찾아다니는 미식가입니다.");
    const [email, setEmail] = useState("gourmet_bro@example.com");

    const handleSave = () => {
        // 실제 데이터 업데이트 로직 (API 호출 등)
        router.back();
    };

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            {/* Header: 뒤로가기 버튼과 타이틀만 남겨 심플하게 구성 */}
            <View className="px-6 py-4 flex-row items-center border-b border-neutral-50">
                <TouchableOpacity onPress={() => router.back()} className="p-1 -ml-2 mr-4">
                    <ChevronLeft size={24} color="#171717" strokeWidth={2.5} />
                </TouchableOpacity>
                <Text className="text-[20px] font-bold text-neutral-900">프로필 수정</Text>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1 px-6"
                    contentContainerStyle={{ paddingBottom: 120 }} // 하단 버튼 여백
                >
                    {/* 프로필 이미지 영역 */}
                    <View className="items-center py-10">
                        <TouchableOpacity activeOpacity={0.9} className="relative">
                            <Image source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" }} className="w-28 h-28 rounded-[36px] bg-neutral-100" />

                            {/* 카메라 버튼 리디자인: 은은한 화이트 반투명 배경 */}
                            <View
                                style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
                                className="absolute bottom-0 right-0 bg-white w-9 h-9 rounded-full items-center justify-center border border-neutral-100"
                            >
                                <Camera size={18} color="#64748B" strokeWidth={2} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* 입력 폼 영역: 섹션 간 마진 균일화 (mt-8) */}
                    <View className="gap-y-8">
                        <InputGroup label="닉네임" value={name} onChangeText={setName} placeholder="닉네임을 입력해주세요" />
                        <InputGroup label="한 줄 소개" value={bio} onChangeText={setBio} placeholder="소개글을 입력해주세요" multiline />
                        <InputGroup label="이메일" value={email} placeholder="이메일을 입력해주세요" editable={false} />
                    </View>

                    {/* 유의사항 가이드 */}
                    <View className="mt-10 px-1">
                        <Text className="text-neutral-300 text-[12px] leading-5 font-medium">• 닉네임은 30일마다 한 번만 변경할 수 있습니다.{"\n"}• 부적절한 닉네임 사용 시 관리자에 의해 제재를 받을 수 있습니다.</Text>
                    </View>
                </ScrollView>

                {/* 하단 고정 저장 버튼 (Floated 스타일) */}
                <View className="absolute bottom-10 left-0 right-0 px-6">
                    <TouchableOpacity onPress={handleSave} activeOpacity={0.8} className="bg-neutral-900 w-full h-14 rounded-2xl items-center justify-center shadow-lg shadow-neutral-400">
                        <Text className="text-white text-[16px] font-black">저장하기</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// 톤앤매너를 지킨 공통 입력 컴포넌트
function InputGroup({ label, value, onChangeText, placeholder, multiline, editable = true }: any) {
    return (
        <View className="gap-y-3">
            <Text className="text-[14px] font-extrabold text-neutral-400 ml-1">{label}</Text>
            <View className={`bg-neutral-50 rounded-2xl px-5 ${multiline ? "py-4 h-32" : "py-4"} ${!editable && "opacity-40"}`}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#D1D5DB"
                    className="text-[16px] text-neutral-900 font-bold"
                    multiline={multiline}
                    textAlignVertical={multiline ? "top" : "center"}
                    editable={editable}
                    selectionColor="#171717"
                />
            </View>
        </View>
    );
}
