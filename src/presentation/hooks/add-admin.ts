import { ApplicationTokenEnum } from "@application/di";
import type { UserDto } from "@application/dto";
import type { IAddAdminUseCase } from "@domain/use-cases";
import { useCallback, useState } from "react";
import { container } from "tsyringe";

export function useAddAdmin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [user, setUser] = useState<null | UserDto>(null);

    const addAdmin = useCallback(async (input: UserDto) => {
        setIsLoading(true);
        const useCase = container.resolve<IAddAdminUseCase>(
            ApplicationTokenEnum.AddAdminUseCase,
        );
        const result = await useCase.execute(input);

        if (result.error) {
            setError(result.error.message)
            setIsLoading(false);
            return null
        }

        setUser(result.data as UserDto)
        setIsLoading(false);
    }, []);

    return { addAdmin, isLoading, error, user }
}
