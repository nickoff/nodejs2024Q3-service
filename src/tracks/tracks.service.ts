import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid4, validate } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly favoritesService: FavoritesService,
  ) {}
  create(createTrackDto: CreateTrackDto) {
    const tracks = this.databaseService.getTracks();
    const track = {
      id: uuid4(),
      ...createTrackDto,
    };
    tracks.push(track);
    this.databaseService.updateTracks(tracks);
    return track;
  }

  findAll() {
    return this.databaseService.getTracks();
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.databaseService
      .getTracks()
      .find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const tracks = this.databaseService.getTracks();
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    const index = tracks.findIndex((track) => track.id === id);
    tracks[index] = {
      ...track,
      ...updateTrackDto,
    };
    this.databaseService.updateTracks(tracks);
    return track;
  }

  remove(id: string) {
    const tracks = this.databaseService.getTracks();
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    this.databaseService.updateTracks(
      tracks.filter((track) => track.id !== id),
    );
    const trackInFavorites = this.favoritesService
      .findAll()
      .tracks.find((track) => track.id === id);
    if (trackInFavorites) {
      this.favoritesService.removeTrackFromFavorites(id);
    }
    return { deleted: true };
  }
}
