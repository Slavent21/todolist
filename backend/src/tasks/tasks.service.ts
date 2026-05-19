import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  findAll() {
    return this.prisma.task.findMany({
      include: { comments: true, subtasks: true, group: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { comments: true, subtasks: true, group: true },
    });
  }

  update(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}