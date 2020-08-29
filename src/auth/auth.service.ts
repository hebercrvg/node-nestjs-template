import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { AuthenticationSuccessDTO } from './data/dtos/AuthenticationSuccessDTO';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService){}

  async login(email: string, password: string): Promise<AuthenticationSuccessDTO>{
    const user = await this.usersService.findUserByEmail(email);
    if (user && this.validatePassword(password, user.password)){
      const payload = { email: user.email, sub: user.id };
      return {
      access_token: this.jwtService.sign(payload),
      expires_in: process.env.JWT_EXPIRESIN,
      user_id: user.id
      };
    }

    throw new UnauthorizedException("Email and/or password are invalid.");

  }

  private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
