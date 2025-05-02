import { Link } from "react-admin";
import Login from "../pages/login/authentication";

export function LoginForm({ handleRedirectToSignUpForm}: { handleRedirectToSignUpForm: () => void}) {
  return <div>
    <Login />
    <Link
      to="/#"
      onClick={handleRedirectToSignUpForm}
      style={{
        textAlign: 'center',
        width: '100%',
        display: 'block',
      }}
    >
      Crie uma conta agora
    </Link>
  </div>
}