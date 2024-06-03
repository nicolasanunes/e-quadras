import { ObjectId } from 'mongodb';

export class ListSportsCourtDto {
  constructor(
    readonly _id: ObjectId,
    readonly name: string,
  ) {}
}
