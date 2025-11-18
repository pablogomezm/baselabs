import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserWithoutPassword } from 'src/types/user.types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedRequest } from './types/auth-request.types';

@Controller('auth')
export class AuthController {
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signin(@Request() req: AuthenticatedRequest): UserWithoutPassword {
    return req.user;
  }
}
