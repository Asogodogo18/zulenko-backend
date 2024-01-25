import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity';
import { UserDto } from 'src/models/user.dto';
import { Role } from 'src/interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async Register(credentials: UserDto) {
    const newUser = this.userRepo.create({ ...credentials });
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, newUser.salt);
    newUser.role = Role.CLIENT;
    try {
      await this.userRepo.save(newUser);
    } catch (error) {
      console.log('err', error);
      throw new ConflictException(
        'le nemero de telephone ou Username existe deja !!!!',
      );
    }
    return {
      message: 'Inscription reçu avec success',
      newUser,
    };
  }
  async Login({ contact, password }: UserDto) {
    console.log('password :', password);

    const authUser = await this.userService.findUserByContact(contact);
    const valideUser = authUser.comparePassword(password);
    console.log('authUser :', authUser);

    if (!valideUser) {
      throw new NotFoundException('user credentials errorne');
    } else {
      const { password, createAt, salt, updateAt, ...user } = authUser;
      const playload = {
        contact: authUser.contact,
      };
      const token = this.jwtService.sign(playload);
      return await {
        status: 'ok',
        token,
        ...user,
      };
    }
  }
}
