import { AuthErrorCodeEnum, type AuthResponse, type RegisterResponse } from "@application/gateways";
import type { AuthErrorDetails, IAuthErrorMapper } from "@application/mappers";
import { injectable } from "tsyringe";

@injectable()
export class HttpAuthErrorMapper implements IAuthErrorMapper {
    transformToAuthError(error: AuthErrorDetails): AuthResponse {
        const { status, message } = error;

        const errorMap: Record<number, AuthErrorCodeEnum> = {
            401: AuthErrorCodeEnum.AUTH_FAILED,
            422: AuthErrorCodeEnum.INPUT_VALIDATION,
            429: AuthErrorCodeEnum.TO_MANY_REQUESTS,
            500: AuthErrorCodeEnum.INTERNAL_SERVER_ERROR,
        };

        const code = errorMap[status]
            ? errorMap[status]
            : AuthErrorCodeEnum.AUTH_FAILED;

        return {
            isAuth: false,
            error: {
                code,
                message,
            },
        };
    }

    transformToRegisterError(
        error: AuthErrorDetails,
    ): RegisterResponse {
        const { status, message } = error;

        const errorMap: Record<number, AuthErrorCodeEnum> = {
            422: AuthErrorCodeEnum.INPUT_VALIDATION,
            429: AuthErrorCodeEnum.TO_MANY_REQUESTS,
            500: AuthErrorCodeEnum.INTERNAL_SERVER_ERROR,
        };

        const code = status && errorMap[status]
            ? errorMap[status]
            : AuthErrorCodeEnum.INTERNAL_SERVER_ERROR;

        return {
            success: false,
            error: {
                code,
                message,
            },
        };
    }
}
