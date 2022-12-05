import { DomainEvent, DomainSubscriber } from "../../domainProvider/DomainEvent";

export class EmpleadoVitacora1 extends DomainSubscriber {
    newEvent(event: DomainEvent): void {
        console.log("1",event);
    }
}

export class EmpleadoVitacora2 extends DomainSubscriber {
    newEvent(event: DomainEvent): void {
        console.log("2",event);
    }
}
