import { AddAdmin } from "../add-admin.use-case";
import type { IAuthGateway } from "@application/gateways";
import type { UserDto } from "@application/dto";
import { AuthErrorCodeEnum } from "@application/gateways";

describe("AddAdmin UseCase", () => {
    const mockAuthGateway: jest.Mocked<IAuthGateway> = {
        register: jest.fn(),
        auth: jest.fn()
    };

    const userDto: UserDto = {
        name: "Admin",
        email: "admin@example.com",
        password: "secure123"
    };

    let useCase: AddAdmin;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new AddAdmin(mockAuthGateway);
    });

    describe("execute()", () => {
        it("should return user data when registration is successful", async () => {
            mockAuthGateway.register.mockResolvedValueOnce({
                success: true,
                user: userDto
            });

            const result = await useCase.execute(userDto);

            expect(mockAuthGateway.register).toHaveBeenCalledWith(userDto);
            expect(result.data).toEqual(userDto);
            expect(result.error).toBeUndefined();
        });

        it("should return error when registration fails", async () => {
            mockAuthGateway.register.mockResolvedValueOnce({
                success: false,
                error: {
                    message: "Email já utilizado",
                    code: AuthErrorCodeEnum.INPUT_VALIDATION
                }
            });

            const result = await useCase.execute(userDto);

            expect(mockAuthGateway.register).toHaveBeenCalledWith(userDto);
            expect(result.data).toBeUndefined();
            expect(result.error).toEqual({
                message: "Email já utilizado",
                name: AuthErrorCodeEnum.INPUT_VALIDATION
            });
        });

        it("should handle unexpected gateway response gracefully", async () => {
            mockAuthGateway.register.mockResolvedValueOnce({
                success: false,
                error: undefined
            });

            const result = await useCase.execute(userDto);

            expect(result.error).toEqual({
                message: undefined,
                name: undefined
            });
        });
    });
});
