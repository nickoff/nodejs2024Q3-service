import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an track.',
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
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tracks records',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: [Track],
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get the track by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Track,
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === trackId' doesn't exist.",
  })
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update the track',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Track,
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === trackId' doesn't exist.",
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the track by id',
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
    description: "Not Found error. Record with 'id === trackId' doesn't exist.",
  })
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id);
  }
}
