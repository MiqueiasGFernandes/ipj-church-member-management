import type { UserDto } from "@application/dto";
import type { UseCaseResponse } from "./use-case.response";

export interface IAddAdminUseCase {
  execute(user: UserDto): Promise<UseCaseResponse<UserDto>>;
}
