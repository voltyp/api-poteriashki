import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { AnimalEntity } from '@/modules/animals/entities/animal.entity';

@Entity('animal_photo')
export class AnimalPhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  originalName: string;

  @ManyToOne(() => AnimalEntity, (animal) => animal.photos)
  animal: AnimalEntity;

  @CreateDateColumn()
  @Exclude()
  createdDate: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedDate: Date;
}
