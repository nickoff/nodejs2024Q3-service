import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly artistId: string | null;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly albumId: string | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
}
