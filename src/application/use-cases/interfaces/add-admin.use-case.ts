import { UserDto } from "@application/dto/user.dto";

export interface IAddAdminUseCase {
  execute(user: UserDto): Promise<UserDto>
}