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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiOperation({ summary: 'Find user by ID' })
  async findUserById(@Param('id', ValidationPipe) id: string) {
    return this.userService.findOneUserById(+id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UserDto })
  @UseInterceptors(FileInterceptor('avatar', UploadStorage))
  updateUser(
    @Param('id', ValidationPipe) id: string,
    @Body() user: UserDto,
    @UploadedFile() avatar,
  ) {
    const filename = avatar.filename;
    return this.userService.update_user(+id, user, filename);
  }

  @Post(':id/measure')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiOperation({ summary: 'Create client measure' })
  @ApiBody({ type: MeasureDto })
  createClientMeasure(
    @Param('id', ValidationPipe) id: string,
    @Body() measure: MeasureDto,
  ) {
    return this.userService.create_measure_client(+id, measure);
  }
}
