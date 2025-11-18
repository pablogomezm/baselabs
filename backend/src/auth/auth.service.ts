import { Injectable } from '@nestjs/common';
import { User } from 'prisma-client';
import { UserWithoutPassword } from 'src/types/user.types';
import { HashService } from 'src/users/hash.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user: User | null = await this.usersService.findByEmail(email);
    if (!user) return null;

    const passwordIsValid = await this.hashService.comparePassword(
      password,
      user.password,
    );
    if (!passwordIsValid) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
