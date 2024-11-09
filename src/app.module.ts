import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [UsersModule, DatabaseModule, TracksModule],
})
export class AppModule {}
