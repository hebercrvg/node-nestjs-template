import User from 'src/users/data/entities/User.entity';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
constructor(private authService:AuthService){}

  @Post()
  async login(@Body() {email, password}: User){
    return this.authService.login(email, password);
  }
}
