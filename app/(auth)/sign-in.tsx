import { supabase } from "@/src/lib/supabase";
import { useRouter } from "expo-router";
import { ArrowRight, Bookmark, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) Alert.alert("로그인 실패", error.message);
        setLoading(false);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-7">
                    <View className="mt-16 mb-12">
                        <View className="flex-row items-center mb-5">
                            <View className="bg-neutral-900 w-9 h-9 rounded-xl items-center justify-center mr-3">
                                <Bookmark size={18} color="white" fill="white" />
                            </View>
                            <Text className="text-neutral-900 text-[20px] font-black tracking-tighter">TasteArchive</Text>
                        </View>
                        <Text className="text-neutral-900 text-[32px] font-black leading-[40px] tracking-tight">잊지 못할{"\n"}맛의 기록</Text>
                    </View>

                    <View className="gap-y-6">
                        <View>
                            <Text className="text-neutral-900 text-[13px] font-black mb-2.5 ml-1 uppercase">Email</Text>
                            <View className="h-14 bg-neutral-50 rounded-xl border border-neutral-100 px-4 flex-row items-center">
                                <Mail size={16} color="#737373" />
                                <TextInput value={email} onChangeText={setEmail} placeholder="email@address.com" className="flex-1 ml-3 font-bold" autoCapitalize="none" />
                            </View>
                        </View>
                        <View>
                            <Text className="text-neutral-900 text-[13px] font-black mb-2.5 ml-1 uppercase">Password</Text>
                            <View className="h-14 bg-neutral-50 rounded-xl border border-neutral-100 px-4 flex-row items-center">
                                <Lock size={16} color="#737373" />
                                <TextInput value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry className="flex-1 ml-3 font-bold" />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={signInWithEmail} disabled={loading} className="bg-neutral-900 h-14 rounded-xl flex-row items-center justify-center mt-10 shadow-lg">
                        <Text className="text-white font-black">{loading ? "로그인 중..." : "아카이브 시작하기"}</Text>
                        {!loading && <ArrowRight size={18} color="white" className="ml-2" />}
                    </TouchableOpacity>

                    <View className="mt-auto mb-10 flex-row justify-center">
                        <Text className="text-neutral-400 font-bold">처음이신가요?</Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
                            <Text className="text-neutral-900 font-black ml-2 underline">회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
