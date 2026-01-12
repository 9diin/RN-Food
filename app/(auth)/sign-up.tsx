import { supabase } from "@/src/lib/supabase";
import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function signUpWithEmail() {
        if (!agreed) return Alert.alert("알림", "약관에 동의해주세요.");
        setLoading(true);

        const { error } = await supabase.auth.signUp({ email, password });

        console.log(error);

        if (error) Alert.alert("회원가입 실패", error.message);
        else Alert.alert("성공", "인증 메일을 확인해주세요!");
        setLoading(false);
    }

    return (
        <SafeAreaView className="flex-1 bg-white px-7">
            <TouchableOpacity onPress={() => router.back()} className="py-4">
                <ArrowLeft color="black" />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="text-[32px] font-black mt-4 mb-10">Create Account</Text>

                <View className="gap-y-6">
                    <View>
                        <Text className="text-[11px] font-black uppercase mb-2">Email</Text>
                        <TextInput value={email} onChangeText={setEmail} className="h-14 bg-neutral-50 px-4 rounded-xl border border-neutral-100 font-bold" autoCapitalize="none" />
                    </View>
                    <View>
                        <Text className="text-[11px] font-black uppercase mb-2">Password</Text>
                        <TextInput value={password} onChangeText={setPassword} className="h-14 bg-neutral-50 px-4 rounded-xl border border-neutral-100 font-bold" secureTextEntry />
                    </View>
                </View>

                <TouchableOpacity onPress={() => setAgreed(!agreed)} className="flex-row items-center mt-8">
                    <View className={`w-5 h-5 rounded border items-center justify-center ${agreed ? "bg-black" : "bg-white"}`}>{agreed && <Check size={12} color="white" />}</View>
                    <Text className="ml-3 text-neutral-400 font-bold text-xs">서비스 이용약관 동의</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={signUpWithEmail} className={`h-14 rounded-xl items-center justify-center mt-10 ${agreed ? "bg-black" : "bg-neutral-100"}`}>
                    <Text className={`font-black ${agreed ? "text-white" : "text-neutral-300"}`}>계정 생성 완료</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
