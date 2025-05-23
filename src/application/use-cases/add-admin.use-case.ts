import type { UserDto } from "@application/dto";
import type { IAuthGateway } from "@application/gateways";
import type { IAddAdminUseCase, UseCaseResponse } from "@domain/use-cases";

export class AddAdmin implements IAddAdminUseCase {
  constructor(private readonly authGateway: IAuthGateway) { }
  async execute(input: UserDto): Promise<UseCaseResponse<UserDto>> {
    const { success, error, user } = await this.authGateway.register(input);

    if (!success) {
      return {
        error: {
          message: error?.message as string,
          name: error?.code as string
        }
      }
    }

    return {
      data: user
    }
  }
}
