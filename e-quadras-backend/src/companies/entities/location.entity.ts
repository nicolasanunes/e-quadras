import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportsCourtEntity } from '../../sports-courts/entities/sports-court.entity';

@Entity({ name: 'location' })
export class LocationEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'number_address', nullable: false })
  numberAddress: number;

  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'neighborhood', nullable: false })
  neighborhood: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'state', nullable: false })
  state: string;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => SportsCourtEntity, (sportsCourt) => sportsCourt.location)
  sportsCourt: SportsCourtEntity;
}
