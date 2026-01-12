import { create } from "zustand";

interface AuthState {
    user: any | null;
    isLoggedIn: boolean;
    setAuth: (user: any | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,
    setAuth: (user) => set({ user, isLoggedIn: !!user }),
    logout: () => set({ user: null, isLoggedIn: false }),
}));
