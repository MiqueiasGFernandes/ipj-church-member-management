import axios from 'axios';
import { AddressProvider } from './address-provider';
import { AddressDto } from '@application/dto';

export class RemoteAddressProvider implements AddressProvider {
  async getOne(cep: string): Promise<AddressDto> {
    const { data } = await axios.get(`${process.env.REACT_APP_BUSCACEP_API_URL}/${cep.replace('-', '')}/json`);

    return data;  
  }
}