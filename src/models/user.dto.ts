import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  contact: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class UserDto extends LoginDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nom?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  prenom?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  adress?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
}
