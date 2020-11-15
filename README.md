# di-corate
Another dependency injection implementation for Typescript using decorators.

[![Build Status](https://travis-ci.com/apashkov-ext/di-corate.svg?branch=main)](https://travis-ci.com/apashkov-ext/di-corate)
[![npm version](https://img.shields.io/npm/v/di-corate)](https://www.npmjs.com/package/di-corate)
[![install size](https://packagephobia.now.sh/badge?p=di-corate)](https://packagephobia.now.sh/result?p=di-corate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/git/git-scm.com/blob/master/MIT-LICENSE.txt)

## Installation
`npm install di-corate`
## Using
Use the library to engage the Dependency Injection in your project.
The library does not use the `reflect-metadata` package.
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
## Roadmap
- tests