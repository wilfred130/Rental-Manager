// src/property/address.entity.ts
import { Column } from 'typeorm';

export class Address {
  @Column()
  streetAddress: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  postal: string;

  @Column()
  zipcode: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  addressLine: string;

  @Column({ nullable: true })
  neighborhood: string;
}
