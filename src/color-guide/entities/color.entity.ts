import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AnimalEntity } from '@/animals/entities/animal.entity';

@Entity({ name: 'color' })
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.color)
  animal: AnimalEntity;
}
