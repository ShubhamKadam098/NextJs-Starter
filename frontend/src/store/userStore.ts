import { create } from "zustand";
import { UserResource } from "@clerk/types";

type UserState = {
  user: UserResource | null;
  isLoading: boolean;
  setUser: (user: UserResource | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
