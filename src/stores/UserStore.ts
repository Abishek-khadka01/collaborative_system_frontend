import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string | null;
  username: string | null;
  email: string | null;
  profilePicture: string | null;
  accessToken: string | null;
}

interface UserStore {
  user: User;
  userLogin: (userData: User) => void;
  userLogout: () => void;
}

const getInitialUser = (): User => ({
  id: null,
  username: null,
  email: null,
  profilePicture: null,
  accessToken: null,
});

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: getInitialUser(),

      userLogin: userData =>
        set({
          user: {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            profilePicture: userData.profilePicture,
            accessToken: userData.accessToken,
          },
        }),

      userLogout: () => set({ user: getInitialUser() }),
    }),
    {
      name: 'user-storage',
    }
  )
);
