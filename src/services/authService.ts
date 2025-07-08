import { publicHttp, request } from '@api/httpAxios';

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    slogan?: string;
    dob?: string;
    avatar?: string;
    phone?: string;
    cell?: string;
    location?: {
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      postcode?: string;
    };
  };
  token: string;
}

interface SignUpResponse {
  message: string;
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

export const signUp = async (email: string, password: string): Promise<SignUpResponse> => {
  return request<SignUpResponse>({
    url: '/auth/signup',
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

type LoginParams =
  | { type: "normal"; email: string; password: string }
  | { type: "google"; googleToken: string };


export const loginWithMockUser = async (params: LoginParams): Promise<LoginResponse> => {
  if (params.type === "normal") {
    const { email, password } = params;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
  } else if (params.type === "google") {
    const { googleToken } = params;
    if (!googleToken) {
      throw new Error("Google token is required");
    }
  }

  const res = await publicHttp.get("api/?results=1");
  const userData = res.data.results[0];

  const user = {
    id: userData.login.uuid,
    name: `${userData.name.first} ${userData.name.last}`,
    email: userData.email,
    slogan: "I'm a mock user from Random User Generator",
    dob: userData.dob.date,
    avatar: userData.picture.large,
    phone: userData.phone,
    cell: userData.cell,  
    location: {
      address: userData.location.street ? `${userData.location.street.number} ${userData.location.street.name}` : "",
      city: userData.location.city,
      state: userData.location.state,
      country: userData.location.country,
      postcode: userData.location.postcode,
    },
  };
  console.log("Mock user data:", user);

  const token = "mock-token-" + user.id.slice(0, 8);

  return { user, token };
};
