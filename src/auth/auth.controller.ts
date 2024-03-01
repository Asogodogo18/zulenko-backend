import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UserDto } from 'src/models/user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  async userRegister(@Body(ValidationPipe) credentials: UserDto) {
    return await this.authServices.Register(credentials);
  }
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  async login(@Body(ValidationPipe) credentials: LoginDto) {
    return this.authServices.Login(credentials);
  }
}
