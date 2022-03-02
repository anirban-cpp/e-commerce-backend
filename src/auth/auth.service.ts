import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
import { SignupCredentialsDto } from './DTO/signup-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: SignupCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(userDto);
  }

  async signIn(userDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = userDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, (await user).password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid username/password !!');
    }
  }
}
