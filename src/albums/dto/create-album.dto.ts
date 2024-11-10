import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly artistId: string | null;
}
