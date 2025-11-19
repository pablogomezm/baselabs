import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'prisma-client';
import { UsersService } from 'src/users/users.service';
import { UserWithoutPassword } from 'src/types/user.types';
import { JWT_CONSTANTS } from '../constants/jwt';
import { PASSPORT_STRATEGIES } from '../constants/passport-strategies';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  PASSPORT_STRATEGIES.JWT,
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserWithoutPassword> {
    const user: User | null = await this.usersService.findByEmail(
      payload.email,
    );
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.usersService.getUserWithoutPassword(user);
  }
}
