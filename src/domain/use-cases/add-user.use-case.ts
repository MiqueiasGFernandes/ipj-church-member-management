import { UserDto } from "@presentation/dto/user.dto";

export interface AddUserUseCase {
  add(user: UserDto): Promise<UserDto>
}