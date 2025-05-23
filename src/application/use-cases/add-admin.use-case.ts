import type { UserDto } from "@application/dto";
import type { IAuthGateway } from "@application/gateways";
import type { IAddAdminUseCase } from "@domain/use-cases";

export class AddAdmin implements IAddAdminUseCase {
  constructor(private readonly authGateway: IAuthGateway) { }
  execute(user: UserDto): Promise<UserDto> {
    return this.authGateway.register(user);
  }
}
