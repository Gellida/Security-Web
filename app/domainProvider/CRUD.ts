export interface CRUD<Entity> {
    save(data: Entity): Promise<void>;
    find(id: string): Promise<Entity>;
    update(newData: Entity): Promise<void>;
    delete(id: string): Promise<void>;
}