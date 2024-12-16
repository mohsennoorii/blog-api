
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {

    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return true;
    }
}
            