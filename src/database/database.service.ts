import { Injectable } from '@nestjs/common';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private tracks: Track[] = [];

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
}
