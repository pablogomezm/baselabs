import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthenticatedRequest } from '../types/auth.types';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: AuthenticatedRequest): Promise<string> {
    /*
    nestjs ThrottlerGuard limits by ip by default
    this custom UserThrottlerGuard limits by user id
    and if there is no user then it uses the ip
    */
    if (req.user?.id) {
      return Promise.resolve(req.user.id);
    }
    return Promise.resolve(req.ip ?? '0.0.0.0');
  }
}
