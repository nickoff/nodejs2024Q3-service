import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid4, validate } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  private artists = this.databaseService.getArtists();

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly trackService: TracksService,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuid4(),
      ...createArtistDto,
    };
    this.artists.push(artist);
    this.databaseService.updateArtists(this.artists);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = {
      ...artist,
      ...updateArtistDto,
    };
    this.databaseService.updateArtists(this.artists);
    return this.artists[index];
  }

  remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const artistId = artist.id;
    this.updateTracks(artistId);
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
    this.databaseService.updateArtists(this.artists);

    return { deleted: true };
  }

  private updateTracks(artistId: string) {
    const trackIds = this.trackService
      .findAll()
      .filter((track) => track.artistId === artistId)
      .map((track) => track.id);
    trackIds.forEach((trackId) => {
      const track = this.trackService.findOne(trackId);
      this.trackService.update(trackId, {
        ...track,
        artistId: null,
      });
    });
  }
}
