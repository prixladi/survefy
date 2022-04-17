export type UserCreateModel = {
  email: string;
  password: string;
};

export type UserLoginModel = {
  email: string;
  password: string;
};

export type UserAuthPayload = { id: string; email: string };
