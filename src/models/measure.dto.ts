import { IsEmpty, IsNumber } from 'class-validator';

export class MeasureDto {
  @IsNumber()
  @IsEmpty()
  chest: number;
  @IsNumber()
  @IsEmpty()
  waist: number;
  @IsNumber()
  @IsEmpty()
  hips: number;
  @IsNumber()
  @IsEmpty()
  arm_lenght_short: number;
  @IsNumber()
  @IsEmpty()
  arm_lenght_long: number;
  @IsNumber()
  @IsEmpty()
  arm_circumference: number;
  @IsNumber()
  @IsEmpty()
  leg_lenght: number;
  @IsNumber()
  @IsEmpty()
  shoulders: number;
  @IsNumber()
  @IsEmpty()
  collar: number;
  @IsNumber()
  @IsEmpty()
  head_circumference: number;
  @IsNumber()
  @IsEmpty()
  inseam: number;
  @IsNumber()
  @IsEmpty()
  height: number;
  @IsNumber()
  @IsEmpty()
  tigh_lenght: number;
}
