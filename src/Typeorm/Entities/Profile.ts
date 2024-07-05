// src/profile/profile.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Role } from './Roles.enum';


@Entity({name: 'user_profiles'})
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, default: null})
  profileImage: string;

  @Column({default: null, nullable: true})
  physicalAddress: string;

  @Column({default: null, nullable: true})
  dob: Date;

  @Column('json', { nullable: true , default: null})
  socialMediaHandles: string[];

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User;
}
