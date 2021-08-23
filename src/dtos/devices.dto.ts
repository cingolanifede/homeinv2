import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public homeId: string;

  @IsOptional()
  @IsString()
  public roomId: string;

  @IsOptional()
  @IsString()
  public topic: string;

  @IsOptional()
  @IsString()
  public ip: string;

  @IsOptional()
  @IsString()
  public mac: string;

  @IsOptional()
  @IsString()
  public tipo: string;

  @IsOptional()
  @IsString()
  public value: string;
}

export class UpdateDeviceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;
}
export class UpdateDeviceValueDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public value?: string;

  @IsOptional()
  @IsString()
  public ip?: string;
}
