import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  name: string;
  token: string;
  setUser: (payload: { name: string; token: string }) => void;
};

const useBaseStore = create(
  persist<UserStore>(
    (set) => ({
      name: "",
      token: "",
      setUser: (payload) => set(payload),
    }),
    { name: "base" }
  )
);

export default useBaseStore;
