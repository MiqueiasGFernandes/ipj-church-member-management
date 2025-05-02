import { AddressDto } from "@presentation/dto";

export interface AddressProvider {
  getOne(cep: string): Promise<AddressDto>
}
