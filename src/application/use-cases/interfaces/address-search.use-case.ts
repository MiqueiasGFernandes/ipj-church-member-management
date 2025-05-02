import { AddressDto } from "@application/dto";

export interface IAddressSearchUseCase {
  getAddressByPostalCode(postalCode: string): AddressDto
}