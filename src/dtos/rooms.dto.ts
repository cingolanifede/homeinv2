import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public homeId: string;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public name: string;
}
