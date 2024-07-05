// src/property/property.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Address } from './Address';
import { Period } from './Period';
import { Location } from './Location';


@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(type => Address)
  address: Address;

  @Column(type => Location)
  location: Location;

  @Column()
  type: string;

  @Column('decimal')
  price: number;

  @Column(type => Period)
  period: Period;

  @Column('text')
  description: string;

  @Column('simple-array', {nullable: true})
  images: string[];

  @ManyToOne(() => User, user => user.properties)
  @JoinColumn({ name: 'landlordId' })
  landlord: User;
}
