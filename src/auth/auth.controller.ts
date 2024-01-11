import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/models/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}
  @Post('register')
  async userRegister(@Body(ValidationPipe) credentials: UserDto) {
    return await this.authServices.Register(credentials);
  }
  @Post('login')

  async login(@Body(ValidationPipe) credentials: UserDto) {
    return this.authServices.Login(credentials);
  }
}
