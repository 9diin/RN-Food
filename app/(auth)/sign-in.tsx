import { useRouter } from "expo-router";
import { ArrowRight, Bookmark, Lock, Mail } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="px-7">
                    {/* 1. 브랜드 헤더: 콤팩트한 배치 */}
                    <View className="mt-16 mb-12">
                        <View className="flex-row items-center mb-5">
                            <View className="bg-neutral-900 w-9 h-9 rounded-xl items-center justify-center mr-3">
                                <Bookmark size={18} color="white" fill="white" />
                            </View>
                            <Text className="text-neutral-900 text-[20px] font-black tracking-tighter">TasteArchive</Text>
                        </View>

                        <Text className="text-neutral-900 text-[32px] font-black leading-[40px] tracking-tight">잊지 못할{"\n"}맛의 기록</Text>
                        <Text className="text-neutral-400 text-[14px] font-bold mt-3 leading-5">당신만이 알고 있는 소중한 맛집들을{"\n"}하나의 아카이브로 완성해보세요.</Text>
                    </View>

                    {/* 2. 정제된 입력 폼: h-14(56px) 규격 적용 */}
                    <View className="gap-y-6">
                        {/* 이메일 */}
                        <View>
                            <Text className="text-neutral-900 text-[13px] font-black mb-2.5 ml-1">이메일</Text>
                            <View className="h-14 bg-neutral-50 rounded-xl border border-neutral-100 px-4 flex-row items-center">
                                <Mail size={16} color="#737373" strokeWidth={2.5} />
                                <TextInput
                                    placeholder="your@email.com"
                                    placeholderTextColor="#D4D4D4"
                                    value={email}
                                    onChangeText={setEmail}
                                    className="flex-1 ml-3 text-[15px] font-bold text-neutral-900"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* 비밀번호 */}
                        <View>
                            <View className="flex-row justify-between items-center mb-2.5 px-1">
                                <Text className="text-neutral-900 text-[13px] font-black">비밀번호</Text>
                                <TouchableOpacity>
                                    <Text className="text-neutral-400 text-[12px] font-bold underline">비밀번호 찾기</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="h-14 bg-neutral-50 rounded-xl border border-neutral-100 px-4 flex-row items-center">
                                <Lock size={16} color="#737373" strokeWidth={2.5} />
                                <TextInput placeholder="••••••••" placeholderTextColor="#D4D4D4" value={password} onChangeText={setPassword} secureTextEntry className="flex-1 ml-3 text-[15px] font-bold text-neutral-900" />
                            </View>
                        </View>
                    </View>

                    {/* 3. 로그인 액션 버튼: h-14 동일 규격 */}
                    <View className="mt-10">
                        <TouchableOpacity onPress={() => router.replace("/(tabs)")} activeOpacity={0.9} className="bg-neutral-900 h-14 rounded-xl flex-row items-center justify-center shadow-lg shadow-black/10">
                            <Text className="text-white text-[16px] font-black">아카이브 시작하기</Text>
                            <ArrowRight size={18} color="white" strokeWidth={2.5} className="ml-2" />
                        </TouchableOpacity>
                    </View>

                    {/* 4. 푸터 */}
                    <View className="mt-auto mb-10">
                        <View className="flex-row justify-center items-center">
                            <Text className="text-neutral-400 font-bold text-[14px]">처음이신가요?</Text>
                            <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")} className="ml-2">
                                <Text className="text-neutral-900 font-black text-[14px] underline">회원가입</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
