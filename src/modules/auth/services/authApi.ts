import http from '@/api/http';
import type { LoginForm, AuthResponse, RegisterForm } from '../types';

export const authService = {
  async login(form: LoginForm): Promise<AuthResponse> {
    const response = await http.post('/login', form);
    return response.data;
  },
  async register(form: RegisterForm): Promise<AuthResponse> {
    const response = await http.post('/register', form);
    return response.data;
  },
  async logout(): Promise<void> {
    await http.post('/logout');
  }
};