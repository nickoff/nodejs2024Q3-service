import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { TracksService } from 'src/tracks/tracks.service';
import { validate, v4 as uuid4 } from 'uuid';
import { Album } from './entities/album.entity';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly databaseService: DatabaseService,
    private readonly favoritesService: FavoritesService,
  ) {}
  create(createAlbumDto: CreateAlbumDto) {
    const albums = this.databaseService.getAlbums();
    const album: Album = {
      id: uuid4(),
      ...createAlbumDto,
    };
    albums.push(album);
    this.databaseService.updateAlbums(albums);
    return album;
  }

  findAll() {
    return this.databaseService.getAlbums();
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.databaseService
      .getAlbums()
      .find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albums = this.databaseService.getAlbums();
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    const index = albums.findIndex((album) => album.id === id);
    albums[index] = {
      ...album,
      ...updateAlbumDto,
    };
    this.databaseService.updateAlbums(albums);
    return album;
  }

  remove(id: string) {
    const albums = this.databaseService.getAlbums();
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    const albumId = album.id;
    this.updateTracks(albumId);
    this.databaseService.updateAlbums(
      albums.filter((album) => album.id !== id),
    );
    const albumInFavorites = this.favoritesService
      .findAll()
      .albums.find((album) => album.id === id);
    if (albumInFavorites) {
      this.favoritesService.removeAlbumFromFavorites(id);
    }

    return { deleted: true };
  }

  private updateTracks(albumId: string) {
    const trackIds = this.tracksService
      .findAll()
      .filter((track) => track.albumId === albumId)
      .map((track) => track.id);
    trackIds.forEach((trackId) => {
      const track = this.tracksService.findOne(trackId);
      this.tracksService.update(trackId, {
        ...track,
        albumId: null,
      });
    });
  }
}
