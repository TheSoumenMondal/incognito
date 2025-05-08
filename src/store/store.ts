import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  username: string;
  user_password: string;
  setUsername: (username: string) => void;
  set_User_Passowrd: (user_password: string) => void;
}

const useUserDetailsStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      user_password: "",
      setUsername: (username) => set({ username }),
      set_User_Passowrd: (user_password) => set({ user_password }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserDetailsStore;
