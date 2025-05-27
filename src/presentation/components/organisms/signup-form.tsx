import { Button, CardContent, CircularProgress } from "@mui/material";
import { Link, TextInput, required, email, minLength } from "react-admin";

import type { UserDto } from "@application/dto";
import { styled } from "@mui/material/styles";
import { useAddAdmin } from "@presentation/hooks";
import { Form, useNotify } from "ra-core";

const PREFIX = "RaSignUpForm";

export const LoginFormClasses = {
  content: `${PREFIX}-content`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
};

const StyledForm = styled(Form, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${LoginFormClasses.content}`]: {
    width: 300,
  },
  [`& .${LoginFormClasses.button}`]: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  [`& .${LoginFormClasses.icon}`]: {
    margin: theme.spacing(0.3),
  },
}));

type SignUpFormOptions = {
  handleRedirectToConfirmedSignUpForm: () => void;
  handleRedirectToLoginForm: () => void;
};

export function SignUpForm({
  handleRedirectToConfirmedSignUpForm,
  handleRedirectToLoginForm,
}: SignUpFormOptions) {
  const notify = useNotify();
  const { addAdmin, error, isLoading } = useAddAdmin();

  const submit = async (values: UserDto) => {
    if (Object.values(values).length === 0) {
      notify("Preencha os campos antes de continuar", { type: "error" })
      return;
    }

    if (values.password !== values.passwordConfirmation) {
      notify("Preencha os campos antes de continuar", { type: "error" })
      return;
    }

    await addAdmin(values);

    if (error) {
      notify(error, { type: "error" });
      return;
    }

    handleRedirectToConfirmedSignUpForm();
  };

  return (
    <StyledForm
      mode="onChange"
      onSubmit={(data) => submit(data as UserDto)}
    >
      <CardContent className={LoginFormClasses.content}>
        <TextInput
          label="Nome"
          source="name"
          fullWidth
          validate={required("Nome é obrigatório")}
        />
        <TextInput
          label="Email"
          source="email"
          fullWidth
          validate={[
            required("Email é obrigatório"),
            email("Email inválido"),
          ]}
        />
        <TextInput
          type="password"
          label="Senha"
          source="password"
          fullWidth
          validate={[
            required("Senha é obrigatória"),
            minLength(6, "Senha deve ter ao menos 6 caracteres"),
          ]}
        />
        <TextInput
          type="password"
          label="Confirmação de Senha"
          source="passwordConfirmation"
          fullWidth
          validate={[
            required("Confirmação de senha é obrigatória"),
            minLength(6, "Confirmação de senha deve ter ao menos 6 caracteres"),
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={isLoading}
          fullWidth
          className={LoginFormClasses.button}
        >
          {isLoading ? (
            <CircularProgress
              className={LoginFormClasses.icon}
              size={19}
              thickness={3}
            />
          ) : (
            "Registrar Usuário"
          )}
        </Button>
        <Link
          to="/#"
          onClick={handleRedirectToLoginForm}
          style={{
            textAlign: "center",
            width: "100%",
            display: "block",
          }}
        >
          Login
        </Link>
      </CardContent>
    </StyledForm>
  );
}
