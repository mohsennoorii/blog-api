import { UserService } from '@app/user/user.service';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as fa from 'firebase-admin';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: (error?: Error | any) => void) {

    const token: string = this.extractToken(req);

    if (!token) throw new UnauthorizedException();
    
    let decodedToken: fa.auth.DecodedIdToken;
  
    try { 

      decodedToken = await fa.auth().verifyIdToken(token);

    } catch(error) {

      throw new UnauthorizedException();

    }

    const user = await this.userService.findOne(decodedToken.sub);

    if (!user) throw new UnauthorizedException();

    req.user = user;

    return next();
  }

  private extractToken(request: any): string | null {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
  }
}
