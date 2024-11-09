import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [TracksModule, DatabaseModule],
})
export class AlbumsModule {}