import type { IAuthGateway } from "@application/gateways";
import { container } from "tsyringe";
import { HttpApiAuthGateway, HttpAuthErrorMapper } from "./gateways";
import type { IAuthErrorMapper } from "@application/mappers";

export const InfraTokenEnum = {
    AuthErrorMapper: "AuthErrorMapper",
    AuthGateway: "AuthGateway"
};

export class InfraDiContainer {
    inject(): void {
        container
            .register<IAuthGateway>(InfraTokenEnum.AuthGateway, {
                useClass: HttpApiAuthGateway,
            })
            .register<IAuthErrorMapper>(InfraTokenEnum.AuthErrorMapper, {
                useClass: HttpAuthErrorMapper,
            });
    }
}
