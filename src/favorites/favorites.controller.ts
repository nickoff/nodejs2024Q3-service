import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
