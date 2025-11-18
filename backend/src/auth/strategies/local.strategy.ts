import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserWithoutPassword } from 'src/types/user.types';
import { AuthService } from '../auth.service';
import { PASSPORT_STRATEGIES } from '../constants/passport-strategies';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  PASSPORT_STRATEGIES.LOCAL,
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user: UserWithoutPassword | null =
      await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
