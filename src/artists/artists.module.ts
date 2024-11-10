import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DatabaseModule, TracksModule, FavoritesModule, AlbumsModule],
  exports: [ArtistsService],
})
export class ArtistsModule {}
