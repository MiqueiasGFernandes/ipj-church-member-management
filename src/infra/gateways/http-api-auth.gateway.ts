import { z } from "zod";
import axios, { type AxiosError } from "axios";
import {
  AuthErrorCodeEnum,
  type AuthResponse,
  type IAuthGateway,
} from "@application/gateways";
import type { UserDto } from "@application/dto";

const AuthResponseSchema = z.object({
  access_token: z.string(),
});

const DEFAULT_ERROR_MESSAGE = "Usuário ou senha incorretos";

export class HttpApiAuthGateway implements IAuthGateway {
  private formatZodErrors(issues: z.ZodIssue[]): string {
    return issues
      .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
      .join("; ");
  }

  private mapAxiosErrorToAuthError(error: AxiosError): AuthResponse {
    const status = error.response?.status;

    const errorMap: Record<number, AuthErrorCodeEnum> = {
      429: AuthErrorCodeEnum.TO_MANY_REQUESTS,
      500: AuthErrorCodeEnum.INTERNAL_SERVER_ERROR,
    };

    const code =
      status && errorMap[status]
        ? errorMap[status]
        : AuthErrorCodeEnum.AUTH_FAILED;

    return {
      isAuth: false,
      error: {
        code,
        message: DEFAULT_ERROR_MESSAGE,
      },
    };
  }

  async register(userDto: UserDto): Promise<UserDto> {
    const url = `${process.env.REACT_APP_LOGIN_URL}/register`;

    const { data } = await axios.post(url, {
      name: userDto.name,
      email: userDto.email,
      password: userDto.password,
    });

    return data.user;
  }

  async auth(username: string, password: string): Promise<AuthResponse> {
    const url = `${process.env.REACT_APP_LOGIN_URL}/login`;

    try {
      const { data } = await axios.post(url, {
        email: username,
        password,
      });

      const parsed = AuthResponseSchema.safeParse(data);

      if (!parsed.success) {
        const message = this.formatZodErrors(parsed.error.issues);

        return {
          isAuth: false,
          error: {
            code: AuthErrorCodeEnum.INVALID_SERVER_RESPONSE,
            message: `A resposta do servidor está inválida: ${message}`,
          },
        };
      }

      return {
        isAuth: true,
        token: parsed.data.access_token,
      };
    } catch (err) {
      return this.mapAxiosErrorToAuthError(err as AxiosError);
    }
  }
}
