import { z } from "zod";
import axios, { type AxiosError } from "axios";
import {
  AuthErrorCodeEnum,
  type RegisterResponse,
  type AuthResponse,
  type IAuthGateway,
} from "@application/gateways";
import type { UserDto } from "@application/dto";
import { inject, injectable } from "tsyringe";
import type { IAuthErrorMapper } from "@application/mappers";
import { InfraTokenEnum } from "infra/di";

const AuthResponseSchema = z.object({
  access_token: z.string(),
});

export type HttpApiContractResponse = {
  message: string,
  errors?: Record<string, string[]>,
  user?: UserDto,
}


@injectable()
export class HttpApiAuthGateway implements IAuthGateway {
  constructor(@inject(InfraTokenEnum.AuthErrorMapper) private readonly authErrorMapper: IAuthErrorMapper) { }

  private formatZodErrors(issues: z.ZodIssue[]): string {
    return issues
      .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
      .join("; ");
  }

  async register(userDto: UserDto): Promise<RegisterResponse> {
    try {
      const url = `${process.env.REACT_APP_LOGIN_URL}/register`;

      const { data } = await axios.post<HttpApiContractResponse>(url, {
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
      });

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      const parsedError = error as AxiosError<HttpApiContractResponse>
      return this.authErrorMapper.transformToRegisterError({
        message: parsedError.response?.data.message || "",
        status: parsedError.status || 500,
      });
    }
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
    } catch (error) {
      const parsedError = error as AxiosError<HttpApiContractResponse>
      return this.authErrorMapper.transformToAuthError({
        message: parsedError.response?.data.message || "Usuário ou senha incorretos",
        status: parsedError.status || 401,
      });
    }
  }
}
