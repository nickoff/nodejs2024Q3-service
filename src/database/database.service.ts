import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

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

  getFavorites() {
    return this.favorites;
  }

  updateFavoritesAddTrack(track: Track) {
    this.favorites = {
      ...this.favorites,
      tracks: track ? [...this.favorites.tracks, track] : this.favorites.tracks,
    };
  }

  updateFavoritesAddAlbum(album: Album) {
    this.favorites = {
      ...this.favorites,
      albums: album ? [...this.favorites.albums, album] : this.favorites.albums,
    };
  }

  updateFavoritesAddArtist(artist: Artist) {
    this.favorites = {
      ...this.favorites,
      artists: artist
        ? [...this.favorites.artists, artist]
        : this.favorites.artists,
    };
  }

  updateFavoritesRemoveTrack(track: Track) {
    this.favorites = {
      ...this.favorites,
      tracks: this.favorites.tracks.filter((t) => t.id !== track.id),
    };
  }

  updateFavoritesRemoveAlbum(album: Album) {
    this.favorites = {
      ...this.favorites,
      albums: this.favorites.albums.filter((a) => a.id !== album.id),
    };
  }

  updateFavoritesRemoveArtist(artist: Artist) {
    this.favorites = {
      ...this.favorites,
      artists: this.favorites.artists.filter((a) => a.id !== artist.id),
    };
  }
}
