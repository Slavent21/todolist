import { Module } from '@nestjs/common';
import { GroupsModule } from './groups/groups.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { SubtasksModule } from './subtasks/subtasks.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [GroupsModule, TasksModule, CommentsModule, SubtasksModule],
  providers: [PrismaService],
})
export class AppModule {}