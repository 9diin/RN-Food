import { useRouter } from "expo-router";
import { ArrowLeft, Check, Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
    const router = useRouter();
    const [agreed, setAgreed] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header: 높이를 줄여 더 깔끔하게 */}
            <View className="px-5 py-1">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
                    <ArrowLeft size={24} color="#171717" strokeWidth={2} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} className="px-6">
                    {/* 타이틀 영역: 폰트 사이즈 하향 조정 */}
                    <View className="mt-6 mb-10">
                        <Text className="text-neutral-900 text-[28px] font-black tracking-tighter leading-tight">Create Account</Text>
                        <Text className="text-neutral-400 text-[14px] font-bold mt-2">GourmetBro의 미식 여정에 합류하세요.</Text>
                    </View>

                    {/* 입력 폼 섹션: 간격 최적화 */}
                    <View className="gap-y-5">
                        <InputGroup label="Full Name" icon={<User size={16} color="#171717" strokeWidth={2.5} />} placeholder="성함을 입력해주세요" />
                        <InputGroup label="Email Address" icon={<Mail size={16} color="#171717" strokeWidth={2.5} />} placeholder="example@gourmet.com" keyboardType="email-address" />
                        <InputGroup label="Password" icon={<Lock size={16} color="#171717" strokeWidth={2.5} />} placeholder="8자 이상의 영문, 숫자 조합" secure />
                        <InputGroup label="Confirm Password" icon={<Lock size={16} color="#171717" strokeWidth={2.5} />} placeholder="비밀번호 재입력" secure />
                    </View>

                    {/* 약관 동의 섹션: 체크 시 내부 아이콘 노출 */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setAgreed(!agreed)} className="flex-row items-center mt-8 px-1">
                        <View className={`w-5 h-5 rounded-md items-center justify-center border ${agreed ? "bg-neutral-900 border-neutral-900" : "bg-white border-neutral-200"}`}>{agreed && <Check size={14} color="white" strokeWidth={4} />}</View>
                        <Text className={`ml-3 text-[13px] font-bold ${agreed ? "text-neutral-900" : "text-neutral-400"}`}>이용약관 및 개인정보 처리방침 동의</Text>
                    </TouchableOpacity>

                    {/* 가입 완료 버튼: 높이 16 -> 14(56px)로 조정 */}
                    <TouchableOpacity onPress={() => router.replace("/(tabs)")} activeOpacity={0.9} className={`mt-10 h-14 rounded-2xl items-center justify-center ${agreed ? "bg-neutral-900" : "bg-neutral-100"}`} disabled={!agreed}>
                        <Text className={`text-[15px] font-black ${agreed ? "text-white" : "text-neutral-300"}`}>계정 생성 완료</Text>
                    </TouchableOpacity>

                    {/* 푸터 */}
                    <View className="py-10 flex-row justify-center items-center">
                        <Text className="text-neutral-400 font-bold text-[13px]">이미 계정이 있으신가요?</Text>
                        <TouchableOpacity onPress={() => router.back()} className="ml-2">
                            <Text className="text-neutral-900 font-black text-[13px] underline">로그인</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/**
 * 컴팩트 버전 인풋 컴포넌트
 */
function InputGroup({ label, icon, placeholder, secure, keyboardType }: any) {
    return (
        <View className="gap-y-2">
            <Text className="text-neutral-400 text-[10px] font-black ml-1 uppercase tracking-[1px]">{label}</Text>
            <View className="bg-neutral-50 h-13 flex-row items-center px-4 py-3 rounded-xl border border-neutral-50">
                <View className="w-5 items-center">{icon}</View>
                <TextInput placeholder={placeholder} placeholderTextColor="#D4D4D4" secureTextEntry={secure} keyboardType={keyboardType} autoCapitalize="none" className="flex-1 ml-3 text-[15px] font-bold text-neutral-900" />
            </View>
        </View>
    );
}
