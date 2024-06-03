import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'sports_court' })
export class SportsCourtEntity {
  @ObjectIdColumn({ name: '_id' })
  _id: ObjectId;

  @Column({ name: 'name', nullable: false })
  name: string;
}
