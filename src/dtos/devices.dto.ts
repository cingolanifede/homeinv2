import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  public name: string;

  @IsString()
  public homeId: string;

  @IsString()
  public roomId: string;

  @IsString()
  public topic: string;

  @IsString()
  public ip: string;

  @IsString()
  public mac: string;

  @IsString()
  public tipo: string;

  @IsString()
  public value: string;
}

export class UpdateDeviceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;
}
