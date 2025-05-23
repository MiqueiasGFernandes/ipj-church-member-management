import type { IAddAdminUseCase } from "@domain/use-cases";
import { container } from "tsyringe";
import { AddAdmin } from "./use-cases";

export const ApplicationTokenEnum = {
    AddAdminUseCase: "AddAdminUseCase",
};

export class ApplicationDiContainer {
    inject(): void {
        container
            .register<IAddAdminUseCase>(ApplicationTokenEnum.AddAdminUseCase, {
                useClass: AddAdmin,
            })
    }
}
