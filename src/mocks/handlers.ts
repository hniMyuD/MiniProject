import { http, HttpResponse } from 'msw';

interface LoginRequestBody {
  email: string;
  password: string;
}

export const handlers = [
  http.post('http://localhost:3000/api/auth/login', async ({ request }) => {
    const body = await request.json() as LoginRequestBody; 
    const { email, password } = body;

    if (email === 'test@example.com' && password === '123456') {
      return HttpResponse.json({
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        },
        token: 'mock-token-123',
      });
    }

    return new HttpResponse('Invalid credentials', { status: 401 });
  }),
];
