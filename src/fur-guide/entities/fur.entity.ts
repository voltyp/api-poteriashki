import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AnimalEntity } from '@/animals/entities/animal.entity';

@Entity({ name: 'fur' })
export class FurEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.fur)
  animal: AnimalEntity;
}
