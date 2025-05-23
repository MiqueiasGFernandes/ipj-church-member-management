import type { IAuthGateway } from "@application/gateways";
import { container } from "tsyringe";
import { HttpApiAuthGateway } from "./gateways";

export class InfraDiContainer {
    inject(): void {
        container.register<IAuthGateway>("AuthGateway", {
            useClass: HttpApiAuthGateway,
        });
    }
}
