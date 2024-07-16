import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sports_court' })
export class SportsCourtEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;
}
