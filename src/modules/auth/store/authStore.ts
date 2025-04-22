import { defineStore } from 'pinia';
import { authService } from '../services/authApi';
import type { LoginForm, AuthResponse } from '../types';

interface AuthState {
  token: string | null;
  user: AuthResponse['user'] | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(form: LoginForm) {
      try {
        const { token, user } = await authService.login(form);
        
        this.token = token;
        this.user = user;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return true;
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    async logout() {
      await authService.logout();
      this.clearAuth();
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});