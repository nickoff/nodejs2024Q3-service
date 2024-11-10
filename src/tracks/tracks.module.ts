import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DatabaseModule, FavoritesModule],
  exports: [TracksService],
})
export class TracksModule {}
