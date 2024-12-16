import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ApplicationConfigService } from './config.service';
import { validateEnv } from './validate';

@Global()
@Module({
    imports: [NestConfigModule.forRoot({
        isGlobal: true,
        validate: validateEnv
    })],
    providers: [ApplicationConfigService],
    exports: [ApplicationConfigService]
})
export class ConfigModule {}
