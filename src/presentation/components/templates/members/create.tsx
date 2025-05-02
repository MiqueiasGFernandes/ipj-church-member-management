import {
  Grid,
} from '@mui/material';
import {
  Create,
  SimpleForm
} from 'react-admin';

import {
  AdditionalMemberInformationForm,
  ContactMemberForm,
  FamilyMemberForm,
  MemberPersonalInformationForm,
  ProfessionalMemberInformationForm
} from '@presentation/components/organisms';
import { MemberDto } from '@presentation/dto';

function convertStringToBooleans(record: MemberDto) {
  return {
    ...record,
    isMember: record.isMember === 'true',
    frequenter: record.frequenter === 'true',
  };
}

function CreateMember() {
  return (
    <Create
      title="Cadastrar Novo Membro"
      transform={convertStringToBooleans}
      redirect="list"
    >
      <SimpleForm>
        <Grid columnSpacing={1} container style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MemberPersonalInformationForm/>
          <FamilyMemberForm/>
          <ContactMemberForm/>
          <ProfessionalMemberInformationForm/>
          <AdditionalMemberInformationForm/>
        </Grid>
      </SimpleForm>
    </Create>
  );
}

export { CreateMember };
