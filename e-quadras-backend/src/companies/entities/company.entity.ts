import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string;

  @OneToOne(() => LocationEntity, (location) => location.sportsCourt)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: LocationEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
