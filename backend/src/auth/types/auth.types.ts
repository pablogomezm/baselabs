import { Request } from 'express';
import { UserWithoutPassword } from 'src/types/user.types';

export interface AuthenticatedRequest extends Request {
  user: UserWithoutPassword;
}

export interface SignInResponse {
  access_token: string;
}
