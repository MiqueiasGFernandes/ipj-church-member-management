import { UserDto } from "@application/dto/user.dto";

export interface IAddAdminUseCase {
  add(user: UserDto): Promise<UserDto>
}