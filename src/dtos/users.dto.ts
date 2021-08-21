import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public homeId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public rolId: string;
}
