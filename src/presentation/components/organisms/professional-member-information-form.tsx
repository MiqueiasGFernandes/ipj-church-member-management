import { Grid } from "@mui/material";
import { SectionTitle } from "../molecules";
import { required, SelectInput, TextInput } from "react-admin";
import academicLevels from "@presentation/constants/academic-levels";

export function ProfessionalMemberInformationForm() {
  return <>
    <Grid xs={12} style={{ marginLeft: 8 }}>
      <SectionTitle>
        Informações Profissionais
      </SectionTitle>
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
        validate={[
          required('O campo \'Grau de instrução\' é obrigatório'),
        ]}
      />
    </Grid>
    <Grid item xs={12} md={8}>
      <TextInput
        source="occupation"
        label="Profissão"
        fullWidth
      />
    </Grid>
  </>
}