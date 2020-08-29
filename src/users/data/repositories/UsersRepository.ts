
import User from '../entities/User.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository extends Repository<User>{

}
