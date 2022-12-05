import { Permision, PermisionType } from "../domain/permisionModel";
import { PermisionRepository } from "../domain/permisionRepository";

abstract class PermisionsByType extends Permision {
    private repository: PermisionRepository;
    abstract permisionType: PermisionType;

    constructor(repository: PermisionRepository) {
        super();
        this.repository = repository;
    }

    async chek() {
        const permisos = await this.repository.getEmpleadoPermission(this.empleadoToValidate);
        return permisos.name == this.permisionType.name
    }
}
export class IsAdmin extends PermisionsByType {
    permisionType: PermisionType;
    constructor(repository: PermisionRepository){
        super(repository);
        this.permisionType = {id:"1", name: "Administrador general"}
    }
}
export class IsGeneralGerent extends PermisionsByType {
    permisionType: PermisionType;
    constructor(repository: PermisionRepository){
        super(repository);
        this.permisionType = {id:"2", name: "Gerente general"}
    }
}
export class IsGerent extends PermisionsByType {
    permisionType: PermisionType;
    constructor(repository: PermisionRepository){
        super(repository);
        this.permisionType = {id:"3", name: "Gerente de empresa / sucursal"}
    }
}
export class IsRH extends PermisionsByType {
    permisionType: PermisionType;
    constructor(repository: PermisionRepository){
        super(repository);
        this.permisionType = {id:"4", name: "Recursos humanos"}
    }
}
export class IsJuridico extends PermisionsByType {
    permisionType: PermisionType;
    constructor(repository: PermisionRepository){
        super(repository);
        this.permisionType = {id:"5", name: "Jurídico"}
    }
}
export class IsAuxiliar extends PermisionsByType {
    permisionType: PermisionType;
    constructor(repository: PermisionRepository){
        super(repository);
        this.permisionType = {id:"6", name: "Auxiliares"}
    }
}
export class IsElemento extends PermisionsByType {
    permisionType: PermisionType;
    constructor(repository: PermisionRepository){
        super(repository);
        this.permisionType = {id:"7", name: "Elementos"}
    }
}