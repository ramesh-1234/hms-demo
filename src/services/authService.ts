// import {
//   getLocalData,
//   setLocalData,
//   removeLocalData,
// } from "../db/localStorage";
import {
  getLocalData,
  setLocalData,
  removeLocalData,
} from "../db/localStorage";
import { STORAGE_KEYS } from "../db/storageKeys";
import type { User } from "../types/auth";

export const authService = {
  login: (email: string, password: string) => {
    const users = getLocalData<User[]>(STORAGE_KEYS.USERS, []);

    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    setLocalData(STORAGE_KEYS.AUTH, foundUser);
    return foundUser;
  },

  logout: () => {
    removeLocalData(STORAGE_KEYS.AUTH);
  },

  getCurrentUser: () => {
    return getLocalData<User | null>(STORAGE_KEYS.AUTH, null);
  },
};
