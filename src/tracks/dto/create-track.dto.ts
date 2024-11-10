import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  readonly artistId: string | null;

  @IsString()
  @IsOptional()
  @IsUUID()
  readonly albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
}
