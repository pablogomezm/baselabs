import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'prisma-client';
import { UserWithoutPassword } from 'src/types/user.types';
import { HashService } from 'src/users/hash.service';
import { UsersService } from 'src/users/users.service';
import { SignInResponse } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user: User | null = await this.usersService.findByEmail(email);
    if (!user) return null;

    const passwordIsValid: boolean = await this.hashService.comparePassword(
      password,
      user.password,
    );
    if (!passwordIsValid) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  login(user: UserWithoutPassword): SignInResponse {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
