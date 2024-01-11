import {
  IsInt,
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class UserDto {
  // @IsString()
  // @IsEmpty()
  nom?: string;
  // @IsString()
  // @IsEmpty()
  prenom?: string;
  // @IsInt()
  // @IsNotEmpty()
  // @IsPositive()
  contact?: number;
  // @IsString()
  // @IsEmpty()
  avatar?: string;
  // @IsString()
  // @IsEmpty()
  adress?: string;
  // @IsNotEmpty()
  username: string;
  // @IsString()
  // @IsNotEmpty()
  password: string;
}
