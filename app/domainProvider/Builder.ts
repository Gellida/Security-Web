export abstract class Builder<Entity, DataEntity> {
    protected originalData: any;
    protected dataEntity?: DataEntity;
    protected parser: (data: any) => DataEntity;
    protected entityContainer?: Entity;
    protected entityListContainer?: Array<Entity>;

    constructor(data: any, criterialParser? : (data: any) => DataEntity ) {
        this.originalData = data;
        this.parser = criterialParser ?? this.defautlParser;
        return this;
    }

    public build(): Entity {
        if (this.entityContainer) return this.entityContainer;
        if (!this.dataEntity) this.parserData();
        console.log("data: ",this.dataEntity);
        
        return this.makeEntity(this.dataEntity);
    }

    public buildList(): Array<Entity> {
        if(this.entityListContainer) return this.entityListContainer;
        let salida: Array<Entity>;
        if (this.ArrayCase()) salida = this.originalData.map(data => this.makeEntity(this.parser(data)));
        else salida = [this.build()];
        return salida;
    }

    public decorate(decorador: (entity: Entity) => Entity): this {
        if(!this.entityContainer) this.entityContainer = this.build();
        this.entityContainer = decorador(this.entityContainer);
        return this;
    }

    public decorateList(decorador: (entity: Entity) => Entity): this {
        if(!this.entityListContainer) this.entityListContainer = this.buildList();
        this.entityListContainer = this.entityListContainer.map(entity => decorador(entity))
        return this;
    }

    protected parserData() {
        this.dataEntity = this.parser(this.originalData);
    }

    protected ArrayCase(): boolean {
        return Array.isArray(this.originalData);
    }

    protected abstract defautlParser(data: any): DataEntity;
    protected abstract makeEntity(data: DataEntity): Entity;
}