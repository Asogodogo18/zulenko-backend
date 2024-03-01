import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class PostsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  status: boolean;
}
