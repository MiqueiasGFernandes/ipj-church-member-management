
import { BackgroudImageContainer } from '@presentation/components/molecules';
import bg from "@assets/login-background.png";
import { AuthenticationFormsSwitcher } from '@presentation/components/templates';

export default function Authentication() {
  return (
    <BackgroudImageContainer backgroundImage={bg}>
      <AuthenticationFormsSwitcher />
    </BackgroudImageContainer>
  );
}
