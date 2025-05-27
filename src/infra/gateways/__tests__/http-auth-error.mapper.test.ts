

import { HttpAuthErrorMapper } from "../http-auth-error.mapper";
import { AuthErrorCodeEnum } from "@application/gateways";
import type { AuthErrorDetails } from "@application/mappers";

describe("HttpAuthErrorMapper", () => {
    let mapper: HttpAuthErrorMapper;

    beforeEach(() => {
        mapper = new HttpAuthErrorMapper();
    });

    describe("transformToAuthError()", () => {
        it("should map status 401 to AUTH_FAILED", () => {
            const input: AuthErrorDetails = { status: 401, message: "Unauthorized" };
            const result = mapper.transformToAuthError(input);

            expect(result).toEqual({
                isAuth: false,
                error: {
                    code: AuthErrorCodeEnum.AUTH_FAILED,
                    message: "Unauthorized",
                },
            });
        });

        it("should map status 422 to INPUT_VALIDATION", () => {
            const input: AuthErrorDetails = { status: 422, message: "Invalid input" };
            const result = mapper.transformToAuthError(input);

            expect(result).toEqual({
                isAuth: false,
                error: {
                    code: AuthErrorCodeEnum.INPUT_VALIDATION,
                    message: "Invalid input",
                },
            });
        });

        it("should fallback to AUTH_FAILED on unknown status", () => {
            const input: AuthErrorDetails = { status: 999, message: "Unknown" };
            const result = mapper.transformToAuthError(input);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.AUTH_FAILED);
        });

        it("should fallback to AUTH_FAILED when status is undefined", () => {
            const input = { message: "No status" } as unknown as AuthErrorDetails;
            const result = mapper.transformToAuthError(input);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.AUTH_FAILED);
        });

        it("should fallback to AUTH_FAILED when input is an empty object", () => {
            const result = mapper.transformToAuthError({} as AuthErrorDetails);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.AUTH_FAILED);
        });
    });

    describe("transformToRegisterError()", () => {
        it("should map 422 to INPUT_VALIDATION", () => {
            const input: AuthErrorDetails = { status: 422, message: "Invalid form" };
            const result = mapper.transformToRegisterError(input);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.INPUT_VALIDATION);
        });

        it("should map 500 to INTERNAL_SERVER_ERROR", () => {
            const input: AuthErrorDetails = { status: 500, message: "Server error" };
            const result = mapper.transformToRegisterError(input);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.INTERNAL_SERVER_ERROR);
        });

        it("should fallback to INTERNAL_SERVER_ERROR for unknown status", () => {
            const input: AuthErrorDetails = { status: 999, message: "Random error" };
            const result = mapper.transformToRegisterError(input);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.INTERNAL_SERVER_ERROR);
        });

        it("should fallback to INTERNAL_SERVER_ERROR if status is undefined", () => {
            const input = { message: "No status" } as AuthErrorDetails;
            const result = mapper.transformToRegisterError(input);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.INTERNAL_SERVER_ERROR);
        });

        it("should fallback to INTERNAL_SERVER_ERROR when input is an empty object", () => {
            const result = mapper.transformToRegisterError({} as AuthErrorDetails);

            expect(result.error?.code).toBe(AuthErrorCodeEnum.INTERNAL_SERVER_ERROR);
        });
    });
});
