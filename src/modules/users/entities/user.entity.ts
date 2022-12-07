import { Entity, Column, Index, OneToMany, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash, genSaltSync } from 'bcrypt';

import { BaseEntity } from '@/common/entities/base.entity';
import { RoleEnum, StatusUserEnum } from '../types/user.type';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Index()
  @Column({ nullable: false })
  firstName: string;

  @Index()
  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  middleName: string | null;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lastLogin?: Date;

  @Column({ type: 'bytea', nullable: true })
  @Exclude()
  hashedRt?: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: [RoleEnum.contentManager],
    nullable: false,
  })
  role: RoleEnum;

  @Column({
    type: 'enum',
    enum: StatusUserEnum,
    default: [StatusUserEnum.active],
    nullable: false,
  })
  status: StatusUserEnum;

  @OneToMany(() => AnimalEntity, (animal) => animal.curator)
  animals: AnimalEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = genSaltSync();
      this.password = await hash(this.password, salt);
    }
  }
}
