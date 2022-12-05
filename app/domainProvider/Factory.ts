export abstract class Factory<T> {
    abstract make(data: any): T;
    abstract cleanMeake(): T;
    makeList(data: Array<any>): Array<T> {
        return data.map(data => this.make(data));
    }
}