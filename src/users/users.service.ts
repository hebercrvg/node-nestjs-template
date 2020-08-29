import { UsersRepository } from './data/repositories/UsersRepository';
import { CreateUserDTO } from './data/dtos/CreateUserDTO';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import User from './data/entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository
    ){}

  async createUser({ name, email, password }: CreateUserDTO) : Promise<User>{
    const userExists = await this.usersRepository.findOne({
      where: {
        email
      }
    });
    console.log(userExists);
    if (userExists){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User already exists.',
      }, HttpStatus.BAD_REQUEST)
    }

    const user = await this.usersRepository.create({
      name,email,password
    });

    return this.usersRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User>{
    return await this.usersRepository.findOne({
      where: {
        email
      }
    })
  }

  async findUserById(id: string): Promise<User>{
    return await this.usersRepository.findOne(id);
  }

}
