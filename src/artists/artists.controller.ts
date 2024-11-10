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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an artist.',
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
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists records',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: [Artist],
    schema: {
      $ref: getSchemaPath(Artist),
    },
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get the artist by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Artist,
    schema: {
      $ref: getSchemaPath(Artist),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description:
      "Not Found error. Record with 'id === artistId' doesn't exist.",
  })
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update the artist',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Artist,
    schema: {
      $ref: getSchemaPath(Artist),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description:
      "Not Found error. Record with 'id === artistId' doesn't exist.",
  })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the artist by id',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
    type: Boolean,
    schema: {
      $ref: getSchemaPath('true'),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description:
      "Not Found error. Record with 'id === artistId' doesn't exist.",
  })
  remove(@Param('id') id: string) {
    return this.artistsService.remove(id);
  }
}
