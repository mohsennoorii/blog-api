import { Global, Module } from '@nestjs/common';
import { ApplicationConfigService as ConfigService } from '@shared/config';
import * as fa from 'firebase-admin';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {

        return fa.initializeApp({
          credential: fa.credential.cert(configService.firebaseServiceAccount)
        });

      }
    },
    AuthService
  ],
  controllers: [AuthController],
  exports: ['FIREBASE_ADMIN'],
})
export class AuthModule {}
