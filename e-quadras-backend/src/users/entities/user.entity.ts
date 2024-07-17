import { SportsCourtEntity } from 'src/sports-courts/entities/sports-court.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'user_type', nullable: false })
  userType: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => SportsCourtEntity, (sportsCourt) => sportsCourt.userId)
  sportsCourt: SportsCourtEntity[];
}
