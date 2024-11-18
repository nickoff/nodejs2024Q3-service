import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an album.',
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
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all albums records',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: [Album],
    schema: {
      $ref: getSchemaPath(Album),
    },
  })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get the album by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Album,
    schema: {
      $ref: getSchemaPath(Album),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === albumId' doesn't exist.",
  })
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update the album',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Album,
    schema: {
      $ref: getSchemaPath(Album),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === albumId' doesn't exist.",
  })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the album by id',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === albumId' doesn't exist.",
  })
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}
