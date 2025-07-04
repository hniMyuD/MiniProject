import { request } from '@api/httpAxios';

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
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

export const logout = async (): Promise<void> => {
  return request<void>({
    url: '/auth/logout',
    method: 'POST',
  });
};

