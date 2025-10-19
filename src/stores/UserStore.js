import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const getInitialUser = () => ({
    id: null,
    username: null,
    email: null,
    profilePicture: null,
    accessToken: null,
});
export const useUserStore = create()(persist(set => ({
    user: getInitialUser(),
    userLogin: userData => set({
        user: {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            profilePicture: userData.profilePicture,
            accessToken: userData.accessToken,
        },
    }),
    userLogout: () => set({ user: getInitialUser() }),
}), {
    name: 'user-storage',
}));
