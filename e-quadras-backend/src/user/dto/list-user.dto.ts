export class ListUserDto {
  constructor(
    readonly email: string,
    readonly name: string,
    readonly phone: string,
  ) {}
}
