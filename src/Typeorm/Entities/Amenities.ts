import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Property } from './Property';

@Entity()
export class Amenities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @ManyToOne(() => Property, (property) => property.amenities)
  property: Property;
}
