import { RoleEnum } from '@/modules/users/types/user.type';

export type JwtPayload = {
  userId: number;
  role: RoleEnum;
};

export type JwtPayloadWithRT = {
  userId: number;
  role: RoleEnum;
  refreshToken: string;
};
