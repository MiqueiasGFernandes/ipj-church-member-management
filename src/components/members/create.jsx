import {
  TextField as CustomTextField,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import {
  Create,
  DateInput,
  RadioButtonGroupInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import academicLevels from '../../constants/academic-levels';
import brazilianStates from '../../constants/brazilian-states';
import addressProviderService from '../../services/address-provider';
import SectionTitle from '../section-title';

function CreateMember() {
  const [member, setMember] = useState({});
  const [address, setAddress] = useState({
    cep: null,
    logradouro: null,
    complemento: null,
    bairro: null,
    localidade: null,
    uf: null,
  });
  const handleGetAddressByPostalCode = async (cep) => {
    const addressInformation = await addressProviderService.getOne(cep.replace('-', ''));

    setAddress(addressInformation);
  };
  return (
    <Create
      title="Cadastrar Novo Membro"
    >
      <SimpleForm>
        <Grid columnSpacing={1} container style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12}>
            <SectionTitle>
              Informações Pessoais
            </SectionTitle>
          </Grid>
          <Grid item xs={12}>
            <TextInput
              source="name"
              label="Nome"
              fullWidth
              validate={[
                required('O campo \'nome\' é obrigatório'),
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DateInput
              source="birthdate"
              label="Data de Nascimento"
              validate={[
                required('O campo \'data de nascimento\' é obrigatório'),
              ]}
              fullWidth
              style={{ paddingTop: 3 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectInput
              label="Naturalidade"
              source="naturality"
              choices={[{
                id: 'brasileiro',
                name: 'Brasileiro',
              }, {
                id: 'estrangeiro',
                name: 'Estrangeiro',
              }]}
              validate={[
                required('O campo \'naturalidade\' é obrigatório'),
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectInput
              source="ufOrigin"
              label="UF de naturalidade"
              choices={brazilianStates}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <SectionTitle>
              Família
            </SectionTitle>
          </Grid>
          <Grid item xs={6} md={4}>
            <SelectInput
              source="maritalStatus"
              label="Estado Civil"
              validate={
                [
                  required('O campo \'estado civil\' é obrigatório'),
                ]
              }
              fullWidth
              choices={[
                {
                  id: 'solteiro',
                  name: 'Solteiro',
                },
                {
                  id: 'casado',
                  name: 'Casado',
                },
                {
                  id: 'divorciado',
                  name: 'Divorciado',
                },
                {
                  id: 'viuvo',
                  name: 'Viúvo',
                },
              ]}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <DateInput
              source="weddingDate"
              label="Data de Casamento"
              type="date"
              fullWidth
              style={{ paddingTop: 3 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput
              source="spouse"
              label="Nome do Cônjuge"
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <TextInput
              source="fatherName"
              label="Nome do Pai"
              fullWidth
              style={{
                marginLeft: 8,
              }}
            />
          </Grid>
          <Grid xs={12}>
            <TextInput
              source="motherName"
              label="Nome da Mãe"
              fullWidth
              style={{
                marginLeft: 8,
              }}
            />
          </Grid>
          <Grid xs={12}>
            <TextInput
              multiline
              source="anotherFamilyMembers"
              label="Outros Integrantes da Família"
              fullWidth
              style={{
                marginLeft: 8,
              }}
            />
          </Grid>
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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
          <Grid item xs={12} md={4}>
            <SelectInput
              source="schooling"
              label="Grau de Instrução"
              choices={academicLevels}
              fullWidth
              style={{
                marginRight: 10,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextInput
              source="occupation"
              label="Profissão"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <RadioButtonGroupInput
              source="isMember"
              address
              label="Já é membro da IPB?"
              choices={[
                {
                  id: 'true',
                  name: 'Sim',
                },
                {
                  id: 'false',
                  name: 'Nâo',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <CustomTextField
              id="previousPresbyterianChurch"
              label="IPB de membresia"
              value={member.previousPresbyterianChurch}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setMember({
                ...member,
                previousPresbyterianChurch: event.target.value,
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <DateInput
              source="pedobaptismDate"
              label="Data do Batismo Infantil"
            />
          </Grid>
          <Grid item xs={6} md={10}>
            <TextInput
              source="pedobaptismMinister"
              label="Ministro Oficiante"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <DateInput
              source="faithConfessionDate"
              label="Data da Profissão de Fé"
            />
          </Grid>
          <Grid item xs={6} md={10}>
            <TextInput
              source="faithConfessionMinister"
              label="Ministro Oficiante"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              source="observations"
              label="Observações"
              fullWidth
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
}

export default CreateMember;
