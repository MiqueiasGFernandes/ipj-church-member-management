import { Button, CardContent, CircularProgress } from "@mui/material";
import { Link, TextInput } from "react-admin";

import { styled } from "@mui/material/styles";
import type { UserDto } from "@application/dto";
import { Form, useNotify, useSafeSetState } from "ra-core";
import { useAddAdmin } from "@presentation/hooks";

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
}

export function SignUpForm({
  handleRedirectToConfirmedSignUpForm,
  handleRedirectToLoginForm,
}: SignUpFormOptions) {
  const notify = useNotify();

  const { addAdmin, error, isLoading } = useAddAdmin()

  const submit = async (values: UserDto) => {
    await addAdmin(values);

    if (error) {
      notify(error, { type: 'error' })
      return;
    }

    handleRedirectToConfirmedSignUpForm()
  };

  return (
    <StyledForm
      mode="onChange"
      noValidate
      onSubmit={(data) => submit(data as UserDto)}
    >
      <CardContent className={LoginFormClasses.content}>
        <TextInput label="Nome" source="name" fullWidth />
        <TextInput label="Email" source="email" fullWidth />
        <TextInput type="password" label="Senha" source="password" fullWidth />
        <TextInput
          type="password"
          label="Confirmação de Senha"
          source="passwordConfirmation"
          fullWidth
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
