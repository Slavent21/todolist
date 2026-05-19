import { Module } from '@nestjs/common';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SubtasksController],
  providers: [SubtasksService, PrismaService],
})
export class SubtasksModule {}