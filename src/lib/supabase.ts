import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto"; // 반드시 최상단에 추가

const supabaseUrl = "https://visfrfxelojrwaoyekfi.supabase.co";
const supabaseAnonKey = "sb_publishable_EffcxNzldWo5kKNliIJiKw_e-4eVtLB";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage, // 자동 로그인 유지를 위해 필수
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
