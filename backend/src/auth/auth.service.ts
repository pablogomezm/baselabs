import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'prisma-client';
import { UserWithoutPassword } from 'src/types/user.types';
import { HashService } from 'src/users/hash.service';
import { UsersService } from 'src/users/users.service';
import { SignInResponse } from './types/auth.types';
import { SignUpDto } from './dto/signup.dto';
import { isPrismaUniqueConstraintError } from 'src/utils/prisma-error.utils';

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

    return this.usersService.getUserWithoutPassword(user);
  }

  login(user: UserWithoutPassword): SignInResponse {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<UserWithoutPassword> {
    const hashedPassword = await this.hashService.hashPassword(
      signUpDto.password,
    );
    try {
      const user: UserWithoutPassword = await this.usersService.create({
        ...signUpDto,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }
}
