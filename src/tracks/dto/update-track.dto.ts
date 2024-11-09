import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  readonly name: string;
  readonly artistId: string | null;
  readonly albumId: string | null;
  readonly duration: number;
}
