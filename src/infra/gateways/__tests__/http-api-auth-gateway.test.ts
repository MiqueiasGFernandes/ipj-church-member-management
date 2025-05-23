import "reflect-metadata"
import { HttpApiAuthGateway } from "../http-api-auth.gateway";
import axios from "axios";
import { AuthErrorCodeEnum } from "@application/gateways";
import { InfraTokenEnum } from "../../../infra/di";
import type { IAuthErrorMapper } from "@application/mappers";
import { container } from "tsyringe";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAuthErrorMapper: IAuthErrorMapper = {
    transformToAuthError: jest.fn().mockReturnValue({
        isAuth: false,
        error: { code: AuthErrorCodeEnum.AUTH_FAILED, message: "Erro genérico" },
    }),
    transformToRegisterError: jest.fn().mockReturnValue({
        success: false,
        error: { code: AuthErrorCodeEnum.INTERNAL_SERVER_ERROR, message: "Erro genérico" },
    }),
};

describe("HttpApiAuthGateway", () => {
    let gateway: HttpApiAuthGateway;

    beforeEach(() => {
        container.registerInstance(InfraTokenEnum.AuthErrorMapper, mockAuthErrorMapper);
        gateway = container.resolve(HttpApiAuthGateway);
        jest.clearAllMocks();
    });

    describe("register()", () => {
        it("should return success when API returns valid user", async () => {
            mockedAxios.post.mockResolvedValueOnce({
                data: {
                    message: "Registered",
                    user: {
                        id: "123",
                        name: "John",
                        email: "john@example.com",
                    },
                },
            });

            const result = await gateway.register({
                name: "John",
                email: "john@example.com",
                password: "123456",
            });

            expect(result.success).toBe(true);
            expect(result.user?.name).toBe("John");
        });

        it("should return zod validation error for malformed API response", async () => {
            mockedAxios.post.mockResolvedValueOnce({
                data: {
                    invalid_field: true,
                },
            });

            const result = await gateway.register({
                name: "John",
                email: "john@example.com",
                password: "123456",
            });

            expect(result.success).toBe(false);
            expect(result.error?.code).toBe(AuthErrorCodeEnum.INVALID_SERVER_RESPONSE);
            expect(result.error?.message).toMatch(/Resposta inválida da API/);
        });

        it("should return error from mapper on HTTP failure", async () => {
            mockedAxios.post.mockRejectedValueOnce({
                response: {
                    status: 500,
                    data: {
                        message: "Erro interno",
                    },
                },
            });

            const result = await gateway.register({
                name: "John",
                email: "john@example.com",
                password: "123456",
            });

            expect(mockAuthErrorMapper.transformToRegisterError).toHaveBeenCalled();
            expect(result.success).toBe(false);
        });
    });

    describe("auth()", () => {
        it("should return token on success", async () => {
            mockedAxios.post.mockResolvedValueOnce({
                data: {
                    access_token: "token123",
                },
            });

            const result = await gateway.auth("john@example.com", "123456");

            expect(result.isAuth).toBe(true);
            expect(result.token).toBe("token123");
        });

        it("should return error if token is missing in response", async () => {
            mockedAxios.post.mockResolvedValueOnce({
                data: {
                    invalid: "no_token",
                },
            });

            const result = await gateway.auth("john@example.com", "123456");

            expect(result.isAuth).toBe(false);
            expect(result.error?.code).toBe(AuthErrorCodeEnum.INVALID_SERVER_RESPONSE);
        });

        it("should call error mapper on failed request", async () => {
            mockedAxios.post.mockRejectedValueOnce({
                response: {
                    status: 401,
                    data: {
                        message: "Unauthorized",
                    },
                },
            });

            const result = await gateway.auth("john@example.com", "123456");

            expect(mockAuthErrorMapper.transformToAuthError).toHaveBeenCalled();
            expect(result.isAuth).toBe(false);
        });

        it("should handle completely unexpected server errors", async () => {
            mockedAxios.post.mockRejectedValueOnce(new Error("Crash"));

            const result = await gateway.auth("john@example.com", "123456");

            expect(result.isAuth).toBe(false);
            expect(mockAuthErrorMapper.transformToAuthError).toHaveBeenCalled();
        });
    });
});
