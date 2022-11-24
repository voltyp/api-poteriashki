import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BreedEntity } from '@/animals/entities/breed.entity';

@Entity({ name: 'animals' })
export class AnimalsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  typeAnimal: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  sex: string;

  @Column()
  age: number;

  @ManyToOne(() => BreedEntity, (breed) => breed.value, {
    eager: true,
  })
  breed: BreedEntity;

  @Column()
  fur: string;

  @Column()
  color: string;

  @Column()
  status: string;

  @Column()
  curator: string;
}
