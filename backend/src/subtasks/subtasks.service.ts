import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSubtaskDto) {
    return this.prisma.subtask.create({ data: dto });
  }

  findAll() {
    return this.prisma.subtask.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.subtask.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateSubtaskDto) {
    return this.prisma.subtask.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.subtask.delete({
      where: { id },
    });
  }
}