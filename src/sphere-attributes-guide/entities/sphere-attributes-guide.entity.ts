import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { AbstractEntity } from '@/common/entities/abstract.entity';

@Entity({ name: 'color' })
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

  @ManyToOne(() => UserEntity, (user) => user.sphereAttributes)
  user: UserEntity;
}
