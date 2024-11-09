import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];

  getUsers() {
    return this.users;
  }

  updateUser(users: User[]) {
    this.users = [...users];
  }

  getTracks() {
    return this.tracks;
  }

  updateTracks(tracks: Track[]) {
    this.tracks = [...tracks];
  }

  getArtists() {
    return this.artists;
  }

  updateArtists(artists: Artist[]) {
    this.artists = [...artists];
  }

  getAlbums() {
    return this.albums;
  }

  updateAlbums(albums: Album[]) {
    this.albums = [...albums];
  }
}
