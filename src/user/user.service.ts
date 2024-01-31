import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images, Measure, User } from 'src/entity';
import { UserDto } from 'src/models/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MeasureDto } from 'src/models/measure.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Measure) private measureRepo: Repository<Measure>,
  ) {}

  async findOneUserById(id: number) {
    const userSearch = await this.userRepo.findOne({
      where: { id },
      relations: ['measure',"userPosts","comments","postsLikes"],
    });

    if (!userSearch) {
      throw new NotFoundException(
        `${id} ne correspond a aucune enregistrement`,
      );
    } else {
      // const { updateAt, createAt, ...user } = userSearch;
      return await userSearch;
    }
  }
  async findUserByContact(num: number) {
    const user = await this.userRepo.findOne({
      where: { contact: num },
    });
    if (!user) {
      throw new NotFoundException(`${num} n'est pas dans le enegistrement`);
    }
    return user;
  }
  async update_user(id: number, user: UserDto, avatar: any) {
    const newUser = await this.findOneUserById(id);
    // const avatarImage = new Images();
    // avatarImage.user_avatar_url = avatar;
    // const newAvatar = await this.imageRepo.create(avatar);
    // await this.imageRepo.save(newAvatar)
    newUser.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, newUser.salt);
    user.avatar = avatar;
    await this.userRepo.update(id, user);
    return await {
      message: "L'utilisateur a ete modifier avec succes",
      user,
    };
  }
  async create_measure_client(id: number, measures: MeasureDto) {
    // console.log('measures :', measures);

    const measure = this.measureRepo.create({ ...measures });
    const newMeasure = await this.measureRepo.save(measure);
    const measureId = newMeasure.id;
    console.log('newMeasure.id', newMeasure.id);

    const newClient = await this.findOneUserById(id);
    const findMeasure = await this.measureRepo.findOne({
      where: { id: measureId },
    });
    console.log('findMeasure', findMeasure);

    newClient.measure = findMeasure;

    await this.userRepo.save(newClient);
    return { message: 'mesure creer avec success' };
  }
}
