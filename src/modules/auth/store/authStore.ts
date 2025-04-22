import { defineStore } from "pinia";
import { authService } from "../services/authApi";
import type { LoginForm, AuthResponse, RegisterForm } from "../types";
import { safeParse } from "@/utils/helpers";

interface AuthState {
  token: string | null;
  user: AuthResponse["user"] | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token") || null,
    user:safeParse(localStorage.getItem('user')),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(form: LoginForm) {
      try {
        const { token, user } = await authService.login(form);

        this.token = token;
        this.user = user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return true;
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    async register(form: RegisterForm) {
      try {
        const { token, user } = await authService.register(form);
        this.setAuthData(token, user);
        return true;
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    setAuthData(token: string, user: AuthResponse["user"]) {
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    async logout() {
      await authService.logout();
      this.clearAuth();
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
