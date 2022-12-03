import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Exclude()
  createdDate: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedDate: Date;
}
