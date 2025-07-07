import { http, HttpResponse } from 'msw';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface GoogleLoginRequestBody {
  token: string;
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

  http.post('http://localhost:3000/api/auth/google-login', async ({ request }) => {
    const body = await request.json() as GoogleLoginRequestBody;
    const { token } = body;

    if (token) {
      return HttpResponse.json({
        user: {
          id: '2',
          name: 'Test Google User',
          email: 'testgoogle@example.com',
        },
        token: 'mock-token-345',
      });
    }

    return new HttpResponse('Invalid credentials', { status: 401 });
  }),
  
  http.post('http://localhost:3000/api/auth/signup', async ({ request }) => {
    const body = await request.json() as LoginRequestBody;
    const { email, password } = body;

    if (email && password) {
      return HttpResponse.json({
        message: 'signed up successfully',
      });
    }

    return new HttpResponse('Invalid credentials', { status: 401 });
  }),
];
