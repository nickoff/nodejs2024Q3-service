import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid4, validate } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
    private readonly albumService: AlbumsService,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    const artists = this.databaseService.getArtists();
    const artist = {
      id: uuid4(),
      ...createArtistDto,
    };
    artists.push(artist);
    this.databaseService.updateArtists(artists);
    return artist;
  }

  findAll() {
    return this.databaseService.getArtists();
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.databaseService
      .getArtists()
      .find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artists = this.databaseService.getArtists();
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const index = artists.findIndex((artist) => artist.id === id);
    artists[index] = {
      ...artist,
      ...updateArtistDto,
    };
    this.databaseService.updateArtists(artists);
    return artist;
  }

  remove(id: string) {
    const artists = this.databaseService.getArtists();
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const artistId = artist.id;
    this.updateTracks(artistId);
    this.updateAlbums(artistId);
    this.databaseService.updateArtists(
      artists.filter((artist) => artist.id !== id),
    );

    const artistInFavorites = this.favoritesService
      .findAll()
      .artists.find((artist) => artist.id === id);
    if (artistInFavorites) {
      this.favoritesService.removeArtistFromFavorites(id);
    }

    return { deleted: true };
  }

  private updateTracks(artistId: string) {
    const trackIds = this.tracksService
      .findAll()
      .filter((track) => track.artistId === artistId)
      .map((track) => track.id);
    trackIds.forEach((trackId) => {
      const track = this.tracksService.findOne(trackId);
      this.tracksService.update(trackId, {
        ...track,
        artistId: null,
      });
    });
  }

  private updateAlbums(artistId: string) {
    const albumIds = this.albumService
      .findAll()
      .filter((album) => album.artistId === artistId)
      .map((album) => album.id);
    albumIds.forEach((albumId) => {
      const album = this.albumService.findOne(albumId);
      this.albumService.update(albumId, {
        ...album,
        artistId: null,
      });
    });
  }
}
