export abstract class DomainEvent {
    public send(): void {
        console.log("hola mundo");
        
        Publisher.get().newEvent(this);
    }
}

export class Publisher {
    private static publisher: Publisher;
    private subscribers: Array<DomainSubscriber>;

    private constructor() {}
    public static get(): Publisher {
        if(!Publisher.publisher) {
            Publisher.publisher = new Publisher();
            Publisher.publisher.subscribers = [];
        }
        return Publisher.publisher;
    }

    registerNewSusbcriber(subscriber: DomainSubscriber): void{
        this.subscribers.push(subscriber);
    }
    newEvent(event: DomainEvent): void {
        this.subscribers.forEach(subscriber => subscriber.update(event));
    }
}

export abstract class DomainSubscriber {
    update(event: DomainEvent): void {
        if(this.lisenOnly(event)) this.newEvent(event);
    }
    protected lisenOnly(event: DomainEvent): boolean { return true }; // El <DomainEvent> escuchará todos los eventos por defecto
    abstract newEvent(event: DomainEvent): void;
}

