import { CRUD } from "./CRUD";
import { Factory } from "./Factory";

export interface UseCase {
    start(data: any): Promise<any>;
}

export abstract class UseCaseCeate<T> implements UseCase {
    protected mainRepository: CRUD<T>;
    protected factory: Factory<T>;
    protected objToCreate: T;
    protected data: any;

    async start(data: any): Promise<void> {
        this.data = data;
        this.makeObject();
        this.dataValidation();
        await this.asyncDataValidation();
        this.setObjet();
        this.beforeToregister();
        this.register();
    }

    protected abstract dataValidation(): void
    protected async asyncDataValidation(): Promise<void> {}
    protected makeObject() {
        this.objToCreate = this.factory.cleanMeake();
    }
    protected abstract setObjet(): void
    protected beforeToregister(): void {}

    protected async register(): Promise<void> {
        this.mainRepository.save(this.objToCreate)
    }
}