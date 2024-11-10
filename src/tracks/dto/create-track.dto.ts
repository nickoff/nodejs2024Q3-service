import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
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
