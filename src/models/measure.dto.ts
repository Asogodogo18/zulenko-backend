import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MeasureDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chest: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  waist: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  hips: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  arm_lenght_short: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  arm_lenght_long: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  arm_circumference: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  leg_lenght: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shoulders: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  collar: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  head_circumference: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  inseam: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tigh_lenght: number;
}
