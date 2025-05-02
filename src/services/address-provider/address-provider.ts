import { AddressDto } from "@application/dto";

export interface AddressProvider {
  getOne(cep: string): Promise<AddressDto>
}
