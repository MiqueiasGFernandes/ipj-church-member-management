import type { UserDto } from "@application/dto"

export enum AuthErrorCodeEnum {
  TO_MANY_REQUESTS = 'TO_MANY_REQUESTS',
  AUTH_FAILED = 'AUTH_FAILED',
  INVALID_SERVER_RESPONSE = 'INVALID_SERVER_RESPONSE',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export type AuthResponse = {
  token?: string
  isAuth: boolean,
  error?: {
    code: AuthErrorCodeEnum,
    message: string
  }
}

export interface IAuthGateway {
  register(userDto: UserDto): Promise<UserDto>
  auth(username: string, password: string): Promise<AuthResponse>
}