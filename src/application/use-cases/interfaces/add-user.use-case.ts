import { UserDto } from "@application/dto/user.dto";

export interface IAddUserUseCase {
  add(user: UserDto): Promise<UserDto>
}