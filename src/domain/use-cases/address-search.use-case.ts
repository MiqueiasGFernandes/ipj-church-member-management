import { AddressDto } from "@application/dto";

export interface IAddressSearchByPostalCodeUseCase {
  execute(postalCode: string): AddressDto
}