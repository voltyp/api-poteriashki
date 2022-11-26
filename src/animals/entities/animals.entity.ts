import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BreedEntity, ColorEntity, FurEntity, TypeAnimalEntity } from './';

@Entity({ name: 'animals' })
export class AnimalsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryCode: string;

  @Column({ unique: true })
  userCode: string;

  @Column({ default: false })
  isSpayed: boolean;

  @ManyToOne(() => TypeAnimalEntity, (type) => type.value, {
    eager: true,
  })
  typeAnimal: TypeAnimalEntity;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: false })
  birthday: Date;

  @ManyToOne(() => BreedEntity, (breed) => breed.value, {
    eager: true,
  })
  breed: BreedEntity;

  @ManyToOne(() => FurEntity, (fur) => fur.value, {
    eager: true,
  })
  fur: FurEntity;

  @ManyToOne(() => ColorEntity, (color) => color.value, {
    eager: true,
  })
  color: ColorEntity;

  @Column()
  status: string;

  @Column()
  curator: string;
}
