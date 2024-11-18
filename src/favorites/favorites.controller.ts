import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Favorites } from './entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Favorites,
    schema: {
      $ref: getSchemaPath(Favorites),
    },
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: Track,
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request trackId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description:
      "Not Found error. Request trackId is not found (id === trackId doesn't exist).",
  })
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the track from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request trackId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found error. Record track is not favorite.',
  })
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: Album,
    schema: {
      $ref: getSchemaPath(Album),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request albumId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description:
      "Not Found error. Request albumId is not found (id === albumId doesn't exist).",
  })
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the album from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request albumId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found error. Record album is not favorite.',
  })
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: Artist,
    schema: {
      $ref: getSchemaPath(Artist),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request artistId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description:
      "Not Found error. Request artistId is not found (id === artistId doesn't exist).",
  })
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the artist from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request artistId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found error. Record artist is not favorite.',
  })
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
