import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeyStrategy } from './api-key-strategy';
import { JwtStrategy } from './jwt-strategy';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { NestI18nModule } from 'src/lib';

@Module({
  imports: [
    UserModule,
    NestI18nModule,
    MailModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
