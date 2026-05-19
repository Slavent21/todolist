import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  create(@Body() dto: CreateSubtaskDto) {
    return this.subtasksService.create(dto);
  }

  @Get()
  findAll() {
    return this.subtasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubtaskDto) {
    return this.subtasksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtasksService.remove(id);
  }
}