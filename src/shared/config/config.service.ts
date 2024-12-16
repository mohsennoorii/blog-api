import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class ApplicationConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get env(): string {
    return this.configService.get<string>('ENV');
  }

  get firebaseEmulatorHost(): string {
    return this.configService.get<string>('FIREBASE_AUTH_EMULATOR_HOST','localhost:9099');
  }

  get firebaseServiceAccount(): Record<string, string> {

    return {
      'type': this.configService.get<string>('FIREBASE_ACCOUNT_TYPE'),
      'project_id': this.configService.get<string>('FIREBASE_PROJECT_ID'),
      'private_key_id': this.configService.get<string>('PRIVATE_KEY_ID'),
      'private_key': this.configService.get<string>('PRIVATE_KEY'),
      'client_email': this.configService.get<string>('CLIENT_EMAIL'),
      'client_id': this.configService.get<string>('CLIENT_ID'),
      'auth_uri': this.configService.get<string>('AUTH_URI','https://accounts.google.com/o/oauth2/auth'),
      'token_uri': this.configService.get<string>('TOKEN_URI','https://oauth2.googleapis.com/token'),
      'auth_provider_x509_cert_url': this.configService.get<string>('AUTH_PROVIDER_X509_CERT_URL','https://www.googleapis.com/oauth2/v1/certs'),
      'client_x509_cert_url': this.configService.get<string>('CLIENT_X509_CERT_URL')
    }

  }

  get firebaseDbUrl(): string {
   return this.configService.get<string>('FIREBASE_DB_URL');
  }

  get commonDbOptions(): DataSourceOptions {
    
    return {
      type: this.configService.get<any>('DB_TYPE','postgres'),
      database: this.configService.get<string>('DB_NAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      username: this.configService.get<string>('DB_USER'),
      port: this.configService.get<number>('DB_PORT'),
      host: this.configService.get<string>('DB_HOST'),
    }

  }

  get dataSource(): DataSourceOptions {
    return {
      ...this.commonDbOptions,
      entities: ['dist/src/**/*.entity.js'],
      migrations: ['src/migration/**/*.ts']
    }
  }

  get dbCredentials(): TypeOrmModuleOptions {
    return {
      ...this.commonDbOptions,
      autoLoadEntities: true
    }
  }

  get uploadPath(): string {
    return this.configService.get<string>('UPLOAD_PATH');
  }
}
