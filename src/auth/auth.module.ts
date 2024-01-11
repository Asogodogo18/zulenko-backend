import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'HS256',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  providers: [AuthService,JwtStrategy],
  exports:[PassportModule,JwtStrategy,AuthModule],
  controllers: [AuthController]
})
export class AuthModule {}
