import { Controller,Post, Get, Patch, Delete,Param,Body, UseGuards,  Request,} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('stories')
@UseGuards(AuthGuard('jwt')) // Ensures only authenticated users can access
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto, @Request() req) {
    return this.storyService.create(createStoryDto, req.user);
  }

  @Get()
  findALL() {
    return this.storyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto, @Request() req) {
    return this.storyService.update(+id, updateStoryDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.storyService.delete(+id, req.user);
  }
}