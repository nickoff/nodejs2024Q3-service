import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
