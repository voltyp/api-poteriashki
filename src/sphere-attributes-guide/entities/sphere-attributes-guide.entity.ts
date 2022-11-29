import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { AbstractEntity } from '@/common/entities/abstract.entity';

@Entity({ name: 'sphere_attributes_guide' })
export class SphereAttributesGuide extends AbstractEntity {
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  comments?: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  user: UserEntity[];
}
