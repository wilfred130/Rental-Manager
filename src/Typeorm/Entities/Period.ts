import { Column } from 'typeorm';

export class Period {
  @Column()
  length: number;

  @Column()
  typeOfPeriod: string;
}
