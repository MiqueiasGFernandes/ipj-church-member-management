import type { UserDto } from "@application/dto";

export interface IAddAdminUseCase {
  execute(user: UserDto): Promise<UserDto>;
}
