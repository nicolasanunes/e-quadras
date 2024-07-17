export class ListLocationDto {
  constructor(
    readonly numberAddress: number,
    readonly street: string,
    readonly neighborhood: string,
    readonly city: string,
    readonly state: string,
    readonly cep: string,
  ) {}
}
