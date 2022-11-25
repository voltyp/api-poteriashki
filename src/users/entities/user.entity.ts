import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { RoleEnum, StatusUserEnum } from '@/users/types/user.type';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'bytea', nullable: true })
  @Exclude()
  password?: Buffer;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lastLogin?: Date;

  @Column({ type: 'bytea', nullable: true })
  @Exclude()
  hashedRt?: Buffer;

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

  @Column({ nullable: true })
  lastChangePasswordRequest?: Date;

  @Column({ nullable: true })
  hashedRequest?: string;
}
