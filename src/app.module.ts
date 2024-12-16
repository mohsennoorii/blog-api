import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationConfigService } from '@config/config.service';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@shared/auth';
import { BlogModule } from '@app/blog/blog.module';
import { AuthenticationMiddleware } from '@shared/auth';
import { BlogController } from '@app/blog/blog.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ApplicationConfigService],
      useFactory: async (ApplicationConfigService: ApplicationConfigService) => {
        return ApplicationConfigService.dbCredentials;
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..','blog-images')
    }),
    ConfigModule,
    UserModule,
    AuthModule,
    BlogModule,
    AuthModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(BlogController);
  }
}
