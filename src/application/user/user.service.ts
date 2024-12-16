import { Injectable } from '@nestjs/common';
import * as fa from 'firebase-admin';

@Injectable()
export class UserService {
  
  async findOne(id: string) {
    return await fa.auth().getUser(id);
  }

}
