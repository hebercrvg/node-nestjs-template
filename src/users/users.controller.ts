import { UsersService } from './users.service';
import { CreateUserDTO } from './data/dtos/CreateUserDTO';
import { Controller, Post, Body } from '@nestjs/common';
import {classToClass} from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}
  @Post()
  async store(
    @Body()
    { name, email, password }: CreateUserDTO
   ){
    const user = await this.usersService.createUser({
      name, email, password
    });
    console.log(user);
    return classToClass(user);
   }
}
