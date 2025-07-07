import { request } from '@api/httpAxios';

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    slogan?: string;
    dob?: string;
    avatar?: string;
  };
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return request<LoginResponse>({
    url: '/auth/login',
    method: 'POST',
    data: { email, password },
  });
};

export const loginWithGoogle = async (googleToken: string): Promise<LoginResponse> => {
  return request<LoginResponse>({
    url: '/auth/google-login',
    method: 'POST',
    data: { token: googleToken },
  });
};

export const logout = async (): Promise<void> => {
  return request<void>({
    url: '/auth/logout',
    method: 'POST',
  });
};

