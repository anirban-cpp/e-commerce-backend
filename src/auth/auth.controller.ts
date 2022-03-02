import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
import { SignupCredentialsDto } from './DTO/signup-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() userDto: SignupCredentialsDto): Promise<void> {
    return this.authService.signUp(userDto);
  }

  @Get('/signin')
  async signin(
    @Body() userDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userDto);
  }
}
