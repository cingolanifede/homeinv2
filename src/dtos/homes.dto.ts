import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  public name: string;

  @IsString()
  public userId: string;
}

export class UpdateHomeDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public test: string;
}
