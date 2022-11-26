import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AnimalsEntity } from './animals.entity';

@Entity({ name: 'fur' })
export class FurEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => AnimalsEntity, (animal) => animal.fur)
  animal: AnimalsEntity;
}
