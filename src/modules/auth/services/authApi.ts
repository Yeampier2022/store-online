import http from '@/api/http';
import type { LoginForm, AuthResponse } from '../types';

export const authService = {
  async login(form: LoginForm): Promise<AuthResponse> {
    const response = await http.post('/login', form);
    return response.data;
  },

  async logout(): Promise<void> {
    await http.post('/logout');
  }
};