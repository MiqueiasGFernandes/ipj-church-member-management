

import { renderHook, act } from "@testing-library/react";
import { useAddAdmin } from "../add-admin";
import { container } from "tsyringe";
import type { IAddAdminUseCase } from "@domain/use-cases";
import type { UserDto } from "@application/dto";
import { ApplicationTokenEnum } from "@application/di";

// mocks
const mockExecute = jest.fn();
const mockUseCase: IAddAdminUseCase = { execute: mockExecute };
const mockUser: UserDto = {
    name: "Admin",
    email: "admin@email.com",
    password: "secure123",
};

jest.mock("tsyringe", () => ({
    ...jest.requireActual("tsyringe"),
    container: {
        resolve: jest.fn(),
    },
}));

describe("useAddAdmin()", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (container.resolve as jest.Mock).mockReturnValue(mockUseCase);
    });

    it("should set user and clear error on success", async () => {
        mockExecute.mockResolvedValueOnce({ data: mockUser });

        const { result } = renderHook(() => useAddAdmin());

        await act(async () => {
            await result.current.addAdmin(mockUser);
        });

        expect(container.resolve).toHaveBeenCalledWith(ApplicationTokenEnum.AddAdminUseCase);
        expect(mockExecute).toHaveBeenCalledWith(mockUser);
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it("should set error and not user on failure", async () => {
        mockExecute.mockResolvedValueOnce({
            error: {
                message: "Usuário já existe",
                name: "INPUT_VALIDATION"
            }
        });

        const { result } = renderHook(() => useAddAdmin());

        await act(async () => {
            await result.current.addAdmin(mockUser);
        });

        expect(result.current.user).toBeNull();
        expect(result.current.error).toBe("Usuário já existe");
        expect(result.current.isLoading).toBe(false);
    });

    it("should set loading to true during execution", async () => {
        let resolveFn: () => void

        const delayed = new Promise(resolve => {
            resolveFn = () => resolve({ data: mockUser });
        });

        mockExecute.mockReturnValueOnce(delayed);

        const { result } = renderHook(() => useAddAdmin());

        act(() => {
            result.current.addAdmin(mockUser);
        });

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            resolveFn();
        });

        expect(result.current.isLoading).toBe(false);
    });
});
