import { useState } from "react";

import { Grid } from "@mui/material";
import { required, SelectInput, TextInput } from "react-admin";
import { SectionTitle } from "../molecules";
import { RemoteAddressProvider } from "@services/address-provider";
import { AddressDto } from "@presentation/dto";
import brazilianStates from "@presentation/constants/brazilian-states";

export function ContactMemberForm() {

  const [address, setAddress] = useState<AddressDto>({
    bairro: null,
    cep: null,
    complemento: null,
    localidade: null,
    logradouro: null,
    uf: null
  });

  const handleGetAddressByPostalCode = async (cep: string) => {
    const addressInformation = await new RemoteAddressProvider().getOne(cep.replace('-', ''));

    setAddress(addressInformation);
  };

  return <>
    <Grid xs={12} style={{ marginLeft: 8 }}>
      <SectionTitle>
        Contato
      </SectionTitle>
    </Grid>
    <Grid item xs={4}>
      <TextInput
        source="cep"
        label="CEP"
        onBlur={(event) => handleGetAddressByPostalCode(event.target.value)}
        fullWidth
      />
    </Grid>
    <Grid item xs={8}>
      <TextInput
        label="Endereço"
        source="address"
        fullWidth
        defaultValue={address.logradouro}
        validate={[
          required('O campo \'endereço\' é obrigatório'),
        ]}
      />
    </Grid>
    <Grid item xs={6}>
      <TextInput
        label="Bairro"
        source="district"
        fullWidth
        defaultValue={address.bairro}
        validate={[
          required('O campo \'bairro\' é obrigatório'),
        ]}
      />
    </Grid>
    <Grid item xs={6}>
      <TextInput
        label="Cidade"
        defaultValue={address.localidade}
        source="city"
        fullWidth
        validate={[
          required('O campo \'cidade\' é obrigatório'),
        ]}
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <SelectInput
        label="UF"
        defaultValue={address.uf}
        source="uf"
        fullWidth
        choices={brazilianStates}
        validate={[
          required('O campo \'UF\' é obrigatório'),
        ]}
      />
    </Grid>
    <Grid item xs={6} md={4}>
      <TextInput
        type="number"
        source="residenceNumber"
        label="Número da residência"
        validate={[
          required('O campo \'número de residência\' é obrigatório'),
        ]}
        fullWidth
      />
    </Grid>
    <Grid item xs={6} md={4}>
      <TextInput
        source="addressComplement"
        label="Complemento"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <TextInput
        source="homePhone"
        label="Tel. Residencial"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <TextInput
        source="commercialPhone"
        label="Tel. Comercial"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <TextInput
        source="mobilePhone"
        label="Celular"
        fullWidth
        validate={[
          required('O campo \'celular\' é obrigatório'),
        ]}
      />
    </Grid>
    <Grid item xs={12}>
      <TextInput
        type="email"
        source="email"
        label="Email"
        fullWidth
      />
    </Grid>
  </>
}