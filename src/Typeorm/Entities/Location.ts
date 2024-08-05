// src/property/location.entity.ts
import { Column } from 'typeorm';

export class Location {
  @Column('decimal', { nullable: true })
  latitude: number;

  @Column('decimal', { nullable: true })
  longitude: number;
}
