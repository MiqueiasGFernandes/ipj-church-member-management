import { useAddAdmin } from "@presentation/hooks";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { SignUpForm } from "../signup-form";

jest.mock("@presentation/hooks");

const notifyMock = jest.fn();

jest.mock("ra-core", () => ({
    ...jest.requireActual("ra-core"),
    useNotify: () => notifyMock,
}));

describe("SignUpForm Component", () => {
    const handleRedirectToConfirmedSignUpForm = jest.fn();
    const handleRedirectToLoginForm = jest.fn();

    beforeAll(() => {
        Object.defineProperty(window, "navigator", {
            value: { language: "en-US" },
            writable: true,
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    function setup(
        addAdminReturn = {
            addAdmin: jest.fn().mockResolvedValue(null),
            isLoading: false,
            error: null,
        }
    ) {
        (useAddAdmin as jest.Mock).mockReturnValue(addAdminReturn);

        render(
            <AdminContext>
                <SignUpForm
                    handleRedirectToConfirmedSignUpForm={handleRedirectToConfirmedSignUpForm}
                    handleRedirectToLoginForm={handleRedirectToLoginForm}
                />
            </AdminContext>
        );
    }

    it("should render all input fields and the submit button", () => {
        setup();

        const nameField = screen.getByLabelText(/Nome/i)

        expect(nameField).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Senha$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmação de Senha/i)).toBeInTheDocument();

        const button = screen.getByRole("button", { name: /Registrar Usuário/i });
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });

    it("should call addAdmin with correct data on form submit", async () => {
        const addAdminMock = jest.fn().mockResolvedValue(null);
        setup({ addAdmin: addAdminMock, isLoading: false, error: null });

        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Miqueias" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "miqueias@example.com" } });
        fireEvent.change(screen.getByLabelText(/^Senha$/i), { target: { value: "123456" } });
        fireEvent.change(screen.getByLabelText(/Confirmação de Senha/i), { target: { value: "123456" } });

        fireEvent.click(screen.getByRole("button", { name: /Registrar Usuário/i }));

        await waitFor(() => {
            expect(addAdminMock).toHaveBeenCalledWith({
                name: "Miqueias",
                email: "miqueias@example.com",
                password: "123456",
                passwordConfirmation: "123456",
            });
        });
    });

    it("should show loading spinner and disable submit button when isLoading is true", () => {
        setup({ addAdmin: jest.fn(), isLoading: true, error: null });

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should notify error when useAddAdmin hook returns an error", async () => {
        const errorMessage = "Registration failed";
        const addAdminMock = jest.fn().mockResolvedValue(null);
        // @ts-expect-error for error mocking
        setup({ addAdmin: addAdminMock, isLoading: false, error: errorMessage });

        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Miqueias" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "miqueias@example.com" } });
        fireEvent.change(screen.getByLabelText(/^Senha$/i), { target: { value: "123456" } });
        fireEvent.change(screen.getByLabelText(/Confirmação de Senha/i), { target: { value: "123456" } });

        fireEvent.click(screen.getByRole("button", { name: /Registrar Usuário/i }));

        await waitFor(() => {
            expect(notifyMock).toHaveBeenCalledWith(errorMessage, { type: "error" });
        });

        expect(handleRedirectToConfirmedSignUpForm).not.toHaveBeenCalled();
    });

    it("should call handleRedirectToConfirmedSignUpForm on successful registration", async () => {
        const addAdminMock = jest.fn().mockResolvedValue(null);
        setup({ addAdmin: addAdminMock, isLoading: false, error: null });

        fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Miqueias" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "miqueias@example.com" } });
        fireEvent.change(screen.getByLabelText(/^Senha$/i), { target: { value: "123456" } });
        fireEvent.change(screen.getByLabelText(/Confirmação de Senha/i), { target: { value: "123456" } });

        fireEvent.click(screen.getByRole("button", { name: /Registrar Usuário/i }));

        await waitFor(() => {
            expect(handleRedirectToConfirmedSignUpForm).toHaveBeenCalledTimes(1);
        });
    });

    it("should call handleRedirectToLoginForm when login link is clicked", () => {
        setup();

        fireEvent.click(screen.getByText(/Login/i));

        expect(handleRedirectToLoginForm).toHaveBeenCalledTimes(1);
    });
});
