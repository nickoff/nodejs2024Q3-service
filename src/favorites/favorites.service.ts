import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    return {
      tracks: this.databaseService.getFavorites().tracks,
      albums: this.databaseService.getFavorites().albums,
      artists: this.databaseService.getFavorites().artists,
    };
  }

  addTrackToFavorites(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.databaseService
      .getTracks()
      .find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        'Not found track',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.databaseService.updateFavoritesAddTrack(track);
    return track;
  }

  removeTrackFromFavorites(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.databaseService
      .getFavorites()
      .tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    this.databaseService.updateFavoritesRemoveTrack(track);
    return { deleted: true };
  }

  addAlbumToFavorites(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.databaseService
      .getAlbums()
      .find((album) => album.id === id);
    if (!album) {
      throw new HttpException(
        'Not found album',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.databaseService.updateFavoritesAddAlbum(album);
    return album;
  }

  removeAlbumFromFavorites(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.databaseService
      .getFavorites()
      .albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    this.databaseService.updateFavoritesRemoveAlbum(album);
    return { deleted: true };
  }

  addArtistToFavorites(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.databaseService
      .getArtists()
      .find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException(
        'Not found artist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.databaseService.updateFavoritesAddArtist(artist);
    return artist;
  }

  removeArtistFromFavorites(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.databaseService
      .getFavorites()
      .artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    this.databaseService.updateFavoritesRemoveArtist(artist);
    return { deleted: true };
  }
}
