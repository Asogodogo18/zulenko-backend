import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/models/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadStorage } from 'src/utils/uploadStorage';
import { MeasureDto } from 'src/models/measure.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findUserById(@Param('id', ValidationPipe) id) {
    return this.userService.findOneUserById(id);
  }
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar', UploadStorage))
  updateUser(
    @Param('id', ValidationPipe) id,
    @Body() user: UserDto,
    @UploadedFile() avatar,
  ) {
    const filename = avatar.filename;

    return this.userService.update_user(id, user, filename);
  }
  @Post(':id/measure')
  createClientMeasure(@Param('id', ValidationPipe) id,@Body() measure: MeasureDto) {
    return this.userService.create_measure_client(id, measure);
  }
}
