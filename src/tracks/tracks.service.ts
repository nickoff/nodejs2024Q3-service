import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid4, validate } from 'uuid';

@Injectable()
export class TracksService {
  private tracks = this.databaseService.getTracks();

  constructor(private readonly databaseService: DatabaseService) {}
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuid4(),
      ...createTrackDto,
    };
    this.tracks.push(track);
    this.databaseService.updateTracks(this.tracks);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = {
      ...track,
      ...updateTrackDto,
    };
    this.databaseService.updateTracks(this.tracks);
    return this.tracks[index];
  }

  remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
    this.databaseService.updateTracks(this.tracks);
    return { deleted: true };
  }
}
