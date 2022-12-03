import { Entity, OneToMany, Column } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'color' })
export class ColorEntity extends BaseEntity {
  @Column()
  value: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.color)
  animals: AnimalEntity[];
}
