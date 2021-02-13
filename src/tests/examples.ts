import { Injectable } from '../decorators/injectable';
import { Inject } from '../decorators/inject';
import { DependencyProviders } from '../startup';
import { InjectionScopeEnum } from '../types/injection-scope.enum';

export abstract class ServiceBase {
    abstract setMessage(msg: string): void;
    abstract execute(): void;
}

@Injectable({
    scope: InjectionScopeEnum.Transient
})
export class Service implements ServiceBase {
    private message: string;

    setMessage(msg: string) {
        this.message = msg;
    }

    execute() {
        console.log(this.message);
    }
}

@Injectable()
export class Service2 {
    run() {
        console.log('ruuun');
    }
}

@Injectable()
export class Component {
    constructor(@Inject(ServiceBase) public srv1: ServiceBase, @Inject(Service) public srv2: Service) {
    }

    run(msg: string) {
        this.srv1.setMessage(msg)

        console.log('srv1:');
        this.srv1.execute();
        console.log('srv2:');
        this.srv2.execute();
    }
}

class Test {
    @Inject(Component) cpm: Component;
    run(msg: string) {
        this.cpm.run(msg);
    }
}

DependencyProviders.provide(ServiceBase, Service);

const t = new Test();
t.run('888');
t.run('999');