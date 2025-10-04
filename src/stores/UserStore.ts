import { create } from 'zustand';

interface User {
  id: string | null;
  username: string | null;
  email: string | null;
  profilePicture: string | null;
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
});

export const useUserStore = create<UserStore>(set => ({
  user: getInitialUser(),
  userLogin: userData =>
    set({
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        profilePicture: userData.profilePicture,
      },
    }),
  userLogout: () => set({ user: getInitialUser() }),
}));
