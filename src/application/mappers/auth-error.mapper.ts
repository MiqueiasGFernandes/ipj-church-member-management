import type { AuthResponse, RegisterResponse } from "@application/gateways";

export type AuthErrorDetails = {
    status: number,
    message: string
}

export interface IAuthErrorMapper {
    transformToAuthError(error: AuthErrorDetails): AuthResponse
    transformToRegisterError(error: AuthErrorDetails): RegisterResponse
}
