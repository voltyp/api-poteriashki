import { Entity, OneToMany, Column } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'fur' })
export class FurEntity extends BaseEntity {
  @Column({ unique: true })
  value: string;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.fur)
  animals: AnimalEntity[];
}
