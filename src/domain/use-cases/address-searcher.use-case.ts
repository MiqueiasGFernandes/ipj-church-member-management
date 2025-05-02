import { AddressDto } from "@presentation/dto";

export interface AddressSearcherUseCase {
  getAddressByPostalCode(postalCode: string): AddressDto
}