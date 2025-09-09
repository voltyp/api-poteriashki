import { Entity, OneToMany, Column } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'animal_statuses' })
export class AnimalStatusEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.status)
  animals: AnimalEntity[];
}
