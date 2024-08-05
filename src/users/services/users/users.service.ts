import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Typeorm/Entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/users/Types/types';
import { PasswordService } from 'src/users/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(PasswordService) private passwordServices: PasswordService,
  ) {}

  // get all
  findAll() {
    return this.userRepository.find({
      relations: ['profile', 'properties', 'properties.amenities'],
    });
  }

  // create user with hashed password
  async create(createUserParams: CreateUserParams) {
    let user = {
      ...createUserParams,
      password: this.passwordServices.hash(createUserParams.password), // hash password
    };
    user = this.userRepository.create(user);
    return this.userRepository.save(user);
  }

  // update one
  async updateOne(id: number, updateUserParams: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserParams });
  }

  // find one
  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['profile', 'properties', 'properties.amenities'],
    });
  }

  // delete one
  async deleteOne(id: number) {
    await this.userRepository.delete({ id });
  }

  // username exists
  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  // email exists
  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
