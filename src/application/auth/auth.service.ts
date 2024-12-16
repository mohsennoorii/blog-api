import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import * as fa from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AuthService {

  async singUp(dto: SignUpDto): Promise<UserRecord> {
    
    return await fa.auth().createUser({ ...dto, emailVerified: false, disabled: false });
    
  }

  async verifyEmail(email: string): Promise<string> {

    return await fa.auth().generateEmailVerificationLink(email);

  }

}
