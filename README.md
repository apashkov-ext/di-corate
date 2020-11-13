# di-corate
Another dependency injection implementation for Typescript using decorators.

[![Build Status](https://travis-ci.com/apashkov-ext/di-corate.svg?branch=main)](https://travis-ci.com/apashkov-ext/di-corate)

## Installation
`npm install composite-validation`
## Using
Use the library to engage the Dependency Injection in your project.
#### Simple DI

```javascript
//
// service1.ts
@Injectable()
export class Service1 {
    do() {}
}
//
// service2.ts
@Injectable()
export class Service2 {
    run() {}
}

//
// component.ts
export class Component {
    @PropInject(Service1) private readonly srv1: Service1;

    constructor(@Inject(Service2) private readonly srv2: Service2) {
        srv2.do();
        example();
    }

    private example() {
        this.srv1.run();
    }
}
```

#### Dependency tree
```javascript
//
// http-client.ts
@Injectable()
export class HttpClient {
    get(url: string) { return 'response'; }
}

//
// service.ts
@Injectable()
export class Service {
    constructor(@Inject(HttpClient) private readonly http: HttpClient) { }
    
    do() {
        const resp = this.http.get('someUrl');
        console.log(resp);
    }
}

//
// component.ts
export class Component {
    constructor(@Inject(Service) private readonly srv: Service) {
        example();
    }

    private example() {
        this.srv.do();
    }
}
```
