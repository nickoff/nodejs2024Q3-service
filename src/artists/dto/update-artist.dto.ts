import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly grammy: boolean;
}
